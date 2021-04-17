import { Component, OnInit } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { DivaService } from 'src/app/common/services/diva.service';
import { DropdownData } from 'src/app/common/dtos/dropdown-data.interface';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.scss'],
})
export class FloorComponent implements OnInit {
  // 炸开
  private _explode = false;
  public set explode(v: boolean) {
    console.log('explode', v);
    // 此处设置炸开和聚合
    this._explode = v;
  }
  public get explode() {
    return this._explode;
  }

  // 分层聚焦
  private _gradation = false;
  public set gradation(v: boolean) {
    console.log('gradation', v);
    // 此处设置分层聚焦
    this._gradation = v;
  }
  public get gradation() {
    return this._gradation;
  }

  // 层数
  private _selectedFloor: DropdownData = { value: '1', placeholder: '1' };
  public set selectedFloor(v: DropdownData) {
    console.log('层数是', Number(v.value))
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
    { value: '1', placeholder: '1' },
    { value: '2', placeholder: '2' },
    { value: '3', placeholder: '3' },
    { value: '4', placeholder: '4' },
  ];
  constructor(private _diva: DivaService) {}

  ngOnInit(): void {}
}
