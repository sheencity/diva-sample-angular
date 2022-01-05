import { Component, OnDestroy, OnInit } from '@angular/core';
import { Model, TypedGroup } from '@sheencity/diva-sdk';
import { DropdownData } from 'src/app/common/models/dropdown-data.interface';
import { DataService } from 'src/app/common/services/data.service';
import { DivaService } from 'src/app/common/services/diva.service';

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
  // 包含所有楼层的模型组
  floorGroup: TypedGroup<Model>;
  // 楼层炸开配置项
  explodeOpts = { spacing: 300, eachHeight: 290, duration: 1 };

  // 炸开
  private _explode = false;
  public set explode(val: boolean) {
    if (!this.floorGroup) return;
    if (val) this._disAssemble();
    else this._assemble();
    this._explode = val;
    this._data.changeCode(
      `const group = client.getEntityGroupByGroupPath('场景模型/主楼拆分');`,
      val
        ? 'group.disassemble({ spacing: 300, eachHeight: 290, duration: 1 });'
        : 'group.assemble();'
    );
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
      this._focusFloor(Number(this.selectedFloor.placeholder));
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
      this._focusFloor(Number(v.placeholder));
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
  private async _focusFloor(floor: number) {
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
    await this._setVisibility(pipeToHide, false);
    await this._setVisibility(pipeToShow, this.pipe ? true : false);
    this._data.changeCode(`model.setVisibility(true)`);
  }

  // 聚焦方法
  private async _focus(model: Model) {
    await model.focus(5000, -Math.PI / 6);
    this._data.changeCode(`model.focus(5000, -Math.PI / 6)`);
  }
  // 显示隐藏方法
  private _setVisibility(models: Model[], visible: boolean, leave = false) {
    models.map((model) => model.setVisibility(visible));
    if (!leave) {
      this._data.changeCode(`model.setVisibility(${visible})`);
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
    pathIndexArray.forEach((i) => {
      this._diva.client.setPathVisibility(i, v);
    });
  }

  /**
   * 楼层炸开
   */
  private async _disAssemble() {
    const reqRemove = [];
    const reqSet = [];
    const floors = Array.from(await this._getFloorGroup());
    this.floorGroup.forEach((model) => {
      const reqRemoveParams = {
        method: 'RemoveTransformAnimation',
        params: { id: model.id },
      };
      const level = this._getModelLevel(model);
      const currentCoord = floors.find((m) => m.id === model.id)?.coord ?? model.coord;
      const total = this.explodeOpts.spacing * (level - 1);
      const rest = total + model.coord.z - currentCoord.z;
      const reqSetParams = {
        method: 'SetTransformAnimation',
        params: {
          id: model.id,
          duration: (rest / total) * this.explodeOpts.duration,
          coord: [model.coord.x, model.coord.y, model.coord.z + total],
          rotation: model.rotation.tuple,
          scale: model.scale.tuple,
        },
      };
      reqRemove.push(reqRemoveParams);
      reqSet.push(reqSetParams);
    });
    await this._batchRequest(reqRemove);
    await this._batchRequest(reqSet);
  }

  /**
   * 楼层聚合
   */
  private async _assemble(mode: 'normal' | 'fast' = 'normal') {
    const reqRemove = [];
    const reqSet = [];
    const floors = Array.from(await this._getFloorGroup());
    this.floorGroup.forEach((model) => {
      const reqRemoveParams = {
        method: 'RemoveTransformAnimation',
        params: { id: model.id },
      };
      const level = this._getModelLevel(model);
      const currentCoord = floors.find((m) => m.id === model.id)?.coord ?? model.coord;
      const total = this.explodeOpts.spacing * (level - 1);
      const rest = currentCoord.z - model.coord.z;
      const reqSetParams = {
        method: 'SetTransformAnimation',
        params: {
          id: model.id,
          duration: mode === 'normal' ? (rest / total) * this.explodeOpts.duration : 0.5,
          coord: [model.coord.x, model.coord.y, model.coord.z],
          rotation: model.rotation.tuple,
          scale: model.scale.tuple,
        },
      };
      reqRemove.push(reqRemoveParams);
      reqSet.push(reqSetParams);
    });
    await this._batchRequest(reqRemove);
    await this._batchRequest(reqSet);
  }

  async _batchRequest(requests) {
    const chuck = <T>(array: T[], size: number): T[][] => {
      if (!array.length) return [];
      return [array.slice(0, size), ...chuck(array.slice(size), size)];
    };

    const reqArr = chuck<any>(requests, 50);
    await Promise.all(reqArr.map((req) => this._diva.client.batchRequest(req)));
  }

  async _getFloorGroup(): Promise<TypedGroup<Model>> {
    return this._diva.client.getModelGroupByGroupPath('/场景模型/主楼拆分');
  }

  /**
   * 判断当前模型属于第几层
   */
  private _getModelLevel(model: Model): number {
    // 这里是通过模型在资源大纲里的目录结构名称来判断楼层的。
    // 因为现在的管线模型获取不到包围盒消息，不能确定准确的位置，所以无法通过计算判断模型的楼层。
    // FIXME: 之后需要改成通过计算判断模型楼层。

    let floor: string | number = model.group
      .split('主楼拆分/', 2)[1]
      .split('层', 1)[0];
    if (floor === '顶') floor = 13;

    return +floor;
  }

  async ngOnInit() {
    await this._diva.client?.applyScene('楼层展示');
    this._data.changeCode(`client.applyScene('楼层展示')`);

    // 获取所有楼层模型以及管道模型
    const [models, pipeModels] = await Promise.all([
      Promise.all(this.options.map((opt) => this._getModel(opt.value))),
      Promise.all(this.options.map((opt) => this._getModel(opt.pipeLineName))),
    ]);
    this.models = models;
    this.pipeModels = pipeModels;

    this.SetPathVisibility(false);

    // 保存所有楼层的原始位置
    this.floorGroup = await this._getFloorGroup();
  }
  // 销毁钩子
  ngOnDestroy() {
    if (this.floorGroup && this.explode) {
      this._assemble('fast');
    }
    // 显示所有楼层，隐藏所有管道，并且不显示示例代码
    this._setVisibility(this.models, true, true);
    this._setVisibility(this.pipeModels, false, true);
    this.SetPathVisibility(true);
  }
}
