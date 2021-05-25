import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true,
    },
  ],
})
export class InputNumberComponent implements ControlValueAccessor, OnInit {
  private _inputNumber: number;
  public set inputNumber(val: number) {
    this._inputNumber = val;
    this.change(this._inputNumber);
  }
  public get inputNumber() {
    return this._inputNumber;
  }
  @Input() max: number = null;
  @Input() min: number = null;
  private inputDOM: HTMLInputElement;

  constructor(private _elementRef: ElementRef<HTMLElement>) {}

  inputHandle() {
    if (this.min !== null && this.inputNumber < this.min) {
      this.inputNumber = this.min;
      this.inputDOM.value = this.min + '';
    } else if (this.max !== null && this.inputNumber > this.max) {
      this.inputNumber = this.max;
      this.inputDOM.value = this.max + '';
    }
    // if (this.inputDOM.value !== this.inputNumber.toString()) {
    //   this.inputDOM.value = this.inputNumber.toString();
    // }
  }
  onKeyDown($event) {
    $event.stopPropagation();
  }

  ngOnInit() {
    this.inputDOM = this._elementRef.nativeElement
      .getElementsByTagName('input')
      .item(0);
  }
  public change = (value: number) => {};
  public writeValue(v: number) {
    this.inputNumber = v;
  }
  public registerOnChange(fn: any) {
    this.change = fn;
  }
  public registerOnTouched(fn: any) {}
}
