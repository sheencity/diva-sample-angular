import { Component, OnInit, Renderer2 } from '@angular/core';
import { Emissive, Marker, Model, POI, POIIcon } from '@sheencity/diva-sdk';
import { Euler, Quaternion, Vector3, deg2rad } from '@sheencity/diva-sdk-math';
import { DropdownData } from 'src/app/common/models/dropdown-data.interface';
import { DataService } from 'src/app/common/services/data.service';
import { DivaService } from 'src/app/common/services/diva.service';
import { LocalStorageService } from 'src/app/common/services/localStorage.service';
import {
  EmissionType,
  EmissiveOverlay,
  MarkerOverlay,
  OverlayType,
  POIOverlay,
  POIType,
} from 'src/app/common/models/overlay.model';
import { DivaMouseEvent } from '@sheencity/diva-sdk/lib/events/diva.events';
@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent implements OnInit {
  public overlays: (POIOverlay | MarkerOverlay | EmissiveOverlay)[] = [];
  public selectedType: DropdownData<OverlayType> = {
    value: OverlayType.POI,
    placeholder: 'POI',
  };
  public selectedIcon: DropdownData<POIIcon> = {
    value: POIIcon.Camera,
    placeholder: '摄像头',
  };
  public selectedIconType: DropdownData<POIType> = {
    value: POIType.type1,
    placeholder: 'POI文字标签',
  };
  public selectedEmissive: DropdownData<EmissionType> = {
    value: EmissionType.type1,
    placeholder: '悬浮标记01',
  };
  public selectedAlign: DropdownData<'center' | 'left' | 'right'> = {
    value: 'center',
    placeholder: '居中',
  };
  public coordinateX = 0.0;
  public coordinateY = 0.0;
  public coordinateZ = 0.0;
  public title = '';
  public content = '';
  public color = '#000000';
  public rotationX = 0;
  public rotationY = 0;
  public rotationZ = 0;
  public scale = 1.0;
  public opacity = 1.0;
  public borderWidth = 0.0;
  public borderColor = '#ffffff';
  public selectedId: string = null;
  public emission: number = 1.0;
  public speed: number = 2.0;

  typeOptions = [
    { value: OverlayType.POI, placeholder: 'POI' },
    { value: OverlayType.Marker, placeholder: 'Marker' },
    { value: OverlayType.Emissive, placeholder: 'Effect' },
  ];
  alignOptions: Array<DropdownData<'center' | 'left' | 'right'>> = [
    { value: 'center', placeholder: '居中' },
    { value: 'left', placeholder: '左对齐' },
    { value: 'right', placeholder: '右对齐' },
  ];
  iconOptions1 = [
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
    { value: POIIcon.Building, placeholder: '建筑' },
    { value: POIIcon.ChargingPile, placeholder: '充电桩' },
    { value: POIIcon.EnergyStorage, placeholder: '储能设备' },
    { value: POIIcon.SolarEnergy, placeholder: '光伏' },
  ];
  iconOptions2 = [
    ...this.iconOptions1,
    { value: POIIcon.CO, placeholder: '一氧化碳' },
    { value: POIIcon.Seat, placeholder: '座椅' },
  ];
  iconTypeOption = [
    { value: POIType.type1, placeholder: 'POI文字标签' },
    { value: POIType.type2, placeholder: 'POI圆形标签' },
    { value: POIType.type3, placeholder: 'POI水滴' },
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
   * 创建覆盖物
   */
  async create() {
    if (this.selectedType.value === OverlayType.POI) {
      const overlay = new POIOverlay();
      overlay.iconType = this.selectedIconType.value;
      overlay.icon = this.selectedIcon.value;
      overlay.coordinateX = this.coordinateX;
      overlay.coordinateY = this.coordinateY;
      overlay.coordinateZ = this.coordinateZ;
      overlay.content = this.content;
      overlay.color = this.color;
      overlay.scale = this.scale;
      overlay.opacity = this.opacity;
      const poiOverlay = new POI({
        icon: overlay.icon,
        title: overlay.content,
        backgroundColor: overlay.color,
        opacity: overlay.opacity,
        autoSize: false,
        scale: new Vector3(overlay.scale, overlay.scale, overlay.scale),
        coord: new Vector3(
          overlay.coordinateX,
          overlay.coordinateY,
          overlay.coordinateZ
        ),
        resource: {
          name: overlay.iconType,
        },
        id: overlay.id,
        name: this._uniqueName('poi'),
      });
      await poiOverlay.setClient(this._diva.client);
      poiOverlay.focus(1000, -Math.PI / 6);
      this._store.storeOverlay(overlay);
      this._data.changeCode(
        `const overlay = new POI(config_learnMoreInTutorial);`,
        `await overlay.setClient(diva.client);`
      );
    } else if (this.selectedType.value === OverlayType.Marker) {
      const overlay = new MarkerOverlay();
      overlay.coordinateX = this.coordinateX;
      overlay.coordinateY = this.coordinateY;
      overlay.coordinateZ = this.coordinateZ;
      overlay.title = this.title;
      overlay.content = this.content;
      overlay.align = this.selectedAlign.value;
      overlay.color = this.color;
      overlay.scale = this.scale;
      overlay.opacity = this.opacity;
      overlay.borderWidth = this.borderWidth;
      overlay.borderColor = this.borderColor;
      const markerOverlay = new Marker({
        title: overlay.title,
        content: overlay.content,
        align: overlay.align,
        border: {
          color: overlay.borderColor,
          width: overlay.borderWidth,
        },
        backgroundColor: overlay.color,
        opacity: overlay.opacity,
        autoSize: false,
        scale: new Vector3(overlay.scale, overlay.scale, overlay.scale),
        coord: new Vector3(
          overlay.coordinateX,
          overlay.coordinateY,
          overlay.coordinateZ
        ),
        resource: {
          name: '文字标签',
        },
        id: overlay.id,
        name: this._uniqueName('marker'),
      });
      await markerOverlay.setClient(this._diva.client);
      markerOverlay.focus(1000, -Math.PI / 6);
      this._store.storeOverlay(overlay);
      this._data.changeCode(
        `const overlay = new Marker(config_learnMoreInTutorial);`,
        `await overlay.setClient(diva.client);`
      );
    } else if (this.selectedType.value === OverlayType.Emissive) {
      const overlay = new EmissiveOverlay();
      overlay.icon = this.selectedEmissive.value;
      overlay.coordinateX = this.coordinateX;
      overlay.coordinateY = this.coordinateY;
      overlay.coordinateZ = this.coordinateZ;
      overlay.color = this.color;
      overlay.emission = this.emission;
      overlay.speed = this.speed;
      overlay.rotationX = this.rotationX;
      overlay.rotationY = this.rotationY;
      overlay.rotationZ = this.rotationZ;
      overlay.scale = this.scale;
      const emissiveOverlay = new Emissive({
        emissionColor: overlay.color,
        emissionStrength: overlay.emission,
        speed: overlay.speed,
        coord: new Vector3(
          overlay.coordinateX,
          overlay.coordinateY,
          overlay.coordinateZ
        ),
        rotation: Quaternion.FromEuler(
          new Euler(
            ...deg2rad([
              overlay.rotationX,
              overlay.rotationY,
              overlay.rotationZ,
            ])
          )
        ),
        scale: new Vector3(overlay.scale, overlay.scale, overlay.scale),
        resource: {
          name: overlay.icon,
        },
        id: overlay.id,
        name: this._uniqueName('effect'),
      });
      await emissiveOverlay.setClient(this._diva.client);
      emissiveOverlay.focus(1000, -Math.PI / 6);
      this._store.storeOverlay(overlay);
      this._data.changeCode(
        `const overlay = new Emissive(config_learnMoreInTutorial);`,
        `await overlay.setClient(diva.client);`
      );
    }
    this.overlays = this._store.getAllOverlays();
    this.reset();
  }

  private _uniqueName(prefix: string) {
    return '' + prefix + '_' + new Date().toISOString();
  }

  /**
   * 删除覆盖物
   */
  async delete(
    $event: Event,
    overlay: POIOverlay | MarkerOverlay | EmissiveOverlay
  ) {
    $event.stopPropagation();
    this._store.deleteOverlay(overlay);
    this.overlays = this._store.getAllOverlays();
    const entity = await this._diva.client.getEntityById<Model>(overlay.id);
    await entity.setClient(null);
    this._data.changeCode(`entity.setClient(null)`);
  }

  resetPoiIcon(v: DropdownData<POIType>) {
    let iconOption: Array<DropdownData<POIIcon>>;
    iconOption =
      v.value == POIType.type3 ? this.iconOptions2 : this.iconOptions1;
    if (iconOption.find((x) => x.value === this.selectedIcon.value)) return;
    this.selectedIcon = iconOption[0];
  }
  /**
   * 创建覆盖物之后重置所有配置
   */
  reset() {
    this.selectedIconType = this.iconTypeOption[0];
    this.selectedIcon = this.iconOptions1[0];
    this.selectedEmissive = this.emissiveOptions[0];
    this.selectedAlign = this.alignOptions[0];
    this.coordinateX = 0.0;
    this.coordinateY = 0.0;
    this.coordinateZ = 0.0;
    this.rotationX = 0;
    this.rotationY = 0;
    this.rotationZ = 0;
    this.title = '';
    this.content = '';
    this.color = '#000000';
    this.scale = 1.0;
    this.opacity = 1.0;
    this.borderWidth = 0.0;
    this.borderColor = '#ffffff';
    this.emission = 1.0;
    this.speed = 2.0;
  }
  /**
   * 聚焦覆盖物
   */
  async selectOverlay(overlay: POIOverlay | MarkerOverlay | EmissiveOverlay) {
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
      const wordPosition = event.detail.coord;
      this.coordinateX = wordPosition.x;
      this.coordinateY = wordPosition.y;
      this.coordinateZ = wordPosition.z;
      this._rd2.setStyle(document.body, 'cursor', 'default');
    };
    await this._diva.client.addEventListener('click', handler, { once: true });
    this._rd2.setStyle(document.body, 'cursor', 'crosshair');
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
    this._diva.client?.applyScene('覆盖物').then(() => {
      this._data.changeCode(`client.applyScene('覆盖物')`);
    });
    this.overlays.map(async (overlay) => {
      const entity = await this._diva.client.getEntityById<Model>(overlay.id);
      entity.setVisibility(true);
    });
  }
}
