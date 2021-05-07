import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherName } from '@sheencity/diva-sdk';
import { DataService } from 'src/app/common/services/data.service';
import { DivaService } from 'src/app/common/services/diva.service';

const seasons = [
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
    value: '2021-11-01',
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
] as { title: string; value: string; name: string }[];
// 设置时分
const getTime = (hour: number, min: number) => {
  const now = new Date();
  now.setHours(hour, min, 0, 0);
  return now;
};

const noons = [
  {
    title: '早晨',
    value: 8,
    name: 'morning',
  },
  {
    title: '中午',
    value: 12,
    name: 'noon',
  },
  {
    title: '傍晚',
    value: 17,
    name: 'afternoon',
  },
] as { title: string; value: number; name: string }[];

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
})
export class DateComponent implements OnInit, OnDestroy {
  // 默认设置的季节
  seasons = seasons;
  // 默认设置的午时
  noons = noons;

  // 自定义日期
  public date: string;
  // 自定义时间
  public time: string;

  /**
   * 设置自定义日期
   * @param $event DateInputEvent
   */
  onDateChange($event: any) {
    const date = new Date($event.target.value);
    this._diva.client.setDate(date);
    this._data.changeCode(`client.setDate(new Date('${date}'))`);
  }

  /**
   * 设置自定义时间
   * @param $event DateInputEvent
   */
  onTimeChange($event: any) {
    const time = new Date();
    time.setHours(
      ...($event.target.value.split(':').map((val) => parseInt(val, 10)) as [
        hour: number,
        second: number
      ])
    );
    this._diva.client.setTime(time);
    this._data.changeCode(`client.setTime(new Date('${time}'))`);
  }

  constructor(private _diva: DivaService, private _data: DataService) {}

  /**
   * 切换季节
   * @param season
   */
  async switchSeason(season: { title: string; value: string; name: string }) {
    console.log({ season });
    await this._diva.client.setDate(new Date(season.value));
    if (season.name === 'winterSnow') {
      await this._diva.client.setWeather(WeatherName.Snow);
    } else {
      await this._diva.client.setWeather(WeatherName.Default);
    }
    if (season.name === 'winterSnow') {
      this._data.changeCode(
        `client.setDate(new Date('${season.value}'));`,
        `client.setWeather('snow')`
      );
    } else if (season.name === 'autumn') {
      // 秋季需要设置 11-01， 代码显示 09-23
      this._data.changeCode(`client.setDate(new Date('2021-09-23'))`);
    } else {
      this._data.changeCode(`client.setDate(new Date('${season.value}'))`);
    }
  }

  /**
   * 切换午时
   * @param noon
   */
  switchNoon(noon: { title: string; value: number; name: string }) {
    console.log({ noon });
    this._diva.client.setTime(getTime(noon.value, 0));
    this._data.changeCode(
      'const now = new Date();',
      `const time = (now.setHours(${noon.value}), now);`,
      'client.setTime(time);'
    );
  }

  /**
   * 设置季节午时 icon
   * @param name (string) 季节午时标题
   * @returns (string) 对应的 icon 链接
   */
  iconBind(name: string) {
    return name === 'winterSnow'
      ? 'assets/icon/date/winter.png'
      : `assets/icon/date/${name}.png`;
  }

  /**
   * 获取当前日期或时间
   * @param type (string) 日期/时间
   * @returns (Date)
   */
  getDate(type: string) {
    const date = new Date();
    if (type === 'date') {
      return `${date.getFullYear()}-${this._format(
        date.getMonth() + 1
      )}-${this._format(date.getDate())}`;
    } else if (type === 'time') {
      return `${this._format(date.getHours())}:${this._format(
        date.getMinutes()
      )}`;
    }
  }

  // 规整，方便对时间 input 绑定值
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
    this._diva.client.setWeather(WeatherName.Default);
  }
}
