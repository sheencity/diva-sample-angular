import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherName } from '@sheencity/diva-sdk';
import { plainToClass } from 'class-transformer';
import { NoonConfigDto, SeasonConfigDto } from 'src/app/common/dtos/data.dto';
import { DataService } from 'src/app/common/services/data.service';
import { DivaService } from 'src/app/common/services/diva.service';

const seasons = plainToClass(SeasonConfigDto, [
  {
    title: '春',
    value: '2021-03-21',
    name: 'spring',
  },
  {
    title: '夏',
    value: '2021-06-22',
    name: 'summer',
  },
  {
    title: '秋',
    value: '2021-09-23',
    name: 'autumn',
  },
  {
    title: '冬',
    value: '2021-12-21',
    name: 'winter',
  },
  {
    title: '冬 (雪)',
    value: '2021-12-21',
    name: 'winterSnow',
  },
]);

const noons = plainToClass(NoonConfigDto, [
  {
    title: '早晨',
    value: '1995-12-17T08:00:00',
    name: 'morning',
  },
  {
    title: '中午',
    value: '1995-12-17T12:00:00',
    name: 'noon',
  },
  {
    title: '傍晚',
    value: '1995-12-17T17:00:00',
    name: 'afternoon',
  },
]);

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
})
export class DateComponent implements OnInit, OnDestroy {
  seasons = seasons;
  noons = noons;

  public date: string;

  onDateChange($event: any) {
    const date = new Date($event.target.value);
    this._diva.client.setDate(date);
  }

  public time: string;

  onTimeChange($event: any) {
    const time = new Date();
    time.setHours(
      ...($event.target.value.split(':').map((val) => parseInt(val, 10)) as [
        hour: number,
        second: number
      ])
    );
    this._diva.client.setTime(time);
  }

  constructor(private _diva: DivaService, private _data: DataService) {}

  async switchSeason(season: SeasonConfigDto) {
    console.log({ season });
    await this._diva.client.setDate(new Date(season.value));
    if (season.name === 'winterSnow') {
      await this._diva.client.setWether(WeatherName.Snow);
    } else {
      await this._diva.client.setWether(WeatherName.Default);
    }
    this._data.changeCode(`client.setDate(new Date(${season.value}))`);
  }

  switchNoon(noon: SeasonConfigDto) {
    console.log({ noon });
    this._diva.client.setTime(new Date(noon.value));
    this._data.changeCode(`client.setTime(new Date(${noon.value}))`);
  }
  iconBind(name: string) {
    return name === 'winterSnow'
      ? 'assets/icon/date/winter.png'
      : `assets/icon/date/${name}.png`;
  }

  getDate(type: string) {
    const date = new Date();
    if (type === 'date') {
      return `${date.getFullYear()}-${this._format(date.getMonth() + 1)}-${this._format(date.getDate())}`;
    } else if (type === 'time') {
      return `${this._format(date.getHours())}:${this._format(date.getMinutes())}`;
    }
  }

  private _format(v: number) {
    return v < 10 ? `0${v}` : `${v}`;
  }

  ngOnInit(): void {
    this.date = this.getDate('date');
    this.time = this.getDate('time');
    this._diva.client.setDate(new Date());
    this._diva.client.setTime(new Date());
    this._diva.client?.applyScene('日期时间');
    if (this._diva.client?.applyScene) {
      this._data.changeCode(`client.applyScene('日期时间')`);
    }
  }
  // 销毁钩子
  ngOnDestroy(): void {
    this._diva.client.setWether(WeatherName.Default);
  }
}
