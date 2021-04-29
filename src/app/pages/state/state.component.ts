import { Component, OnDestroy, OnInit } from '@angular/core';
import { Model, RenderingStyleMode } from '@sheencity/diva-sdk';
import { DropdownData } from 'src/app/common/dtos/dropdown-data.interface';
import {
  EquipmentConfigDto,
  EquipmentState,
} from 'src/app/common/dtos/equipment.dto';
import { DataService } from 'src/app/common/services/data.service';
import { DivaService } from 'src/app/common/services/diva.service';

const equipments = [
  {
    title: '空调',
    state: EquipmentState.Default,
  },
  {
    title: '电视机',
    state: EquipmentState.Default,
  },
  {
    title: '路由器',
    state: EquipmentState.Default,
  },
  {
    title: '冰箱',
    state: EquipmentState.Default,
  },
] as EquipmentConfigDto[];

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss'],
})
export class StateComponent implements OnInit, OnDestroy {
  // 是否选择了默认值，防止点击默认值之后事件穿透到块上，触发 click 模型聚焦
  isSelectDefault = false;
  // 选中的设备
  selectedEqui: any = null;
  // 选中的设备的 index 值，为了添加选中文字变白，暂时未使用
  selected: number = null;
  // 激活的块 index 值，给块设置 index 值，防止下拉框被其他块覆盖
  active: number;
  equipments = equipments.map((equipment) => this.addSelected(equipment));
  constructor(private _diva: DivaService, private _data: DataService) {}

  // 状态配置
  options = [
    { value: EquipmentState.Default, placeholder: '默认' },
    { value: EquipmentState.Alarm, placeholder: '报警' },
    { value: EquipmentState.Translucent, placeholder: '半透' },
    { value: EquipmentState.Hidden, placeholder: '隐藏' },
  ];

  /**
   * 设备添加 selectd 属性，方便在循环下拉框组件中绑定值
   * @param equipment 设备
   * @returns 
   */
  private addSelected(equipment: EquipmentConfigDto) {
    let selected: DropdownData<EquipmentState>;
    switch (equipment.state) {
      case EquipmentState.Default:
        selected = { value: EquipmentState.Default, placeholder: '默认' };
        break;
      case EquipmentState.Alarm:
        selected = { value: EquipmentState.Alarm, placeholder: '报警' };
        break;
      case EquipmentState.Translucent:
        selected = { value: EquipmentState.Translucent, placeholder: '半透' };
        break;
      case EquipmentState.Hidden:
        selected = { value: EquipmentState.Hidden, placeholder: '隐藏' };
        break;
      default:
        selected = { value: EquipmentState.Default, placeholder: '默认' };
        break;
    }
    return { ...equipment, selected };
  }

  /**
   * 设备聚焦
   * @param equi 设备
   * @param i (number) 设备的 index 值
   * @returns 
   */
  async onClick(equi: EquipmentConfigDto, i: number) {
    if (this.isSelectDefault) return;
    this.active = i;
    this.selected = i;
    const [model] = await this._diva.client.getEntitiesByName(
      this.equipments[i].title
    );
    // console.log('model is', model);
    if (!model) return;
    this.selectedEqui = model;
    const equipmentId = model.id;
    this._diva.client.request('Focus', {
      id: equipmentId,
      distance: 1000.0,
      pitch: 30.0,
    });
    this._data.changeCode(
      `model.focus()`
    );
    console.log('equi', equi);
  }

  /**
   * 设置设备的状态
   * @param equi 设备
   * @param $event 选中的状态
   * @returns 
   */
  async onChange(equi: EquipmentConfigDto, $event: DropdownData) {
    if ($event.value === 'default') {
      this.isSelectDefault = true;
      setTimeout(() => {
        this.isSelectDefault = false;
      }, 500);
    }
    const [model] = await this._diva.client.getEntitiesByName<Model>(
      equi.title
    );
    if (!model) return;
    // const id = model.id;
    const type = $event.value as RenderingStyleMode;
    model.setRenderingStyleMode(type);

    this._data.changeCode(
      `model.setRenderingStyleMode(RenderingStyleMode.${type
        .split('')
        .map((_, idx) => (idx === 0 ? _.toUpperCase() : _))
        .join('')})`
    );
  }

  onDropdownClick($event: Event, index: number) {
    $event.stopPropagation();
    this.active = index;
  }

  ngOnInit(): void {
    this._diva.client?.applyScene('状态演示');
    if (this._diva.client?.applyScene) {
      this._data.changeCode(`client.applyScene('状态演示')`);
    }
  }

  // 销毁钩子
  ngOnDestroy(): void {
    this.equipments.forEach(async (equi) => {
      const [model] = await this._diva.client.getEntitiesByName<Model>(equi.title);
      model.setRenderingStyleMode(RenderingStyleMode.Default);
    });
  }
}
