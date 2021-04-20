import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeviceController, Light } from '@sheencity/diva-sdk';
import { DataService } from 'src/app/common/services/data.service';
import { DivaService } from 'src/app/common/services/diva.service';

@Component({
  selector: 'app-lamp',
  templateUrl: './lamp.component.html',
  styleUrls: ['./lamp.component.scss'],
})
export class LampComponent implements OnInit, OnDestroy {
  public road01: Light;
  public road02: Light;
  public road03: Light;
  public road04: Light;
  public roadController1: DeviceController;
  public roadController2: DeviceController;
  public roadController3: DeviceController;
  public roadController4: DeviceController;
  public lampState: boolean[];
  // 路灯1设置
  private _road1 = false;
  public set road1(v: boolean) {
    console.log('road1', v);
    // 此处设置路灯1开关
    v ? this.roadController1.turnOn() : this.roadController1.turnOff();
    this.lampState[0] = v;
    this._road1 = v;
  }
  public get road1() {
    return this._road1;
  }

  // 路灯2设置
  private _road2 = false;
  public set road2(v: boolean) {
    console.log('road2', v);
    // 此处设置路灯2
    v ? this.roadController2.turnOn() : this.roadController2.turnOff();
    this.lampState[1] = v;
    this._road2 = v;
  }
  public get road2() {
    return this._road2;
  }

  // 路灯3设置
  private _road3 = false;
  public set road3(v: boolean) {
    console.log('road', v);
    // 此处设置路灯3开关
    v ? this.roadController3.turnOn() : this.roadController3.turnOff();
    this.lampState[2] = v;
    this._road3 = v;
  }
  public get road3() {
    return this._road3;
  }

  // 路灯4
  private _road4 = false;
  public set road4(v: boolean) {
    console.log('road4', v);
    // 此处设置路灯4开关
    v ? this.roadController4.turnOn() : this.roadController4.turnOff();
    this.lampState[3] = v;
    this._road4 = v;
  }
  public get road4() {
    return this._road4;
  }

  constructor(private _diva: DivaService, private _data: DataService) {}

  async ngOnInit() {
    this.lampState = this._data.lampState;
    this.road1 = this.lampState[0];
    this.road2 = this.lampState[1];
    this.road3 = this.lampState[2];
    this.road4 = this.lampState[3];
    this._diva.client.applyScene('灯光控制');
    this.roadController1 = new DeviceController();
    this.roadController2 = new DeviceController();
    this.roadController3 = new DeviceController();
    this.roadController4 = new DeviceController();
    this.road01 = (await this._diva.client.getEntitiesByName<Light>('路灯01'))[0];
    this.road02 = (await this._diva.client.getEntitiesByName<Light>('路灯02'))[0];
    this.road03 = (await this._diva.client.getEntitiesByName<Light>('路灯03'))[0];
    this.road04 = (await this._diva.client.getEntitiesByName<Light>('路灯04'))[0];
    this.road01.signal = this.roadController1.signal;
    this.road02.signal = this.roadController2.signal;
    this.road03.signal = this.roadController3.signal;
    this.road04.signal = this.roadController4.signal;
  }

  ngOnDestroy() {
    this._data.lampState = this.lampState;
  }
}
