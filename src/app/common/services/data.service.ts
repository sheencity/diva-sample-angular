import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DropdownData } from '../dtos/dropdown-data.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public selectedMode: DropdownData = { value: 'false', placeholder: '飞行' };
  public compass = false;
  public rotation = false;
  public currentLift = [1, 1, 1, 1];
  public lampState = [false, false, false, false];
  private _code = new BehaviorSubject<string>('');
  public code = this._code.asObservable();

  constructor() {
    this.changeCode('client.applyScene("场景切换")');
  }
  changeCode(code: string) {
    console.log(code);
    this._code.next(code);
  }
}
