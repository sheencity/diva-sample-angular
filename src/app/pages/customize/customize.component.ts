import { Component, OnInit } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { DropdownData } from 'src/app/common/dtos/dropdown-data.interface';
import { LiftConfigDto } from 'src/app/common/dtos/lift.dto';

const lifts = plainToClass(LiftConfigDto, [
  {
    title: '1号梯',
    floor: 2,
  },
  {
    title: '2号梯',
    floor: 5,
  },
  {
    title: '3号梯',
    floor: 7,
  },
  {
    title: '4号梯',
    floor: -1,
  },
]);

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.scss'],
})
export class CustomizeComponent implements OnInit {
  active = 0;
  selectedLift = 0;
  lifts = lifts.map((lift) => this._addSelected(lift));

  options = [
    [
      { value: '-2', placeholder: '-2' },
      { value: '-1', placeholder: '-1' },
      { value: '1', placeholder: '1' },
      { value: '2', placeholder: '2' },
      { value: '3', placeholder: '3' },
      { value: '5', placeholder: '5' },
      { value: '6', placeholder: '6' },
      { value: '7', placeholder: '7' },
      { value: '8', placeholder: '8' },
      { value: '9', placeholder: '9' },
      { value: '10', placeholder: '10' },
      { value: '11', placeholder: '11' },
      { value: '12', placeholder: '12' },
      { value: '15', placeholder: '15' },
      { value: '16', placeholder: '16' },
      { value: '17', placeholder: '17' },
      { value: '19', placeholder: '19' },
      { value: '20', placeholder: '20' },
      { value: '21', placeholder: '21' },
      { value: '22', placeholder: '22' },
      { value: '23', placeholder: '23' },
      { value: '25', placeholder: '25' },
      { value: '26', placeholder: '26' },
    ],
    [
      { value: '-3', placeholder: '-3' },
      { value: '-2', placeholder: '-2' },
      { value: '-1', placeholder: '-1' },
      { value: '1', placeholder: '1' },
      { value: '2', placeholder: '2' },
      { value: '3', placeholder: '3' },
      { value: '5', placeholder: '5' },
      { value: '6', placeholder: '6' },
      { value: '7', placeholder: '7' },
      { value: '8', placeholder: '8' },
      { value: '9', placeholder: '9' },
      { value: '10', placeholder: '10' },
      { value: '11', placeholder: '11' },
      { value: '12', placeholder: '12' },
      { value: '15', placeholder: '15' },
      { value: '16', placeholder: '16' },
      { value: '17', placeholder: '17' },
      { value: '19', placeholder: '19' },
      { value: '20', placeholder: '20' },
      { value: '21', placeholder: '21' },
      { value: '22', placeholder: '22' },
      { value: '23', placeholder: '23' },
      { value: '25', placeholder: '25' },
      { value: '26', placeholder: '26' },
    ],
    [
      { value: '-2', placeholder: '-2' },
      { value: '-1', placeholder: '-1' },
      { value: '1', placeholder: '1' },
      { value: '2', placeholder: '2' },
      { value: '3', placeholder: '3' },
      { value: '5', placeholder: '5' },
      { value: '6', placeholder: '6' },
      { value: '7', placeholder: '7' },
      { value: '8', placeholder: '8' },
      { value: '9', placeholder: '9' },
      { value: '10', placeholder: '10' },
      { value: '11', placeholder: '11' },
      { value: '12', placeholder: '12' },
      { value: '15', placeholder: '15' },
      { value: '16', placeholder: '16' },
      { value: '17', placeholder: '17' },
      { value: '19', placeholder: '19' },
      { value: '20', placeholder: '20' },
      { value: '21', placeholder: '21' },
      { value: '22', placeholder: '22' },
      { value: '23', placeholder: '23' },
      { value: '25', placeholder: '25' },
      { value: '26', placeholder: '26' },
      { value: '27', placeholder: '27' },
      { value: '28', placeholder: '28' },
      { value: '29', placeholder: '29' },
      { value: '30', placeholder: '30' },
    ],
    [
      { value: '-1', placeholder: '-1' },
      { value: '1', placeholder: '1' },
      { value: '2', placeholder: '2' },
      { value: '3', placeholder: '3' },
      { value: '5', placeholder: '5' },
      { value: '6', placeholder: '6' },
      { value: '7', placeholder: '7' },
      { value: '8', placeholder: '8' },
      { value: '9', placeholder: '9' },
      { value: '10', placeholder: '10' },
      { value: '11', placeholder: '11' },
      { value: '12', placeholder: '12' },
      { value: '15', placeholder: '15' },
      { value: '16', placeholder: '16' },
      { value: '17', placeholder: '17' },
      { value: '19', placeholder: '19' },
      { value: '20', placeholder: '20' },
      { value: '21', placeholder: '21' },
    ],
  ];
  constructor() {}

  private _addSelected(lift: LiftConfigDto) {
    let selected = {
      value: lift.floor.toString(),
      placeholder: lift.floor.toString(),
    } as DropdownData;
    return { ...lift, selected };
  }

  activeLift(lift: LiftConfigDto, index: number) {
    this.active = index;
    console.log('lift is', lift);
    // 此处设置电梯聚焦
  }

  selectLift($event, i) {
    const lift = this.lifts[i];
    const value = Number($event.value);
    console.log('selectLift is', lift, value);
    // 此处设置电梯层数
  }

  ngOnInit(): void {}
  // 销毁钩子
  ngOnDestroy(): void {}
}
