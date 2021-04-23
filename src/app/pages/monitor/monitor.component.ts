import { Component, OnDestroy, OnInit } from '@angular/core';
import { Model, RenderingStyleMode } from '@sheencity/diva-sdk';
import { plainToClass } from 'class-transformer';
import {
  MonitorConfigDto,
  MonitorEquiConfigDto,
} from 'src/app/common/dtos/monitor.dto';
import { DataService } from 'src/app/common/services/data.service';
import { DivaService } from 'src/app/common/services/diva.service';

const monitors = plainToClass(MonitorConfigDto, [
  {
    title: '测试设备01',
    url: 'rtmp://rtmp01open.ys7.com/openlive/53e8792aa1e540ddb693afb20aaa9517.hd',
  },
  {
    title: '测试设备02',
    url: 'rtmp://rtmp01open.ys7.com/openlive/53e8792aa1e540ddb693afb20aaa9517.hd',
  },
  {
    title: '测试设备03',
    url: 'https://www.sheencity.com',
  },
  {
    title: '测试设备04',
    url: 'https://www.sheencity.com',
  },
]);

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss'],
})
export class MonitorComponent implements OnInit, OnDestroy {
  // 监控设备
  monitors = monitors.slice(0, 2);
  // 弹窗设备
  monitorEquis = monitors.slice(2, 4);
  // 设备模型列表
  monitorModels: Model[] = [];
  // 事件句柄列表
  monitorHandlers = [];
  // 选中的监控列表
  selectedMonitorIndex: number = -1;
  constructor(private _diva: DivaService, private _data: DataService) {}

  async selectMonitor(monitor: MonitorConfigDto, index: number, isPop: boolean) {
      index = isPop ? index + 2 : index;
      try {
        if (this.selectedMonitorIndex >= 0) {
          await this._diva.client.request('DestroyWebWidget', {id: this.monitorModels[this.selectedMonitorIndex].id});
        }
      } catch {
      }
      await this._diva.client.request('Focus', {
        id: this.monitorModels[index].id,
        distance: 1000.0,
        pitch: 30.0,
      })
      this.selectedMonitorIndex = index;
      this._data.changeCode(`model.focus()`);
  }

  async refresh(monitorEqui: MonitorEquiConfigDto, index: number) {
    index = index + 2;
    console.log('monitorEqui is', monitorEqui, index);
    try {
      await this._diva.client.request('DestroyWebWidget', {id: this.monitorModels[index].id});
    } catch {
    }
    await this._diva.client.request('CreateWebWidget', {
      id: this.monitorModels[index].id,
      widget: {
        url: monitorEqui.url,
        width: 500,
        height: 280,
      },
    })
    // 此处设置设备网址刷新信息
  }

  onKeydown($event) {
    $event.stopPropagation();
  }

  async ngOnInit() {
    this._diva.client.applyScene('监控设备')
    for (let i=0; i < 4; i++) {
      let model: Model;
      let url: string;
      if (i < 2) {
        model = (await this._diva.client.getEntitiesByName<Model>(this.monitors[i].title))[0];
        url = this.monitors[i].url;
      } else {
        model = (await this._diva.client.getEntitiesByName<Model>(this.monitorEquis[i - 2].title))[0];
        url = this.monitorEquis[i - 2].url;
      }
      const handle = () => {
        this._diva.client.request('CreateWebWidget', {
          id: model.id,
          widget: {
            url,
            width: 500,
            height: 280,
          }
        })
      }
      model.setRenderingStyleMode(RenderingStyleMode.Default);
      model.addEventListener('click', handle)
      this.monitorModels.push(model);
      this.monitorHandlers.push(handle);
      setTimeout(() => {this._data.changeCode(`client.applyScene('监控设备')`)}, 0);
    }
  }

  // 销毁钩子
  ngOnDestroy(): void {
    this.monitorModels.forEach((monitor, index) => monitor.removeEventListener('click', this.monitorHandlers[index]));
    this.monitorModels.forEach((monitor) => this._diva.client.request('DestroyWebWidget', {id: monitor.id}));
  }
}
