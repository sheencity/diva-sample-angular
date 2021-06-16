import { Component, OnDestroy, OnInit } from '@angular/core';
import { Model, RenderingStyleMode } from '@sheencity/diva-sdk';
import { DataService } from 'src/app/common/services/data.service';
import { DivaService } from 'src/app/common/services/diva.service';

const monitors = [
  {
    title: '测试设备01',
    url: 'rtmp://xxxxxxxxxxxxxxxxxx',
  },
  {
    title: '测试设备02',
    url: 'rtmp://xxxxxxxxxxxxxxxxxx',
  },
  {
    title: '测试设备03',
    url: 'https://www.sheencity.com',
  },
  {
    title: '测试设备04',
    url: 'https://www.sheencity.com',
  },
] as { title: string; url: string }[];

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
  // 事件句柄列表
  monitorHandlers: () => any;
  // 选中的监控列表

  constructor(private _diva: DivaService, private _data: DataService) {}

  async removeWidget(name: string) {
    await (await this.getModelByName(name)).setWebWidget(null);
  }
  async setWidget(monitor: string | Model, url: string) {
    if (typeof monitor === 'string') {
      monitor = await this.getModelByName(monitor);
    }
    if (!url) return;
    await monitor.setWebWidget(new URL(url), 500, 280);
    this._data.changeCode(`model.setWebWidget(new URL('${url}'), 500, 280)`);
  }
  async refresh(monitorEqui: { title: string; url: string }) {
    try {
      await this.removeWidget(monitorEqui.title);
    } catch (e) {
      console.log('当前模型无可清除的 web 组件');
    }
    await this.setWidget(monitorEqui.title, monitorEqui.url);
  }

  async selectMonitor(name: string) {
    await (await this.getModelByName(name)).focus(1000, -Math.PI / 6);
    this._data.changeCode(`model.focus(1000, -Math.PI / 6)`);
  }

  async getModelByName(name: string) {
    return (await this._diva.client.getEntitiesByName<Model>(name))[0];
  }

  stopPropagation($event) {
    $event.stopPropagation();
  }

  async ngOnInit() {
    this._diva.client.applyScene('监控设备').then(() => {
      this._data.changeCode(`client.applyScene('监控设备')`);
    });
    const outer = this;
    for (let i = 0; i < 4; i++) {
      const model = await this.getModelByName(monitors[i].title);
      const handle = function () {
        const url = monitors.find((m) => m.title === this.name).url;
        outer.setWidget(this as Model, url);
      };
      model.setRenderingStyleMode(RenderingStyleMode.Default);
      model.addEventListener('click', handle);
      this.monitorHandlers = handle;
    }
  }

  ngOnDestroy(): void {
    monitors.forEach(async (m) => {
      const model = await this.getModelByName(m.title);
      model.removeEventListener('click', this.monitorHandlers);
    });
  }
}
