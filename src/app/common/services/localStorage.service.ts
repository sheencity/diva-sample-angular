import { Injectable } from '@angular/core';
import { LabelDto, POIDto } from '../dtos/overlay.dto';
const STORE_TOKEN = 'overlay';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  constructor() {}

  /**
   * 将覆盖物信息存储在 localStorage 中
   * @param overlay (POIDto | LabelDto) 覆盖物
   */
  storeOverlay(overlay: POIDto | LabelDto) {
    const overlays: (POIDto | LabelDto)[] = JSON.parse(localStorage.getItem(STORE_TOKEN)) || [];
    overlays.unshift(overlay);
    localStorage.setItem(STORE_TOKEN, JSON.stringify(overlays));
  }

  /**
   * 从 localStorage 中删除相应的覆盖物信息
   * @param overlay (POIDto | LabelDto) 覆盖物
   */
  deleteOverlay(overlay) {
    const overlays: (POIDto | LabelDto)[] = JSON.parse(localStorage.getItem(STORE_TOKEN)) || [];
    const index = overlays.findIndex((over) => over.id === overlay.id)
    if (index >= 0) {
        overlays.splice(index, 1)
        localStorage.setItem(STORE_TOKEN, JSON.stringify(overlays));
    }
  }

  /**
   * 获取 localStorage 中所有的覆盖物信息
   * @param k key值
   * @returns (POIDto | LabelDto)[] 覆盖物数组
   */
  getAllOverlays(k = STORE_TOKEN): (POIDto | LabelDto)[] {
      return JSON.parse(localStorage.getItem(k)) || []
  }

}