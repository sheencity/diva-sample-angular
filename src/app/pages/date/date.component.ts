import { Component, OnDestroy, OnInit } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { NoonConfigDto, SeasonConfigDto } from 'src/app/common/dtos/data.dto';
import { DivaService } from 'src/app/common/services/diva.service';

const seasons = plainToClass(SeasonConfigDto, [
  {
    title: '春',
    value: '2021-03-21',
  },
  {
    title: '夏',
    value: '2021-06-22',
  },
  {
    title: '秋',
    value: '2021-09-23',
  },
  {
    title: '冬',
    value: '2021-12-21',
  },
]);

const noons = plainToClass(NoonConfigDto, [
  {
    title: '早晨',
    value: '1995-12-17T07:00:00',
  },
  {
    title: '中午',
    value: '1995-12-17T12:00:00',
  },
  {
    title: '傍晚',
    value: '1995-12-17T18:00:00',
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

  // 设置日期
  private _date: Date = new Date();

  set date(v: string) {
    console.log('date is', v);
    const date = new Date(v);
    this._diva.client.setDate(date);
    this._date = date;
  }
  get date() {
    const padding = (val: number) => (val < 10 ? `0${val}` : val.toString());
    return `${this._date.getFullYear()}-${padding(
      this._date.getMonth() + 1
    )}-${padding(this._date.getDay())}`;
  }

  // 设置时间
  private _time: Date = new Date();

  set time(v: string) {
    console.log('time is', v);
    const date = new Date();
    date.setHours(
      ...(v.split(':').map((val) => parseInt(val, 10)) as [
        hour: number,
        second: number
      ])
    );
    date.setSeconds(0, 0);
    this._diva.client.setTime(date);

    this._time = date;
  }
  get time(): string {
    return `${this._time.getHours()}:${this._time.getMinutes()}`;
  }

  constructor(private _diva: DivaService) {}

  switchSeason(season: SeasonConfigDto) {
    console.log({ season });
    this._diva.client.setDate(new Date(season.value));
  }

  switchNoon(noon: SeasonConfigDto) {
    console.log({ noon });
    this._diva.client.setTime(new Date(noon.value));
  }
  ngOnInit(): void {
    this._diva.client?.applyScene('日期时间');
  }
  // 销毁钩子
  ngOnDestroy(): void {}
}
