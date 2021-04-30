import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovementMode } from '@sheencity/diva-sdk';
import { DropdownData } from 'src/app/common/models/dropdown-data.interface';
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
    this._compass = v;
    this._data.compass = v;
    this._diva.client.setCompass(v);
    this._data.changeCode(`client.setCompass(${v})`);
  }
  public get compass() {
    return this._compass;
  }

  // 模式
  private _selectedMode: DropdownData = { value: 'false', placeholder: '飞行' };
  public set selectedMode(v: DropdownData) {
    this._selectedMode = v;
    this._diva.client.setMovementMode(v.value == 'true' ? MovementMode.ThirdPerson : MovementMode.Fly)
    this._data.changeCode(`client.setMovementMode(${v.value == 'true' ? 'MovementMode.ThirdPerson' : 'MovementMode.Fly'})`);
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

  async ngOnInit() {
    this._compass = this._data.compass;
    await this._diva.client.applyScene('全局配置');
    setTimeout(() => {this._data.changeCode(`client.applyScene('全局配置')`)}, 0);
  }

  ngOnDestroy(): void {
    this._diva.client.setMovementMode(MovementMode.Fly);
  }
}
