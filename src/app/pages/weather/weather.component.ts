import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherName } from '@sheencity/diva-sdk';
import { plainToClass } from 'class-transformer';
import { WeatherConfigDto } from 'src/app/common/dtos/weather.dto';
import { DivaService } from 'src/app/common/services/diva.service';

const weathers = plainToClass(WeatherConfigDto, [
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
    title: '繁星',
    typeName: WeatherName.Star,
  },
  {
    title: '满月',
    typeName: WeatherName.Moon,
  },
  {
    title: '摄影棚',
    typeName: WeatherName.Studio,
  },
]);

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit, OnDestroy {
  public weathers = weathers;

  constructor(private _diva: DivaService) {}

  switchWeather(weather: WeatherConfigDto) {
    console.log({ weather });
    if (!weather.typeName) return;
    this._diva.client?.setWether(weather.typeName);
  }

  iconBind(weatherName: string) {
    return `assets/icon/weather/${weatherName}.png`;
  }

  ngOnInit(): void {}

  // 销毁钩子
  ngOnDestroy(): void {}
}
