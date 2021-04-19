import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
import { DropdownData } from 'src/app/common/dtos/dropdown-data.interface';
import { LabelDto, Overlay, POIDto, POIIcon } from 'src/app/common/dtos/overlay.dto';
import { LocalStorageService } from 'src/app/common/services/localStorage.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent implements OnInit {
  // 覆盖物列表
  public overlays: (POIDto | LabelDto)[] = []
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
  // 选中覆盖物的id
  public selectedId: string = null;

  // 种类配置
  typeOptions = [
    { value: Overlay.POI, placeholder: 'POI' },
    { value: Overlay.Label, placeholder: 'Label' },
  ];
  // 类型配置
  iconOptions = [{ value: POIIcon.Camera, placeholder: '摄像头' }];
  constructor(
    private _cdr: ChangeDetectorRef,
    private _elementRef: ElementRef<any>,
    private _store: LocalStorageService,
  ) {}

  create() {
    if (this.selectedType.value === Overlay.POI) {
      const POI = new POIDto()
      POI.icon = this.selectedIcon.value as POIIcon;
      POI.corrdinateX = this.corrdinateX,
      POI.corrdinateY = this.corrdinateY,
      POI.corrdinateZ = this.corrdinateZ,
      POI.content = this.content,
      POI.color = this.color,
      POI.scale = this.scale,
      POI.opacity = this.opacity,
      console.log('poiConfig', POI);
      this._store.storeOverlay(POI);
    } else {
      const Label = new LabelDto();
      Label.corrdinateX = this.corrdinateX,
      Label.corrdinateY = this.corrdinateY,
      Label.corrdinateZ = this.corrdinateZ,
      Label.title = this.title,
      Label.content = this.content,
      Label.color = this.color,
      Label.scale = this.scale,
      Label.opacity = this.opacity,
      Label.border = this.border,
      Label.borderColor = this.borderColor,
      console.log('labelConfig', Label);
      this._store.storeOverlay(Label);
    }
    this.overlays = this._store.getAllOverlays();
    this.reset();
    // 此处设置创建 overlay 的参数
  }

  delete(overlay: POIDto | LabelDto) {
    this._store.deleteOverlay(overlay);
    this.overlays = this._store.getAllOverlays();
  }

  reset() {
    this._selectedIcon = {
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

  selectOverlay(overlay: POIDto | LabelDto) {
    this.selectedId = overlay.id;
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

  ngOnInit(): void {
    this.overlays = this._store.getAllOverlays();
  }
}
