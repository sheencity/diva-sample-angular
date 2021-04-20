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
  // 路灯1设置
  private _road1 = true;
  public set road1(v: boolean) {
    if (!this.roadController1) return;
    // 此处设置路灯1开关
    v ? this.roadController1.turnOn() : this.roadController1.turnOff();
    this._road1 = v;
  }
  public get road1() {
    return this._road1;
  }

  // 路灯2设置
  private _road2 = true;
  public set road2(v: boolean) {
    if (!this.roadController2) return;
    // 此处设置路灯2
    v ? this.roadController2.turnOn() : this.roadController2.turnOff();
    this._road2 = v;
  }
  public get road2() {
    return this._road2;
  }

  // 路灯3设置
  private _road3 = true;
  public set road3(v: boolean) {
    if (!this.roadController3) return;
    // 此处设置路灯3开关
    v ? this.roadController3.turnOn() : this.roadController3.turnOff();
    this._road3 = v;
  }
  public get road3() {
    return this._road3;
  }

  // 路灯4
  private _road4 = true;
  public set road4(v: boolean) {
    if (!this.roadController4) return;
    // 此处设置路灯4开关
    v ? this.roadController4.turnOn() : this.roadController4.turnOff();
    this._road4 = v;
  }
  public get road4() {
    return this._road4;
  }

  constructor(private _diva: DivaService, private _data: DataService) {}

  async ngOnInit() {
    this._diva.client.applyScene('灯光控制');
    this._data.changeCode(`client.applyScene('灯光控制')`);
    this.roadController1 = new DeviceController();
    this.roadController2 = new DeviceController();
    this.roadController3 = new DeviceController();
    this.roadController4 = new DeviceController();
    this.road01 = (await this._diva.client.getEntitiesByName<Light>('路灯01'))[0];
    this._data.changeCode(`client.getEntitiesByName<Light>('路灯01')`);
    this.road02 = (await this._diva.client.getEntitiesByName<Light>('路灯02'))[0];
    this._data.changeCode(`client.getEntitiesByName<Light>('路灯02')`);
    this.road03 = (await this._diva.client.getEntitiesByName<Light>('路灯03'))[0];
    this._data.changeCode(`client.getEntitiesByName<Light>('路灯03')`);
    this.road04 = (await this._diva.client.getEntitiesByName<Light>('路灯04'))[0];
    this._data.changeCode(`client.getEntitiesByName<Light>('路灯04')`);
    this.road01.bind(this.roadController1.signal);
    this.road02.bind(this.roadController2.signal);
    this.road03.bind(this.roadController3.signal);
    this.road04.bind(this.roadController4.signal);
    // this.road01.addEventListener('click', (event) => {
    //   console.log('event is', event)
    // })
  }

  ngOnDestroy() {
  }
}
