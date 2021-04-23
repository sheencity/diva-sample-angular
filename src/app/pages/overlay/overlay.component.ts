import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Vector3 } from '@sheencity/diva-sdk';
import { DropdownData } from 'src/app/common/dtos/dropdown-data.interface';
import {
  LabelDto,
  Overlay,
  POIDto,
  POIIcon,
} from 'src/app/common/dtos/overlay.dto';
import { DataService } from 'src/app/common/services/data.service';
import { DivaService } from 'src/app/common/services/diva.service';
import { LocalStorageService } from 'src/app/common/services/localStorage.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent implements OnInit {
  // 覆盖物列表
  public overlays: (POIDto | LabelDto)[] = [];
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
  public color = '#000000';
  // 缩放
  public scale = 1.0;
  // 不透明度
  public opacity = 1.0;
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
  iconOptions = [
    { value: POIIcon.Camera, placeholder: '摄像头' },
    { value: POIIcon.Location, placeholder: '定位' },
    { value: POIIcon.TrafficLight, placeholder: '红路灯' },
    { value: POIIcon.TrashCan, placeholder: '垃圾桶' },
    { value: POIIcon.StreetLamp, placeholder: '路灯' },
    { value: POIIcon.BusStation, placeholder: '公交站' },
    { value: POIIcon.Exit, placeholder: '出口' },
    { value: POIIcon.Restaurant, placeholder: '餐饮' },
    { value: POIIcon.Parking, placeholder: '停车场' },
    { value: POIIcon.Dock, placeholder: '码头' },
    { value: POIIcon.Subway, placeholder: '地铁' },
    { value: POIIcon.Supermarket, placeholder: '超市' },
    { value: POIIcon.Mall, placeholder: '商场' },
    { value: POIIcon.Toilet, placeholder: '卫生间' },
  ];
  constructor(
    private _cdr: ChangeDetectorRef,
    private _elementRef: ElementRef<any>,
    private _store: LocalStorageService,
    private _diva: DivaService,
    private _rd2: Renderer2,
    private _data: DataService
  ) {}

  async create() {
    if (this.selectedType.value === Overlay.POI) {
      const POI = new POIDto();
      POI.icon = this.selectedIcon.value as POIIcon;
      (POI.corrdinateX = this.corrdinateX),
        (POI.corrdinateY = this.corrdinateY),
        (POI.corrdinateZ = this.corrdinateZ),
        (POI.content = this.content),
        (POI.color = this.color),
        (POI.scale = this.scale),
        (POI.opacity = this.opacity),
        console.log('poiConfig', POI);
      const color = this.getRGB(POI.color);
      await this._diva.client.request('CreateOverlay', {
        id: POI.id,
        type: POI.type,
        coord: [POI.corrdinateX, POI.corrdinateY, POI.corrdinateZ],
        property: {
          label: POI.content,
          icon: POI.icon,
          color: {
            r: color[0],
            g: color[1],
            b: color[2],
          },
          opacity: POI.opacity,
          scale: POI.scale,
        },
        clusterEnable: true,
      });
      await this._diva.client.request('Focus', {
        id: POI.id,
        distance: 1000.0,
        pitch: 30.0,
      });
      this._store.storeOverlay(POI);
      this._data.changeCode(
        `client.CreateOverlay({\n
          id: '${POI.id}', \n
          type: '${POI.type}',\n
          coord: ['${POI.corrdinateX}', '${POI.corrdinateY}', '${POI.corrdinateZ}'],\n
          property: {\n
            label: '${POI.content}',\n
            icon: '${POI.icon}',\n
            color: {\n
              r: ${color[0]},\n
              g: ${color[1]},\n
              b: ${color[2]},\n
            },\n
            opacity: ${POI.opacity},\n
            scale: ${POI.scale},\n
          },\n
          clusterEnable: true,\n
        })`
      );
    } else {
      const Label = new LabelDto();
      (Label.corrdinateX = this.corrdinateX),
        (Label.corrdinateY = this.corrdinateY),
        (Label.corrdinateZ = this.corrdinateZ),
        (Label.title = this.title),
        (Label.content = this.content),
        (Label.color = this.color),
        (Label.scale = this.scale),
        (Label.opacity = this.opacity),
        (Label.border = this.border),
        (Label.borderColor = this.borderColor),
        console.log('labelConfig', Label);
      const color = this.getRGB(Label.color);
      const borderColor = this.getRGB(Label.borderColor);
      await this._diva.client.request('CreateOverlay', {
        id: Label.id,
        type: Label.type,
        coord: [Label.corrdinateX, Label.corrdinateY, Label.corrdinateZ],
        property: {
          title: Label.title,
          content: Label.content,
          textAlign: 'left',
          color: {
            r: color[0],
            g: color[1],
            b: color[2],
          },
          opacity: Label.opacity,
          borderColor: {
            r: borderColor[0],
            g: borderColor[1],
            b: borderColor[2],
          },
          borderSize: Label.border,
          scale: Label.scale,
        },
        clusterEnable: true,
      });
      await this._diva.client.request('Focus', {
        id: Label.id,
        distance: 1000.0,
        pitch: 30.0,
      });
      this._store.storeOverlay(Label);
      this._data.changeCode(
        `client.CreateOverlay({\n
          id: '${Label.id}',\n
          type: '${Label.type}',\n
          coord: ['${Label.corrdinateX}', '${Label.corrdinateY}', '${Label.corrdinateZ}'],\n
          property: {\n
            title: '${Label.title}',\n
            content: '${Label.content}',\n
            textAlign: 'left',\n
            color: {\n
              r: ${color[0]},\n
              g: ${color[1]},\n
              b: ${color[2]},\n
            },\n
            opacity: ${Label.opacity},\n
            borderColor: {\n
              r: ${borderColor[0]},\n
              g: ${borderColor[1]},\n
              b: ${borderColor[2]},\n
            },\n
            borderSize: ${Label.border},\n
            scale: ${Label.scale},\n
          },\n
          clusterEnable: true,\n
        })`
      );
    }
    this.overlays = this._store.getAllOverlays();
    this.reset();
    // 此处设置创建 overlay 的参数
  }

  async delete($event: Event, overlay: POIDto | LabelDto) {
    $event.stopPropagation();
    this._store.deleteOverlay(overlay);
    this.overlays = this._store.getAllOverlays();
    await this._diva.client.request('DestroyOverlay', { id: overlay.id });
    this._data.changeCode(`client.DestroyOverlay('${overlay.id}')`);
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
    this.color = '#000000';
    this.scale = 1.0;
    this.opacity = 1.0;
    this.border = 0.0;
    this.borderColor = '#ffffff';
  }

  async selectOverlay(overlay: POIDto | LabelDto) {
    this.selectedId = overlay.id;
    await this._diva.client.request('Focus', {
      id: overlay.id,
      distance: 1000.0,
      pitch: 30.0,
    });
    this._data.changeCode(`
      client.Focus({\n
        id: '${overlay.id}',\n
        distance: 1000.0,\n
        pitch: 30.0,\n
      })`);
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

  async pickup() {
    const handler = (event) => {
      const wordPosition = event.worldPosition as Vector3;
      this.corrdinateX = wordPosition.x;
      this.corrdinateY = wordPosition.y;
      this.corrdinateZ = wordPosition.z;
      this._rd2.setStyle(document.body, 'cursor', 'default');
    };
    await this._diva.client.addEventListener('click', handler, { once: true });
    this._rd2.setStyle(document.body, 'cursor', 'crosshair');
  }

  refreshInput(index: number, value: number) {
    const refreshInputDom = this._elementRef.nativeElement
      .querySelectorAll('.adjust')
      .item(index);
    refreshInputDom.value = value + '';
  }

  getRGB(rgb: string) {
    const r = rgb.slice(1, 3);
    const g = rgb.slice(3, 5);
    const b = rgb.slice(5, 7);
    const t = (ox: string) => eval(`0x${ox}`);
    return [t(r), t(g), t(b)];
  }

  onKeyDown($event) {
    $event.stopPropagation();
  }

  async ngOnInit() {
    this.overlays = this._store.getAllOverlays();
    await this._diva.client?.applyScene('覆盖物');
    const overlayIds = this.overlays.map((overlay) => overlay.id);
    await this._diva.client.request('SetVisibility', {
      ids: overlayIds,
      visible: true,
    })
    if (this._diva.client?.applyScene) {
      this._data.changeCode(`client.applyScene('覆盖物')`);
    }
  }
}
