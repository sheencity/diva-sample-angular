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

const airDecs = plainToClass(LightDec, [
  {
    title: '空调01',
    state: false,
  },
  {
    title: '空调02',
    state: false,
  },
  {
    title: '空调03',
    state: false,
  },
  {
    title: '空调04',
    state: false,
  },
])

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.scss'],
})
export class CustomizeComponent implements OnInit {
  liftModels: Elevator[] = [];
  controllers: ElevatorController[] = [];
  currentLift = [1, 1, 1, 1];
  step = 299.7;
  active = 0;
  lifts: any;

  // 空调数据
  public airDecs: LightDec[] = [];
  public airs: Device[] = [];
  public airControllers: DeviceController[] = [];

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

  private _addSelected(lift: LiftConfigDto, i: number) {
    let selected = {
      value: this.currentLift[i].toString(),
      placeholder: this.currentLift[i].toString(),
    } as DropdownData;
    return { ...lift, selected };
  }

  activeLift(index: number) {
    this.active = index;
  }

  async selectLift($event, i) {
    const value = Number($event.value);
    console.log('controllers', this.controllers);
    this.controllers[i].land(`f${value}`);
    this._data.changeCode(`lift${i+1}.controller('f${value}')`);
  }

  onSwitch($event: boolean, index: number) {
    if (this.airControllers.length === 0) return;
    $event ? this.airControllers[index].turnOn() : this.airControllers[index].turnOff();
    this._data.changeCode(`client.${$event ? 'TurnOnTheLight' : 'TurnOffTheLight'}(${this.airs[index].id})`)
    console.log($event, index);
  }

  async onClick(index: number) {
    if (!this.airs[index]) return;
    await this._diva.client.request('Focus', {
      id: this.airs[index].id,
      distance: 1000.0,
      pitch: 30.0,
    })
    this._data.changeCode(`client.Focus(${this.airs[index].id})`);
  }

  async ngOnInit() {
    this._diva.client.applyScene('电梯演示');
    this._data.changeCode(`client.applyScene('电梯演示')`);
    this.lifts = lifts.map((lift, index) => this._addSelected(lift, index));
    this.airDecs = airDecs;
    this.airDecs.forEach((airDec) => airDec.state = false);
    for (let i = 0; i < 4; i++) {
      const [model] = await this._diva.client.getEntitiesByName<Model>(
        this.lifts[i].title
      );
      const coord = await model.getCoordinate();
      const controller = new ElevatorController({
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
      const lift = new Elevator({ model, signal: controller.signal });
      this.liftModels.push(lift);
      this.controllers.push(controller);
    }
    this.airDecs.forEach(async (airDec) => {
      const airController = new DeviceController();
      const [air] = await this._diva.client.getEntitiesByName<Device>(airDec.title);
      air.bind(airController.signal);
      airController.turnOff();
      this.airs.push(air);
      this.airControllers.push(airController);
    })
  }
  // 销毁钩子
  ngOnDestroy(): void {
    this.airControllers.forEach((airController) => airController.turnOff());
  }
}
