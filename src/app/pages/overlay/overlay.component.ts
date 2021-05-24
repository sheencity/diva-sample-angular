import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Model, Vector3 } from '@sheencity/diva-sdk';
import { DropdownData } from 'src/app/common/models/dropdown-data.interface';
import { DataService } from 'src/app/common/services/data.service';
import { DivaService } from 'src/app/common/services/diva.service';
import { LocalStorageService } from 'src/app/common/services/localStorage.service';
import {
  LabelOverlay,
  OverlayType,
  POIIcon,
  POIOverlay,
} from 'src/app/common/models/overlay.model';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent implements OnInit {
  // 覆盖物列表
  public overlays: (POIOverlay | LabelOverlay)[] = [];
  // 种类
  private _selectedType: DropdownData = {
    value: OverlayType.POI,
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
    { value: OverlayType.POI, placeholder: 'POI' },
    { value: OverlayType.Label, placeholder: 'Label' },
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
    private _elementRef: ElementRef<any>,
    private _store: LocalStorageService,
    private _diva: DivaService,
    private _rd2: Renderer2,
    private _data: DataService
  ) {}

  /**
   * 创建 POI 或 Label
   */
  async create() {
    if (this.selectedType.value === OverlayType.POI) {
      const POI = new POIOverlay();
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
      const entity = await this._diva.client.getEntityById<Model>(POI.id);
      entity.focus(1000, -Math.PI / 6);
      // await this._diva.client.request('Focus', {
      //   id: POI.id,
      //   distance: 1000.0,
      //   pitch: 30.0,
      // });
      this._store.storeOverlay(POI);
      this._data.changeCode(
        `const position = new Vector(${POI.corrdinateX}, ${POI.corrdinateY}, ${POI.corrdinateZ});`,
        `const overlay = new Overlay('poi', {coord: position, property: {icon: '${POI.icon}', content: '${POI.content}', ... }});`,
        `overlay.set(client);`
      );
    } else {
      const Label = new LabelOverlay();
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
      const entity = await this._diva.client.getEntityById<Model>(Label.id);
      entity.focus(1000, -Math.PI / 6);
      // await this._diva.client.request('Focus', {
      //   id: Label.id,
      //   distance: 1000.0,
      //   pitch: 30.0,
      // });
      this._store.storeOverlay(Label);
      this._data.changeCode(
        `const position = new Vector(${Label.corrdinateX}, ${Label.corrdinateY}, ${Label.corrdinateZ});`,
        `const overlay = new Overlay('label', {coord: position, property: {title: '${Label.title}', content: '${Label.content}', ... }});`,
        `overlay.set(client);`
      );
    }
    this.overlays = this._store.getAllOverlays();
    this.reset();
  }

  /**
   * 删除 POI 或 Label
   * @param $event (Event) 阻止事件冒泡
   * @param overlay (POIDto | LabelDto) 覆盖物
   */
  async delete($event: Event, overlay: POIOverlay | LabelOverlay) {
    $event.stopPropagation();
    this._store.deleteOverlay(overlay);
    this.overlays = this._store.getAllOverlays();
    await this._diva.client.request('DestroyOverlay', { id: overlay.id });
    this._data.changeCode(`client.DestroyOverlay('${overlay.id}')`);
  }

  /**
   * 创建覆盖物之后重置所有配置
   */
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

  /**
   * 聚焦覆盖物
   * @param overlay (POIOverlay | LabelOverlay) 覆盖物
   */
  async selectOverlay(overlay: POIOverlay | LabelOverlay) {
    this.selectedId = overlay.id;
    const entity = await this._diva.client.getEntityById<Model>(overlay.id);
    entity.focus(1000, -Math.PI / 6);
    this._data.changeCode(`model.focus(1000, -Math.PI / 6)`);
  }

  /**
   * 缩放值超出限制时重设为限制值
   * @returns
   */
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

  /**
   * 透明度超出限制时重设为限制值
   * @returns
   */
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

  /**
   * 边框超出限制时重设为限制值
   * @returns
   */
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

  /**
   * 拾取世界坐标
   */
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

  /**
   * 重设 input 框的值
   * @param index (number) 重设 input 框的索引值
   * @param value (number) 重设值
   */
  refreshInput(index: number, value: number) {
    const refreshInputDom = this._elementRef.nativeElement
      .querySelectorAll('.adjust')
      .item(index);
    refreshInputDom.value = value + '';
  }

  /**
   * 将 colorInput 的 rgb 字符串转换为十进制色值数组
   * @param rgb (string) 颜色的 rgb 字符串
   * @returns number[] 颜色的 rgb 值
   */
  getRGB(rgb: string) {
    const r = rgb.slice(1, 3);
    const g = rgb.slice(3, 5);
    const b = rgb.slice(5, 7);
    const t = (ox: string) => eval(`0x${ox}`);
    return [t(r), t(g), t(b)];
  }

  /**
   * 阻止事件冒泡
   * @param $event
   */
  onKeyDown($event) {
    $event.stopPropagation();
  }

  async ngOnInit() {
    this.overlays = this._store.getAllOverlays();
    await this._diva.client?.applyScene('覆盖物');
    this._data.changeCode(`client.applyScene('覆盖物')`);
    this.overlays.map(async (overlay) => {
      const entity = await this._diva.client.getEntityById<Model>(overlay.id);
      entity.visible = true;
    });
  }
}
