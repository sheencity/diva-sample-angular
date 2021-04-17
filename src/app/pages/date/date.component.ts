import { Component, OnInit } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { NoonConfigDto, SeasonConfigDto } from 'src/app/common/dtos/data.dto';
import { DivaService } from 'src/app/common/services/diva.service';

const seasons = plainToClass(SeasonConfigDto, [
  {
    title: '春',
    value: 'spring',
  },
  {
    title: '夏',
    value: 'summer',
  },
  {
    title: '秋',
    value: 'autumn',
  },
  {
    title: '冬',
    value: 'winter',
  },
])

const noons = plainToClass(NoonConfigDto, [
  {
    title: '早晨',
    value: 'morning',
  },
  {
    title: '中午',
    value: 'noon',
  },
  {
    title: '傍晚',
    value: 'evening',
  },
])

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {

  seasons = seasons;
  noons = noons;

  // 设置日期
  private _date: Date;
  
  set date(v: Date) {
    console.log('date is', v)
    // 此处设置自定义事件
    this._date = v
  }
  get date() {
    return this._date;
  }

  // 设置时间
  private _time: Date;
  
  set time(v: Date) {
    console.log('time is', v)
    // 此处设置自定义时间 
    this._time = v
  }
  get time() {
    return this._time;
  }

  constructor(private _diva: DivaService) { }

  switchSeason(season: SeasonConfigDto) {
    console.log({season});
    // 此处设置预设四季
  }

  switchNoon(noon: SeasonConfigDto) {
    console.log({noon});
    // 此处设置预设时间
  }
  ngOnInit(): void {
  }

}
