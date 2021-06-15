import { v4 } from 'uuid';
export enum OverlayType {
  POI = 'poi',
  Label = 'label',
  Emissive = 'emissiveOverlay',
}

export enum POIIcon {
  Camera = 'camera',
  Location = 'location',
  TrafficLight = 'trafficLight',
  TrashCan = 'trashCan',
  StreetLamp = 'streetLamp',
  BusStation = 'busStation',
  Exit = 'exit',
  Restaurant = 'restaurant',
  Parking = 'parking',
  Dock = 'dock',
  Subway = 'subway',
  Supermarket = 'supermarket',
  Mall = 'mall',
  Toilet = 'toilet',
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
  public corrdinateX: number;
  public corrdinateY: number;
  public corrdinateZ: number;
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
}

export class LabelOverlay extends Overlay {
  public readonly type = OverlayType.Label;
  public title: string;
  public align: "left" | "start" | "right" | "end" | "center" | "justify";
  public border: number;
  public borderColor: string;
}

export class EmissiveOverlay extends Overlay {
  public readonly type = OverlayType.Emissive;
  public emission: number;
  public speed: number;
  public icon: EmissionType;
}
