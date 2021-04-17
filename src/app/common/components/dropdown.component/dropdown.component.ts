import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { DropdownData } from '../../dtos/dropdown-data.interface';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
@Component({
  selector: 'app-dropdown',
  templateUrl: 'dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropDownComponent),
      multi: true,
   }],
})
export class DropDownComponent implements ControlValueAccessor {
  /** 隐藏 options */
  public hideOptions = true;
  /** 当前选中的项目 */
  private _selectedItem: DropdownData;
  public get selectedItem(): DropdownData {
    return this._selectedItem;
  }
  public set selectedItem(value: DropdownData) {
    this._selectedItem = value;
    this.change(this._selectedItem);
  }
  /** container 高度*/
  public height = 'auto';
  /** 待选列表 */
  public items: DropdownData[] = [];
  public change = (value: DropdownData) => {};
  @Input() set options(value: DropdownData[]) {
    this.items = value;
    // this.selectedItem = value[0];
    this.height = value.length * 30 + 'px';
  }

  @Output() select = new EventEmitter();

  @Input() public disabled = false;
  constructor() { }

  /** 选中某项，发出事件 */
  public menuClick(item: DropdownData) {
    this.selectedItem = item;
    console.log('data is', item);
    this.select.next(item)
    this.hideOptions = true;
  }

  public onBlur(ev) {
    ev.stopPropagation();
    if (!this.hideOptions) {
      setTimeout(() => {
        this.hideOptions = true;
      }, 200);
    }
  }
  public onClick(ev) {
    if (this.disabled) {
      return;
    }
    this.hideOptions = !this.hideOptions;
  }

  public writeValue(data: DropdownData): void {
    this.selectedItem = data;
  }

  public registerOnChange(fn: any): void {
    this.change = fn;
  }

  public registerOnTouched(fn: any): void {  }

  public setDisabledState?(isDisabled: boolean): void {
  }

}
