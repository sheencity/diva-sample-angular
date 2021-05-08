import { Component, OnInit } from '@angular/core';
import { WeatherName } from '@sheencity/diva-sdk';
import { DataService } from 'src/app/common/services/data.service';
import { DivaService } from 'src/app/common/services/diva.service';

const weathers = [
  {
    title: '默认',
    typeName: 'default',
  },
  {
    title: '晴天',
    typeName: WeatherName.Sunny,
  },
  {
    title: '多云',
    typeName: WeatherName.Overcast,
  },
  {
    title: '小雨',
    typeName: WeatherName.Rain,
  },
  {
    title: '暴雨',
    typeName: WeatherName.Storm,
  },
  {
    title: '雾霾',
    typeName: WeatherName.Smog,
  },
  {
    title: '雪天',
    typeName: WeatherName.Snow,
  },
  {
    title: '摄影棚',
    typeName: WeatherName.Studio,
  },
] as { title: string; typeName: WeatherName }[];

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  public weathers = weathers;

  constructor(private _diva: DivaService, private _data: DataService) {}

  /**
   * 切换天气
   * @param weather 天气配置
   * @returns
   */
  switchWeather(weather: { title: string; typeName: WeatherName }) {
    console.log({ weather });
    if (!weather.typeName) return;
    this._diva.client?.setWeather(weather.typeName).then(() => {
      this._data.changeCode(`client.setWether('${weather.typeName}')`);
    });
  }

  ngOnInit(): void {
    this._diva.client?.applyScene('天气控制').then(() => {
      this._data.changeCode(`client.applyScene('天气控制')`);
    });
  }
}
