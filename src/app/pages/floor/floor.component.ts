import { Component, OnDestroy, OnInit } from '@angular/core';
import { DivaService } from 'src/app/common/services/diva.service';
import { DropdownData } from 'src/app/common/dtos/dropdown-data.interface';
import { Model } from '@sheencity/diva-sdk';
import { element } from 'protractor';
import { DataService } from 'src/app/common/services/data.service';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss'],
})
export class FloorComponent implements OnInit, OnDestroy {
  // 所有楼层模型
  models: Model[] = [];
  // 所有管道模型
  pipeModels: Model[] = [];
  // 炸开
  private _explode = false;
  public set explode(v: boolean) {
    console.log('explode', v);

    if (v) {
      this._diva.client.request('ExplodeByGroup', {
        groupName: '场景模型/主楼拆分',
        spacing: 300,
        floorHeight: 290,
        duration: 5,
      });
      this._data.changeCode(
        `client.explodeByGroup({groupName: '场景模型/主楼拆分', spacing: 300, floorHeight: 290, duration: 5})`
      );
    } else {
      this._diva.client.request('AggregateByGroup', {
        groupName: '场景模型/主楼拆分',
      });
      this._data.changeCode(
        `client.aggregateByGroup({groupName: '场景模型/主楼拆分'})`
      );
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
    if (v) {
      // 聚焦到已选中的层数
      this._foucsFloor(Number(this.selectedFloor.placeholder));
    } else {
      this._setVisibility(this.models, true, true);
      this._setVisibility(this.pipeModels, false, true);
    }
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
  public set selectedFloor(v: DropdownData) {
    console.log('层数是', Number(v.placeholder));
    if (!this.gradation) {
      return;
    }
    if (this._gradation) { 
       // 聚焦到已选中的层数
      this._foucsFloor(Number(v.placeholder));
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
    if (!this.gradation) {
      return;
    }
    // 此处设置显示管线
    this._pipe = v;
    const currentPipe = this.pipeModels.filter(
      (pipeModel) =>
        pipeModel.name ===
        this.options[Number(this.selectedFloor.placeholder) - 1].pipeLineName
    );
    if (this._gradation && v) {
      this._setVisibility(currentPipe, true);
    } else {
      this._setVisibility(currentPipe, false);
    }
  }
  public get pipe() {
    return this._pipe;
  }

  options = [
    { placeholder: '1', value: '一层-1_1', pipeLineName: '一层管线' },
    { placeholder: '2', value: '二层(1)-1_1', pipeLineName: '二层管线' },
    { placeholder: '3', value: '三楼-1_5', pipeLineName: '三层管线' },
    { placeholder: '4', value: '标准层(1)-1_11', pipeLineName: '四层管线' },
    { placeholder: '5', value: '标准层(1)-1_12', pipeLineName: '五层管线' },
    { placeholder: '6', value: '标准层(1)-1_15', pipeLineName: '六层管线' },
    { placeholder: '7', value: '标准层(1)-1_16', pipeLineName: '七层管线' },
    { placeholder: '8', value: '标准层(1)-1_9', pipeLineName: '八层管线' },
    { placeholder: '9', value: '标准层(1)-1_10', pipeLineName: '九层管线' },
    { placeholder: '10', value: '标准层(1)-1_14', pipeLineName: '十层管线' },
    { placeholder: '11', value: '标准层(1)-1_17', pipeLineName: '十一层管线' },
    { placeholder: '12', value: '标准层(1)-1_13', pipeLineName: '十二层管线' },
    { placeholder: '13', value: '顶楼_12', pipeLineName: '顶层管线' },
  ];

  /**
   * 聚焦层数
   * @param floor (number) 层数
   */
  private async _foucsFloor(floor: number) {
    // 显示当前层数模型
    const modelToFocus = this.models.filter(
      (model) => model.name === this.options[floor - 1].value
    );
    // 隐藏其他层数模型
    const modelToHide = this.models.filter(
      (model) => model.name !== this.options[floor - 1].value
    );
    // 显示当前层数管道
    const pipeToShow = this.pipeModels.filter(
      (pipeModel) => pipeModel.name === this.options[floor - 1].pipeLineName
    );
    // 隐藏其他层数的管道
    const pipeToHide = this.pipeModels.filter(
      (pipeModel) => pipeModel.name !== this.options[floor - 1].pipeLineName
    );

    // 聚焦当前楼层
    await this._focus(modelToFocus[0]);
    await this._setVisibility(modelToFocus, true);
    await this._setVisibility(modelToHide, false);
    await this._setVisibility(pipeToHide, false),
    await this._setVisibility(pipeToShow, this.pipe ? true : false);
    this._data.changeCode(
      `client.setVisibility(${[
        ...modelToFocus.map((model) => `'${model.id}'`),
      ]}, true)`
    );  
  }

  // 聚焦方法
  private async _focus(model: Model) {
    await this._diva.client.request('Focus', {
      id: model.id,
      distance: 5000.0,
      pitch: 30.0,
    });
    this._data.changeCode(`model.focus()`);
  }
  // 显示隐藏方法
  private _setVisibility(models: Model[], visible: boolean, leave = false) {
    // this._diva.client.request('SetVisibility', {
    //   ids: [...models.map((model) => model.id)],
    //   visible,
    // });
    models.map((model) => model.visible = visible);
    if (!leave) {
      this._data.changeCode(
        `client.setVisibility(${[
          ...models.map((model) => `'${model.id}'`),
        ]}, ${visible})`
      );
    }
  }
  // 获取模型方法
  private async _getModel(name: string) {
    const [model] = await this._diva.client.getEntitiesByName<Model>(name);
    return model;
  }

  constructor(private _diva: DivaService, private _data: DataService) {}

  // 设置路径显示隐藏
  private SetPathVisibility(v: boolean) {
    const pathIndexArray = [0, 1, 2, 3, 4];

    const requestBatch = pathIndexArray.map((i) => {
      return {
        method: 'SetPathVisibility',
        params: {
          index: i,
          visible: v,
        },
      };
    });

    this._diva.client.batchRequest(requestBatch);
    const code = requestBatch.map(
      (c) =>
        `\t{method: '${c.method}', params: {index: ${c.params.index}, visible: ${c.params.visible}}}`
    );
  }

  async ngOnInit() {
    await this._diva.client?.applyScene('楼层展示');
    if (this._diva.client?.applyScene) {
      this._data.changeCode(`client.applyScene('楼层展示')`);
    }
    this.options.forEach(async (opation) => {
      const model = await this._getModel(opation.value);
      const pipeModel = await this._getModel(opation.pipeLineName);
      // 获取所有楼层模型以及管道模型
      this.models.push(model);
      this.pipeModels.push(pipeModel);
    });
    this.SetPathVisibility(false);
  }
  // 销毁钩子
  async ngOnDestroy() {
    await this._diva.client.request('AggregateByGroup', {
      groupName: '场景模型/主楼拆分',
    });
    // 显示所有楼层，隐藏所有管道，并且不显示示例代码
    await this._setVisibility(this.models, true, true);
    await this._setVisibility(this.pipeModels, false, true);
    this.SetPathVisibility(true);
  }
}
