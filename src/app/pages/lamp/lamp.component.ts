import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeviceController, Device } from '@sheencity/diva-sdk';
import { plainToClass } from 'class-transformer';
import { LightDec } from 'src/app/common/dtos/light.model';
import { DataService } from 'src/app/common/services/data.service';
import { DivaService } from 'src/app/common/services/diva.service';

const lightDecs = plainToClass(LightDec, [
  {
    title: '测试灯光01',
    state: false,
  },
  {
    title: '测试灯光02',
    state: false,
  },
  {
    title: '测试灯光03',
    state: false,
  },
  {
    title: '测试灯光04',
    state: false,
  },
])

@Component({
  selector: 'app-lamp',
  templateUrl: './lamp.component.html',
  styleUrls: ['./lamp.component.scss'],
})
export class LampComponent implements OnInit, OnDestroy {
  public lightDecs: LightDec[] = [];
  public lights: Device[] = [];
  public lightControllers: DeviceController[] = [];

  onSwitch($event: boolean, index: number) {
    if (this.lightControllers.length === 0) return;
    $event ? this.lightControllers[index].turnOn() : this.lightControllers[index].turnOff();
    this._data.changeCode(`client.${$event ? 'TurnOnTheLight' : 'TurnOffTheLight'}(${this.lights[index].id})`)
    console.log($event, index);
  }

  constructor(private _diva: DivaService, private _data: DataService) {}

  async onClick(index: number) {
    if (!this.lights[index]) return;
    await this._diva.client.request('Focus', {
      id: this.lights[index].id,
      distance: 1000.0,
      pitch: 30.0,
    })
    this._data.changeCode(`client.Focus(${this.lights[index].id})`);
  }
  async ngOnInit() {
    this._diva.client.applyScene('灯光控制');
    this._data.changeCode(`client.applyScene('灯光控制')`);
    this.lightDecs = lightDecs;
    this.lightDecs.forEach((lightDec) => lightDec.state = false);
    this.lightDecs.forEach(async (lightDec) => {
      const lightController = new DeviceController();
      const [light] = await this._diva.client.getEntitiesByName<Device>(lightDec.title);
      light.bind(lightController.signal);
      lightController.turnOff();
      this.lights.push(light);
      this.lightControllers.push(lightController);
    })
  }

  ngOnDestroy() {
    this.lightControllers.forEach((lightController) => lightController.turnOff());
  }
}
