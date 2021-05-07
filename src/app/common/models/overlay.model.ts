import { v4 } from 'uuid'
export enum OverlayType {
  POI = 'poi',
  Label = 'label',
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

export class Overlay {
    public readonly id: string;
    public corrdinateX: number;
    public corrdinateY: number;
    public corrdinateZ: number;
    public content: string;
    public color: string;
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
    public border: number;
    public borderColor: string;
  }