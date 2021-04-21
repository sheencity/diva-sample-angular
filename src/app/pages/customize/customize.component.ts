import { Component, OnInit } from '@angular/core';
import {
  Elevator,
  ElevatorController,
  linear,
  Model,
  Vector3,
} from '@sheencity/diva-sdk';
import { plainToClass } from 'class-transformer';
import { DropdownData } from 'src/app/common/dtos/dropdown-data.interface';
import { LiftConfigDto } from 'src/app/common/dtos/lift.dto';
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
  liftModels: Elevator[] = [];
  controllers: ElevatorController[] = [];
  currentLift = [1, 1, 1, 1];
  step = 299.7;
  active = 0;
  lifts: any;

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
    // this._data.changeCode(`client.getEntitiesByName<Model>('${lift.title}')`);
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
  }
  // 销毁钩子
  ngOnDestroy(): void {}
}
