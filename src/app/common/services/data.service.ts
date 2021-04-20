import { Injectable } from '@angular/core';
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
  public code = 'client.applyScene("场景切换")';
}
