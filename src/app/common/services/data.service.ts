import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DropdownData } from '../models/dropdown-data.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // 人视模式
  public selectedMode: DropdownData = { value: 'false', placeholder: '飞行' };
  // 罗盘显示
  public compass = false;
  // 是否旋转
  public rotation = false;
  // 当前的楼道层数
  public currentLift = [1, 1, 1, 1];
  // 灯光的状态
  public lampState = [false, false, false, false];
  // 示例代码
  private _code = new BehaviorSubject<string>('');
  public code = this._code.asObservable();

  constructor() {
    this.changeCode('client.applyScene("场景切换")');
  }
  changeCode(...code: string[]) {
    console.log(code);
    if(!code || !code.length) return;
    this._code.next(code.reduce((pre, cur) => pre + '\n' + cur));
  }
}
