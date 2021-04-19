import { Component, OnInit } from '@angular/core';
import { DropdownData } from 'src/app/common/dtos/dropdown-data.interface';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss']
})
export class GlobalComponent implements OnInit {
  // 罗盘
  private _compass = false;
  public set compass(v: boolean) {
    console.log('compass', v);
    // 此处设置罗盘开关
    this._compass = v;
  }
  public get compass() {
    return this._compass;
  }

  // 镜头旋转
  private _rotation = false;
  public set rotation(v: boolean) {
    console.log('rotation', v);
    // 此处设置镜头旋转开关
    this._rotation = v;
  }
  public get rotation() {
    return this._rotation;
  }

  // 模式
  private _selectedMode: DropdownData = { value: 'false', placeholder: '飞行' };
  public set selectedMode(v: DropdownData) {
    const active = v.value === 'true' ? true : false;
    console.log('第三人称模式是', active)
    // 此处设置第三人称
    this._selectedMode = v;
  }
  public get selectedMode() {
    return this._selectedMode;
  }

  options = [
    { value: 'false', placeholder: '飞行' },
    { value: 'true', placeholder: '人视' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
