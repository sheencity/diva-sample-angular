import { POIIcon } from '@sheencity/diva-sdk';
import { v4 } from 'uuid';
export enum OverlayType {
  POI = 'poi',
  Marker = 'Marker',
  Emissive = 'emissiveOverlay',
}

export enum POIType {
  type1 = 'POI文字标签',
  type2 = 'POI圆形标签',
  type3 = 'POI水滴',
}

export enum EmissionType {
  type1 = '悬浮标记01',
  type2 = '圆形区域轮廓02',
  type3 = '雷达标记',
  type4 = '地面标记01',
  type5 = '圆形区域轮廓01',
  type6 = '事故标记',
  type7 = '悬浮标记02',
  type8 = '圆形区域轮廓03',
}

export class Overlay {
  public readonly id: string;
  public coordinateX: number;
  public coordinateY: number;
  public coordinateZ: number;
  public content: string;
  public color: string;
  public rotationX: number;
  public rotationY: number;
  public rotationZ: number;
  public scale: number;
  public opacity: number;
  constructor() {
    this.id = v4();
  }
}

export class POIOverlay extends Overlay {
  public readonly type = OverlayType.POI;
  public icon: POIIcon;
  public iconType: POIType;
}

export class MarkerOverlay extends Overlay {
  public readonly type = OverlayType.Marker;
  public title: string;
  public align: 'left' | 'right' | 'center';
  public borderWidth: number;
  public borderColor: string;
}

export class EmissiveOverlay extends Overlay {
  public readonly type = OverlayType.Emissive;
  public emission: number;
  public speed: number;
  public icon: EmissionType;
}
