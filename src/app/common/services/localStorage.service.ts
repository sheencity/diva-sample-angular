import { Injectable } from '@angular/core';
import { LabelDto, POIDto } from '../dtos/overlay.dto';
const STORE_TOKEN = 'overlay';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  constructor() {}

  storeOverlay(overlay: POIDto | LabelDto) {
    const overlays: (POIDto | LabelDto)[] = JSON.parse(localStorage.getItem(STORE_TOKEN)) || [];
    overlays.unshift(overlay);
    localStorage.setItem(STORE_TOKEN, JSON.stringify(overlays));
  }

  deleteOverlay(overlay) {
    const overlays: (POIDto | LabelDto)[] = JSON.parse(localStorage.getItem(STORE_TOKEN)) || [];
    const index = overlays.findIndex((over) => over.id === overlay.id)
    if (index >= 0) {
        overlays.splice(index, 1)
        localStorage.setItem(STORE_TOKEN, JSON.stringify(overlays));
    }
  }

  getAllOverlays(k = STORE_TOKEN): (POIDto | LabelDto)[] {
      return JSON.parse(localStorage.getItem(k)) || []
  }

}