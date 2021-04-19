import { Expose } from 'class-transformer';
import { v4 } from 'uuid';
export enum Overlay {
  POI = 'poi',
  Label = 'label',
}

export enum POIIcon {
  Camera = 'canmera',
}
export class OverlayDto {
  @Expose() public readonly id: string;
  @Expose() public corrdinateX: number;
  @Expose() public corrdinateY: number;
  @Expose() public corrdinateZ: number;
  @Expose() public content: string;
  @Expose() public color: string;
  @Expose() public scale: number;
  @Expose() public opacity: number;
  constructor() {
    this.id = v4();
  }
}

export class POIDto extends OverlayDto {
  @Expose() public readonly type = Overlay.POI;
  @Expose() public icon: POIIcon;
}

export class LabelDto extends OverlayDto {
  @Expose() public readonly type = Overlay.Label;
  @Expose() public title: string;
  @Expose() public border: number;
  @Expose() public borderColor: string;
}
