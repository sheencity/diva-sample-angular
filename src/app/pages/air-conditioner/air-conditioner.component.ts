import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeviceController, Device } from '@sheencity/diva-sdk';
import { plainToClass } from 'class-transformer';
import { LightDec } from 'src/app/common/dtos/light.model';
import { DataService } from 'src/app/common/services/data.service';
import { DivaService } from 'src/app/common/services/diva.service';

const airDecs = plainToClass(LightDec, [
  {
    title: '测试空调01',
    state: false,
  },
  {
    title: '测试空调02',
    state: false,
  },
  {
    title: '测试空调03',
    state: false,
  },
  {
    title: '测试空调04',
    state: false,
  },
])

@Component({
  selector: 'app-air-conditioner',
  templateUrl: './air-conditioner.component.html',
  styleUrls: ['./air-conditioner.component.scss']
})
export class AirConditionerComponent implements OnInit, OnDestroy {

  public airDecs: LightDec[] = [];
  public airs: Device[] = [];
  public airControllers: DeviceController[] = [];

  constructor(private _diva: DivaService, private _data: DataService) { }

  onSwitch($event: boolean, index: number) {
    if (this.airControllers.length === 0) return;
    $event ? this.airControllers[index].turnOn() : this.airControllers[index].turnOff();
    this._data.changeCode(`device.${$event ? 'turnOn()' : 'turnOff()'}`);
    console.log($event, index);
  }

  async onClick(index: number) {
    if (!this.airs[index]) return;
    await this._diva.client.request('Focus', {
      id: this.airs[index].id,
      distance: 1000.0,
      pitch: 30.0,
    })
    this._data.changeCode(`device.focus()`);
  }

  ngOnInit() {
    this._diva.client.applyScene('空调控制');
    this.airDecs = airDecs;
    this.airDecs.forEach((airDec) => airDec.state = false);
    this.airDecs.forEach(async (airDec) => {
      const airController = new DeviceController();
      const [air] = await this._diva.client.getEntitiesByName<Device>(airDec.title);
      air.bind(airController.signal);
      airController.turnOff();
      this.airs.push(air);
      this.airControllers.push(airController);
    })
    setTimeout(() => {this._data.changeCode(`client.applyScene('空调控制')`)}, 0);
  }

  ngOnDestroy() {
    this.airControllers.forEach((airController) => airController.turnOff());
  }
}
