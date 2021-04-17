import { Component, OnInit } from '@angular/core';
import { DivaService } from 'src/app/common/services/diva.service';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {

  private _defalutDate: Date;
  set defalutDate(v: Date) {
    console.log('date is', v);
    this._defalutDate = v
  }
  get defalutDate() {
    return this._defalutDate;
  }
  private _defalutTime: Date;
  
  set defalutTime(v: Date) {
    console.log('time is', v);
    this._defalutTime = v
  }
  get defalutTime() {
    return this._defalutTime;
  }
  private _date: Date;
  
  set date(v: Date) {
    this._date = v
  }
  get date() {
    return this._date;
  }
  private _time: Date;
  
  set time(v: Date) {
    this._time = v
  }
  get time() {
    return this._time;
  }

  constructor(private _diva: DivaService) { }

  ngOnInit(): void {
  }

}
