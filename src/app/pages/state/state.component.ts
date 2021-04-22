import { Component, OnDestroy, OnInit } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { DropdownData } from 'src/app/common/dtos/dropdown-data.interface';
import {
  EquipmentConfigDto,
  EquipmentState,
} from 'src/app/common/dtos/equipment.dto';
import { DataService } from 'src/app/common/services/data.service';
import { DivaService } from 'src/app/common/services/diva.service';

const equipments = plainToClass(EquipmentConfigDto, [
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
]);

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss'],
})
export class StateComponent implements OnInit, OnDestroy {
  isSelectDefault = false;
  selectedEqui: any = null;
  selected: number = null;
  active: number;
  equipments = equipments.map((equipment) => this.addSelected(equipment));
  constructor(private _diva: DivaService, private _data: DataService) {}

  options = [
    { value: EquipmentState.Default, placeholder: '默认' },
    { value: EquipmentState.Alarm, placeholder: '报警' },
    { value: EquipmentState.Translucent, placeholder: '半透' },
    { value: EquipmentState.Hidden, placeholder: '隐藏' },
  ];

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

  async onClick(equi: EquipmentConfigDto, i: number) {
    if (this.isSelectDefault) return;
    this.active = i;
    this.selected = i;
    const [model] = await this._diva.client.getEntitiesByName(this.equipments[i].title);
    // console.log('model is', model);
    if(!model) return
    this.selectedEqui = model;
    const equipmentId = model.id
    this._diva.client.request('Focus', {
      id: equipmentId,
      distance: 1000.0,
      pitch: 30.0,
    });
    this._data.changeCode(`client.Focus({id: '${equipmentId}', distance: 1000.0, pitch: 30.0})`);
    console.log('equi', equi);
    // 此处设置设备的聚焦状态
  }

  async onChange(equi: EquipmentConfigDto, $event: DropdownData) {
    if ($event.value === 'default') {
      this.isSelectDefault = true;
      setTimeout(() => {
        this.isSelectDefault = false;
      }, 500);
    }
    const [model] = await this._diva.client.getEntitiesByName(equi.title)
    if(!model) return
    const id = model.id
    const type = $event.value;
    // 此处设置渲染状态
    this._diva.client.request('SetRenderStatus', {
      id,
      type,
    });
    this._data.changeCode(`client.SetRenderStatus({id: '${id}', type: ${type}})`);
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
      const [model] = await this._diva.client.getEntitiesByName(equi.title)
      this._diva.client.request('SetRenderStatus', {
        id: model.id,
        type: EquipmentState.Default,
      });
    })
  }
}
