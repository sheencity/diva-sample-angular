import { Component, OnDestroy, OnInit } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { DivaService } from 'src/app/common/services/diva.service';
import { DropdownData } from 'src/app/common/dtos/dropdown-data.interface';
import { Model } from '@sheencity/diva-sdk';
import { element } from 'protractor';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss'],
})
export class FloorComponent implements OnInit, OnDestroy {
  // 炸开
  private _explode = false;
  public set explode(v: boolean) {
    console.log('explode', v);

    if (v) {
      this._diva.client.request('ExplodeByGroup', {
        groupName: '场景模型/主楼拆分',
        spacing: 1000,
        floorHeight: 300,
        duration: 5,
      });
    } else {
      this._diva.client.request('AggregateByGroup', {
        groupName: '场景模型/主楼拆分',
      });
    }
    this._explode = v;
  }
  public get explode() {
    return this._explode;
  }

  // 分层聚焦
  private _gradation = false;
  public set gradation(v: boolean) {
    console.log('gradation', v);
    this._gradation = v;
  }
  public get gradation() {
    return this._gradation;
  }

  // 层数
  private _selectedFloor: DropdownData = {
    placeholder: '1',
    value: '一层-1_1',
  };

  private async getModel(name: string) {
    const [model] = await this._diva.client.getEntitiesByName<Model>(name);
    return model;
  }

  private async FoucsFloor(floor: Number) {
    var ids: string[] = new Array();

    const floorToHide = this.options.filter(
      (val) => +val.placeholder !== floor
    );
    const models = await Promise.all(
      this.options.map(async (v) => this.getModel(v.value))
    );
    const modelToHide = models.filter(
      (f) => f.name !== this.options.find((o) => +o.placeholder === floor).value
    );
    const modelToFoucs = models.filter(
      (f) => f.name === this.options.find((o) => +o.placeholder === floor).value
    );
    const focus = async (model: Model) =>
      this._diva.client.request('Focus', {
        id: model.id,
        distance: 5000.0,
        pitch: 30.0,
      });
    // cosnt show = async (models: Model[]) =>{}
    const setVisibility = async (models: Model[], visible: boolean) =>
      this._diva.client.request('SetVisibility', {
        ids: models.map((m) => m.id),
        visible,
      });

    return Promise.all([
      focus(modelToFoucs[0]),
      setVisibility(modelToHide, false),
      setVisibility(modelToFoucs, true),
    ]);
  }

  public set selectedFloor(v: DropdownData) {
    console.log('层数是', Number(v.placeholder));
    if (this._gradation) {
      this.FoucsFloor(Number(v.placeholder));
      // const model =  this.getModel(v.value)

      // model.then((m) => {
      //   if(!m) return
      //   this._diva.client.request("Focus", {
      //     id: m.id,
      //     distance: 5000.0,
      //     pitch: 30.0,
      //   });
      // })
    }
    // 此处设置层数
    this._selectedFloor = v;
  }
  public get selectedFloor() {
    return this._selectedFloor;
  }

  // 显示管线
  private _pipe = false;
  public set pipe(v: boolean) {
    console.log('pipe', v);
    // 此处设置显示管线
    this._pipe = v;
  }
  public get pipe() {
    return this._pipe;
  }

  options = [
    { placeholder: '1', value: '一层-1_1' },
    { placeholder: '2', value: '二层(1)-1_1' },
    { placeholder: '3', value: '三楼-1_5' },
    { placeholder: '4', value: '标准层(1)-1_11' },
    { placeholder: '5', value: '标准层(1)-1_12' },
    { placeholder: '6', value: '标准层(1)-1_15' },
    { placeholder: '7', value: '标准层(1)-1_16' },
    { placeholder: '8', value: '标准层(1)-1_9' },
    { placeholder: '9', value: '标准层(1)-1_10' },
    { placeholder: '10', value: '标准层(1)-1_14' },
    { placeholder: '11', value: '标准层(1)-1_17' },
    { placeholder: '12', value: '标准层(1)-1_13' },
  ];

  constructor(private _diva: DivaService) {}

  ngOnInit(): void {
    this._diva.client?.applyScene('楼层展示');
  }
   // 销毁钩子
   ngOnDestroy(): void {}
}
