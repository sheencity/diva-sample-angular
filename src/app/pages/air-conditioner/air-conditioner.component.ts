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
  // 自动的空调设备
  public airDecs: LightDec[] = [];
  // 空调设备
  public airs: Device[] = [];
  // 空调控制器
  public airControllers: DeviceController[] = [];

  constructor(private _diva: DivaService, private _data: DataService) { }
  /**
   * 空调的开关
   * @param $event (boolean) switch 的值
   * @param index 控制空调的 index 值
   * @returns void
   */
  onSwitch($event: boolean, index: number) {
    if (this.airControllers.length === 0) return;
    $event ? this.airControllers[index].turnOn() : this.airControllers[index].turnOff();
    this._data.changeCode(`device.${$event ? 'turnOn()' : 'turnOff()'}`);
    console.log($event, index);
  }

  /**
   * 设备聚焦
   * @param index 选中设备的 index 值
   * @returns 
   */
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
    // 初始化设备的初始状态
    this.airDecs.forEach((airDec) => airDec.state = false);
    this.airDecs.forEach(async (airDec) => {
      const airController = new DeviceController();
      const [air] = await this._diva.client.getEntitiesByName<Device>(airDec.title);
      air.bind(airController.signal); // 绑定控制器
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
