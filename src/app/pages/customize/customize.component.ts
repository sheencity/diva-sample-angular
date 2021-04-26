import { Component, OnInit } from '@angular/core';
import {
  Device,
  DeviceController,
  Elevator,
  ElevatorController,
  linear,
  Model,
  Vector3,
} from '@sheencity/diva-sdk';
import { plainToClass } from 'class-transformer';
import { DropdownData } from 'src/app/common/dtos/dropdown-data.interface';
import { LiftConfigDto } from 'src/app/common/dtos/lift.dto';
import { LightDec } from 'src/app/common/dtos/light.model';
import { DataService } from 'src/app/common/services/data.service';
import { DivaService } from 'src/app/common/services/diva.service';

const lifts = plainToClass(LiftConfigDto, [
  {
    title: '一号梯',
  },
  {
    title: '二号梯',
  },
  {
    title: '三号梯',
  },
  {
    title: '四号梯',
  },
]);

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.scss'],
})
export class CustomizeComponent implements OnInit {
  // 电梯模型
  liftModels: Elevator[] = [];
  // 电梯控制器
  controllers: ElevatorController[] = [];
  // 初始层数
  currentLift = [1, 1, 1, 1];
  // 每层高度，由最高高度减最低高度除楼层获得
  step = 299.7;
  // 当前选中的块，为了添加index，防止下拉框被其他块覆盖住
  active = 0;
  // 自定义电梯
  lifts: any;
  // 电梯下拉框配置
  options = [
    { value: '1', placeholder: '1' },
    { value: '2', placeholder: '2' },
    { value: '3', placeholder: '3' },
    { value: '4', placeholder: '4' },
    { value: '5', placeholder: '5' },
    { value: '6', placeholder: '6' },
    { value: '7', placeholder: '7' },
    { value: '8', placeholder: '8' },
    { value: '9', placeholder: '9' },
    { value: '10', placeholder: '10' },
    { value: '11', placeholder: '11' },
    { value: '12', placeholder: '12' },
  ];
  constructor(private _diva: DivaService, private _data: DataService) {}

  /**
   * 给初始化的电梯添加 selected 属性，以便于在 dropdown 循环中绑定
   * @param lift (LiftConfigDto) 电梯
   * @param i (number) index
   * @returns 添加 selected 的电梯数组
   */
  private _addSelected(lift: LiftConfigDto, i: number) {
    let selected = {
      value: this.currentLift[i].toString(),
      placeholder: this.currentLift[i].toString(),
    } as DropdownData;
    return { ...lift, selected };
  }

  // 选中电梯块或者下拉框时触发，将 index=104 的 css 属性绑定到当前点击的控制块，防止下拉框被其他框覆盖
  activeLift(index: number) {
    this.active = index;
  }

  /**
   * 选择电梯层数
   * @param $event (dropdownData) 下拉框选中的值 
   * @param i (number) 被触发电梯的 index 值
   */
  async selectLift($event, i) {
    const value = Number($event.value);
    console.log('controllers', this.controllers);
    this.controllers[i].land(`f${value}`);
    this._data.changeCode(`elevatorController.land('f${value}')`);
  }

  async ngOnInit() {
    this._diva.client.applyScene('电梯演示');
    this._data.changeCode(`client.applyScene('电梯演示')`);
    this.lifts = lifts.map((lift, index) => this._addSelected(lift, index));
    for (let i = 0; i < 4; i++) {
      const [model] = await this._diva.client.getEntitiesByName<Model>(
        this.lifts[i].title
      );
      const coord = await model.getCoordinate();
      const controller = new ElevatorController({  // 初始化电梯控制器
        landings: {
          f1: new Vector3(coord.x, coord.y, 987),
          f2: new Vector3(coord.x, coord.y, 987 + this.step),
          f3: new Vector3(coord.x, coord.y, 987 + this.step * 2),
          f4: new Vector3(coord.x, coord.y, 987 + this.step * 3),
          f5: new Vector3(coord.x, coord.y, 987 + this.step * 4),
          f6: new Vector3(coord.x, coord.y, 987 + this.step * 5),
          f7: new Vector3(coord.x, coord.y, 987 + this.step * 6),
          f8: new Vector3(coord.x, coord.y, 987 + this.step * 7),
          f9: new Vector3(coord.x, coord.y, 987 + this.step * 8),
          f10: new Vector3(coord.x, coord.y, 987 + this.step * 9),
          f11: new Vector3(coord.x, coord.y, 987 + this.step * 10),
          f12: new Vector3(coord.x, coord.y, 987 + this.step * 11),
          f13: new Vector3(coord.x, coord.y, 987 + this.step * 12),
        },
        speed: 500,
      });
      const lift = new Elevator({ model, signal: controller.signal }); // 初始化电梯
      this.liftModels.push(lift);
      this.controllers.push(controller);
    }
  }
  // 销毁钩子
  ngOnDestroy(): void {}
}
