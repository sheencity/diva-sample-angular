import { Component, OnInit } from '@angular/core';

const weathers = [
  {
    title: '默认',
  },
  {
    title: '晴天',
  },
  {
    title: '多云',
  },
  {
    title: '小雨',
  },
  {
    title: '暴雨',
  },
  {
    title: '雾霾',
  },
  {
    title: '雪天',
  },
  {
    title: '繁星',
  },
  {
    title: '满月',
  },
  {
    title: '摄影棚',
  },
];

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  public weathers = weathers;

  constructor() { }

  ngOnInit(): void {
  }

}
