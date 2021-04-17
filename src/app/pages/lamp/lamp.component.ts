import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lamp',
  templateUrl: './lamp.component.html',
  styleUrls: ['./lamp.component.scss'],
})
export class LampComponent implements OnInit {
  // 楼道灯设置
  private _corridor = false;
  public set corridor(v: boolean) {
    console.log('corridor', v);
    // 此处设置楼道灯开关
    this._corridor = v;
  }
  public get corridor() {
    return this._corridor;
  }

  // 应急灯设置
  private _emergency = false;
  public set emergency(v: boolean) {
    console.log('emergency', v);
    // 此处设置应急灯开关
    this._emergency = v;
  }
  public get emergency() {
    return this._emergency;
  }

  // 路灯设置
  private _road = false;
  public set road(v: boolean) {
    console.log('road', v);
    // 此处设置路灯开关
    this._road = v;
  }
  public get road() {
    return this._road;
  }

  constructor() {}

  ngOnInit(): void {}
}
