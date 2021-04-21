import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SwitcherComponent),
    multi: true,
}],
})
export class SwitcherComponent implements ControlValueAccessor {
  @Input() public label: string;
  @Input() public background: string = 'rgba(255, 255, 255, 0.1)'   ;
  @Input() public disabled = false; 
  @Input() public ballColor;
  @Output() public switch = new EventEmitter<boolean>()
  private _isOn: boolean;
  public get isOn(): boolean {
    return this._isOn;
  }
  public set isOn(value: boolean) {
    this._isOn = value;
    this.switch.emit(value);
    this.change(this._isOn);
  }
  public change = (value: boolean) => {};
  constructor() { }
  public writeValue(v: boolean) {
    this.isOn = v;
  }
  public registerOnChange(fn: any) {
    this.change = fn;
  }
  public registerOnTouched(fn: any) {}
  public onClick($event: Event) {
    $event.stopPropagation();
  }
}
