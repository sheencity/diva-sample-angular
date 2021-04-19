import { Component, OnDestroy, OnInit } from '@angular/core';
import { plainToClass } from 'class-transformer';
import {
  MonitorConfigDto,
  MonitorEquiConfigDto,
} from 'src/app/common/dtos/monitor.dto';

const monitors = plainToClass(MonitorConfigDto, [
  {
    title: '设备清单1',
  },
  {
    title: '设备清单2',
  },
  {
    title: '设备清单3',
  },
  {
    title: '设备清单4',
  },
]);

const monitorEquis = plainToClass(MonitorEquiConfigDto, [
  {
    title: '设备清单1',
    url: 'http://baidu.com',
  },
  {
    title: '设备清单2',
    url: 'http://bing.com',
  },
  {
    title: '设备清单3',
    url: 'http://google.com',
  },
  {
    title: '设备清单4',
    url: 'http://sheencity.com',
  },
]);

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss'],
})
export class MonitorComponent implements OnInit, OnDestroy {
  monitors = monitors;
  monitorEquis = monitorEquis;
  selectedMonitorIndex: number = null;
  constructor() {}

  selectMonitor(monitor: MonitorConfigDto, index: number) {
    this.selectedMonitorIndex = index;
    console.log('monitor is', monitor);
    // 此处设置监控设备信息
  }

  refresh(monitorEqui: MonitorEquiConfigDto) {
    console.log('monitorEqui is', monitorEqui);
    // 此处设置设备网址刷新信息
  }

  ngOnInit(): void {}

  // 销毁钩子
  ngOnDestroy(): void {}
}
