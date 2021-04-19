import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
import { DropdownData } from 'src/app/common/dtos/dropdown-data.interface';
import { Overlay, POIIcon } from 'src/app/common/dtos/overlay.dto';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent implements OnInit {
  // 种类
  private _selectedType: DropdownData = {
    value: Overlay.POI,
    placeholder: 'POI',
  };
  public set selectedType(v: DropdownData) {
    this._selectedType = v;
  }
  public get selectedType() {
    return this._selectedType;
  }

  // 类型
  private _selectedIcon: DropdownData = {
    value: POIIcon.Camera,
    placeholder: '摄像头',
  };
  public set selectedIcon(v: DropdownData) {
    this._selectedIcon = v;
  }
  public get selectedIcon() {
    return this._selectedIcon;
  }

  /**
   * 坐标
   */
  // x 坐标
  public corrdinateX = 0.0;
  // y 坐标
  public corrdinateY = 0.0;
  // z 坐标
  public corrdinateZ = 0.0;

  // 标题
  public title = '';
  // 内容
  public content = '';
  // 颜色
  public color = '#ffffff';
  // 缩放
  public scale = 1.0;
  // 不透明度
  public opacity = 0.0;
  // 边框大小
  public border = 0.0;
  // 边框颜色
  public borderColor = '#ffffff';

  // 种类配置
  typeOptions = [
    { value: Overlay.POI, placeholder: 'POI' },
    { value: Overlay.Label, placeholder: 'Label' },
  ];
  // 类型配置
  iconOptions = [{ value: POIIcon.Camera, placeholder: '摄像头' }];
  constructor(
    private _cdr: ChangeDetectorRef,
    private _elementRef: ElementRef<any>
  ) {}

  create() {
    if (this.selectedType.value === Overlay.POI) {
      const poiConfig = {
        corrdinateX: this.corrdinateX,
        corrdinateY: this.corrdinateY,
        corrdinateZ: this.corrdinateZ,
        content: this.content,
        type: this.selectedIcon.value,
        color: this.color,
        scale: this.scale,
        opacity: this.opacity,
      };
      console.log('poiConfig', poiConfig);
    } else {
      const labelConfig = {
        corrdinateX: this.corrdinateX,
        corrdinateY: this.corrdinateY,
        corrdinateZ: this.corrdinateZ,
        title: this.title,
        content: this.content,
        color: this.color,
        scale: this.scale,
        opacity: this.opacity,
        border: this.border,
        orderColor: this.borderColor,
      };
      console.log('labelConfig', labelConfig);
    }
    this.reset();
    // 此处设置创建 overlay 的参数
  }

  reset() {
    this._selectedType = {
      value: POIIcon.Camera,
      placeholder: '摄像头',
    };
    this.corrdinateX = 0.0;
    this.corrdinateY = 0.0;
    this.corrdinateZ = 0.0;
    this.title = '';
    this.content = '';
    this.color = '#ffffff';
    this.scale = 1.0;
    this.opacity = 0.0;
    this.border = 0.0;
    this.borderColor = '#ffffff';
  }

  onInputScale() {
    if (this.scale < 0) {
      this.scale = 0;
      this.refreshInput(0, this.scale);
      return;
    } else if (this.scale > 100) {
      this.scale = 100;
      this.refreshInput(0, this.scale);
      return;
    }
  }

  onInputOpacity() {
    if (this.opacity < 0) {
      this.opacity = 0;
      this.refreshInput(1, this.opacity);
      return;
    } else if (this.opacity > 1) {
      this.opacity = 1;
      this.refreshInput(1, this.opacity);
      return;
    }
  }

  onInputBorder() {
    if (this.border < 0) {
      this.border = 0;
      this.refreshInput(3, this.border);
      return;
    } else if (this.border > 1) {
      this.border = 1;
      this.refreshInput(3, this.border);
      return;
    }
  }

  refreshInput(index: number, value: number) {
    const refreshInputDom = this._elementRef.nativeElement
    .querySelectorAll('.adjust')
    .item(index);
    refreshInputDom.value = value + '';
  }

  ngOnInit(): void {}
}
