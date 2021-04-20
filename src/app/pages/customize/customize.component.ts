import { Component, OnInit } from '@angular/core';
import { Elevator, ElevatorController, linear, Model } from '@sheencity/diva-sdk';
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
      { value: '13', placeholder: '13' },
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
    const lift = this.lifts[i];
    const value = Number($event.value);
    const diffStep = value - this.currentLift[i];
    console.log('diffStep', value, this.currentLift[i], diffStep, Math.abs(diffStep));
    console.log('selectLift is', lift);
    const [model] = await this._diva.client.getEntitiesByName<Model>(lift.title);
    this._data.changeCode(`client.getEntitiesByName<Model>('${lift.title}')`)
    const controller = new ElevatorController({
      landings: {
        f1: [-9022.01171875, -39078.75390625, 987],
        f2: [-9022.01171875, -39078.75390625, 987 + 300],
      },
      speed: 500,
    });
    const liftt = new Elevator({model, signal: controller.signal});
    controller.land('f2');
    // if(!model) return;
    // const coord = await model.getCoordinate()
    // console.log('coord is', coord, );
    // // const duration = `${500 * Math.abs(diffStep)}ms` as `${number}ms`;
    // console.log('duration', 500 * Math.abs(diffStep));
    // await model.setCoordinate([coord.x, coord.y, 987 + this.step * (value -1)], {
    //   duration: 500 * Math.abs(diffStep),
    //   timingFunction: linear,
    // })
    // this.currentLift[i] = value;
  }

  ngOnInit(): void {
    this._diva.client.applyScene('电梯演示');
    this._data.changeCode(`client.applyScene('电梯演示')`);
    this.currentLift = this._data.currentLift;
    this.lifts = lifts.map((lift, index) => this._addSelected(lift, index));
  }
  // 销毁钩子
  ngOnDestroy(): void {
    this._data.currentLift = this.currentLift;
  }
}
