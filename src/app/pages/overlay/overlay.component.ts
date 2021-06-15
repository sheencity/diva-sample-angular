import { Component, OnInit, Renderer2 } from '@angular/core';
import { Emissive, Model, POI, TextLabel, Vector3 } from '@sheencity/diva-sdk';
import { DropdownData } from 'src/app/common/models/dropdown-data.interface';
import { DataService } from 'src/app/common/services/data.service';
import { DivaService } from 'src/app/common/services/diva.service';
import { LocalStorageService } from 'src/app/common/services/localStorage.service';
import {
  EmissionType,
  EmissiveOverlay,
  LabelOverlay,
  OverlayType,
  POIIcon,
  POIOverlay,
} from 'src/app/common/models/overlay.model';
import { DivaMouseEvent } from '@sheencity/diva-sdk/lib/events/diva.events';
import { Matrix } from '@sheencity/diva-sdk';
@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent implements OnInit {
  /** 覆盖物列表 */
  public overlays: (POIOverlay | LabelOverlay | EmissiveOverlay)[] = [];
  /** 种类 */
  public selectedType: DropdownData = {
    value: OverlayType.POI,
    placeholder: 'POI',
  };
  /** 类型 */
  public selectedIcon: DropdownData = {
    value: POIIcon.Camera,
    placeholder: '摄像头',
  };
  public selectedEmissive: DropdownData<EmissionType> = {
    value: EmissionType.type1,
    placeholder: '悬浮标记01',
  };
  /** x 坐标 */
  public corrdinateX = 0.0;
  /** y 坐标 */
  public corrdinateY = 0.0;
  /** z 坐标 */
  public corrdinateZ = 0.0;
  /** 标题 */
  public title = '';
  /** 内容 */
  public content = '';
  /** 颜色 */
  public color = '#000000';
  /** 缩放 */
  public scale = 1.0;
  /** 不透明度 */
  public opacity = 1.0;
  /** 边框大小 */
  public border = 0.0;
  /** 边框颜色 */
  public borderColor = '#ffffff';
  /** 选中覆盖物的id */
  public selectedId: string = null;
  public emission: number = 1.0;
  public speed: number = 2.0;

  // 种类配置
  typeOptions = [
    { value: OverlayType.POI, placeholder: 'POI' },
    { value: OverlayType.Label, placeholder: 'Label' },
    { value: OverlayType.Emissive, placeholder: 'Emissive' },
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
  emissiveOptions = [
    { value: EmissionType.type1, placeholder: '悬浮标记01' },
    { value: EmissionType.type2, placeholder: '圆形区域轮廓02' },
    { value: EmissionType.type3, placeholder: '雷达标记' },
    { value: EmissionType.type4, placeholder: '地面标记01' },
    { value: EmissionType.type5, placeholder: '圆形区域轮廓01' },
    { value: EmissionType.type6, placeholder: '事故标记' },
    { value: EmissionType.type7, placeholder: '悬浮标记02' },
    { value: EmissionType.type8, placeholder: '圆形区域轮廓03' },
  ];
  constructor(
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
      const overlay = new POIOverlay();
      overlay.icon = this.selectedIcon.value as POIIcon;
      overlay.corrdinateX = this.corrdinateX;
      overlay.corrdinateY = this.corrdinateY;
      overlay.corrdinateZ = this.corrdinateZ;
      overlay.content = this.content;
      overlay.color = this.color;
      overlay.scale = this.scale;
      overlay.opacity = this.opacity;
      const transform = Matrix.Translation(
        overlay.corrdinateX,
        overlay.corrdinateY,
        overlay.corrdinateZ
      );
      const poiOverlay = new POI({
        id: overlay.id,
        label: overlay.content,
        icon: overlay.icon,
        backgroundColor: overlay.color,
        opacity: overlay.opacity,
        transform: transform,
        scale: overlay.scale,
        name: overlay.content,
      });
      poiOverlay.attach(this._diva.client);
      await poiOverlay.create();
      poiOverlay.focus(1000, -Math.PI / 6);
      this._store.storeOverlay(overlay);
      this._data.changeCode(
        `const overlay = new POI(config_learnMoreInTutorial);`,
        `overlay.attach(client);`,
        `await overlay.create();`
      );
    } else if (this.selectedType.value === OverlayType.Label) {
      const overlay = new LabelOverlay();
      overlay.corrdinateX = this.corrdinateX;
      overlay.corrdinateY = this.corrdinateY;
      overlay.corrdinateZ = this.corrdinateZ;
      overlay.title = this.title;
      overlay.content = this.content;
      overlay.color = this.color;
      overlay.scale = this.scale;
      overlay.opacity = this.opacity;
      overlay.border = this.border;
      overlay.borderColor = this.borderColor;
      const transform = Matrix.Translation(
        overlay.corrdinateX,
        overlay.corrdinateY,
        overlay.corrdinateZ
      );
      const textOverlay = new TextLabel({
        id: overlay.id,
        title: overlay.title,
        content: overlay.content,
        backgroundColor: overlay.color,
        transform: transform,
        border: {
          color: overlay.borderColor,
          width: overlay.border,
          radius: 0,
        },
        opacity: overlay.opacity,
        scale: overlay.scale,
        name: overlay.title,
      });
      textOverlay.attach(this._diva.client);
      await textOverlay.create();
      this._store.storeOverlay(overlay);
      this._data.changeCode(
        `const overlay = new TextLabel(config_learnMoreInTutorial);`,
        `overlay.attach(client);`,
        `await overlay.create();`
      );
    } else if (this.selectedType.value === OverlayType.Emissive) {
      const overlay = new EmissiveOverlay();
      overlay.icon = this.selectedEmissive.value;
      overlay.corrdinateX = this.corrdinateX;
      overlay.corrdinateY = this.corrdinateY;
      overlay.corrdinateZ = this.corrdinateZ;
      overlay.color = this.color;
      overlay.emission = this.emission;
      overlay.speed = this.speed;
      overlay.scale = this.scale;
      // const transform = Matrix.Identity();
      // transform.scaleInPlace(overlay.scale);  // 使用 transform 属性设置 自发光覆盖物（emissive）的偏移和缩放时
      // transform.setTranslation(               // 必须将缩放方法放置在偏移方法之前
      //   overlay.corrdinateX,
      //   overlay.corrdinateY,
      //   overlay.corrdinateZ
      // );
      const emissiveOverlay = new Emissive({
        id: overlay.id,
        // transform: transform,
        resource: {
          id: '',
          name: overlay.icon,
        },
        emissionColor: overlay.color,
        emissionStrength: overlay.emission,
        speed: overlay.speed,
        name: overlay.icon,
        coord: new Vector3(
          overlay.corrdinateX,
          overlay.corrdinateY,
          overlay.corrdinateZ
        ),
        scale: new Vector3(overlay.scale, overlay.scale, overlay.scale),
      });
      emissiveOverlay.attach(this._diva.client);
      await emissiveOverlay.create();
      emissiveOverlay.focus(1000, -Math.PI / 6);
      this._store.storeOverlay(overlay);
      this._data.changeCode(
        `const overlay = new Emissive(config_learnMoreInTutorial);`,
        `overlay.attach(client);`,
        `await overlay.create();`
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
    const entity = await this._diva.client.getEntityById(overlay.id);
    await entity.destroy();
    await entity.detach();
    this._data.changeCode(`entity.destroy()`);
  }

  /**
   * 创建覆盖物之后重置所有配置
   */
  reset() {
    this.selectedIcon = {
      value: POIIcon.Camera,
      placeholder: '摄像头',
    };
    this.selectedEmissive = {
      value: EmissionType.type1,
      placeholder: '悬浮标记01',
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
    this.emission = 1.0;
    this.speed = 2.0;
  }
  /**
   * 聚焦覆盖物
   * @param overlay (POIOverlay | LabelOverlay) 覆盖物
   */
  async selectOverlay(overlay: POIOverlay | LabelOverlay | EmissiveOverlay) {
    this.selectedId = overlay.id;
    const entity = await this._diva.client.getEntityById<Model>(overlay.id);
    entity.focus(1000, -Math.PI / 6);
    this._data.changeCode(`model.focus(1000, -Math.PI / 6)`);
  }
  /**
   * 拾取世界坐标
   */
  async pickup() {
    const handler = (event: DivaMouseEvent) => {
      const wordPosition = event.worldPosition;
      this.corrdinateX = wordPosition.x;
      this.corrdinateY = wordPosition.y;
      this.corrdinateZ = wordPosition.z;
      this._rd2.setStyle(document.body, 'cursor', 'default');
    };
    await this._diva.client.addEventListener('click', handler, { once: true });
    this._rd2.setStyle(document.body, 'cursor', 'crosshair');
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
      entity.setVisibility(true);
    });
  }
}
