import { Component, OnDestroy, OnInit } from '@angular/core';
import { DropdownData } from 'src/app/common/dtos/dropdown-data.interface';
import { DataService } from 'src/app/common/services/data.service';
import { DivaService } from 'src/app/common/services/diva.service';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss']
})
export class GlobalComponent implements OnInit, OnDestroy {
  // 罗盘
  private _compass: boolean;
  public set compass(v: boolean) {
    console.log('compass', v);
    this._diva.client.setCompass(v);
    this._compass = v;
    this._data.compass = v;
    // 此处设置罗盘开关
  }
  public get compass() {
    return this._compass;
  }

  // 镜头旋转
  private _rotation: boolean;
  public set rotation(v: boolean) {
    console.log('rotation', v);
    this._diva.client.request('RotateAroundTheCenter',{
      direction: v ? 'clockwise' : 'stop',
      duration: 40,
    });
    this._rotation = v;
    this._data.rotation = v;
    // 此处设置镜头旋转开关
  }
  public get rotation() {
    return this._rotation;
  }

  // 模式
  private _selectedMode: DropdownData;
  public set selectedMode(v: DropdownData) {
    this._selectedMode = v;
    this._data.selectedMode = v;
    const active = v.value === 'true' ? true : false;
    console.log('第三人称模式是', active)
    this._diva.client.request('ActiveThirdPersonMode', {
      'active': v.value == 'true'
    })
    this._selectedMode = v;
  }
  public get selectedMode() {
    return this._selectedMode;
  }

  options = [
    { value: 'false', placeholder: '飞行' },
    { value: 'true', placeholder: '人视' },
  ];

  constructor(private _data: DataService, private _diva: DivaService) { }

  ngOnInit(): void {
    this._selectedMode = this._data.selectedMode;
    this._compass = this._data.compass;
    this._rotation = this._data.rotation;
  }

  // 销毁钩子
  ngOnDestroy(): void {

  }

}
