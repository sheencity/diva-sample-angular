import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeviceController, Device } from '@sheencity/diva-sdk';
import { DataService } from 'src/app/common/services/data.service';
import { DivaService } from 'src/app/common/services/diva.service';

const lightDecs = [
  {
    title: '测试灯光01',
    state: true,
  },
  {
    title: '测试灯光02',
    state: true,
  },
  {
    title: '测试灯光03',
    state: true,
  },
  {
    title: '测试灯光04',
    state: true,
  },
] as {title: string, state: boolean}[];

@Component({
  selector: 'app-lamp',
  templateUrl: './lamp.component.html',
  styleUrls: ['./lamp.component.scss'],
})
export class LampComponent implements OnInit, OnDestroy {
  // 自定义的灯光设备
  public lightDecs: {title: string, state: boolean}[] = [];
  // 灯光设备
  public lights: Device[] = [];
  // 灯光控制器
  public lightControllers: DeviceController[] = [];
  constructor(private _diva: DivaService, private _data: DataService) {}

  /**
   * 灯光的开关
   * @param $event (boolean) switch 的值
   * @param index 控制灯光的 index 值
   * @returns void
   */
  onSwitch($event: boolean, index: number) {
    if (this.lightControllers.length === 0) return;
    $event
      ? this.lightControllers[index].turnOn()
      : this.lightControllers[index].turnOff();
    this._data.changeCode(`device.${$event ? 'turnOn()' : 'turnOff()'}`);
    console.log($event, index);
  }

  /**
   * 设备聚焦
   * @param index 选中设备的 index 值
   * @returns
   */
  async onClick(index: number) {
    if (!this.lights[index]) return;
    await this.lights[index].focus(1000, Math.PI / 6)
    this._data.changeCode(`device.focus(1000, Math.PI / 6)`);
  }
  async ngOnInit() {
    this._diva.client.applyScene('灯光控制');
    this.lightDecs = lightDecs;
    // 初始化设备的初始状态
    this.lightDecs.forEach((lightDec) => (lightDec.state = true));
    this.lightDecs.forEach(async (lightDec) => {
      const lightController = new DeviceController();
      const [light] = await this._diva.client.getEntitiesByName<Device>(
        lightDec.title
      );
      light.bind(lightController.signal); // 绑定控制器
      lightController.turnOff();
      this.lights.push(light);
      this.lightControllers.push(lightController);
    });
    setTimeout(() => {
      this._data.changeCode(`client.applyScene('灯光控制')`);
    }, 0);
  }

  ngOnDestroy() {
    // this.lightControllers.forEach((lightController) => lightController.turnOff());
  }
}
