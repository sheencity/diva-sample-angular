import { Injectable } from '@angular/core';
import type { DivaClient } from '@sheencity/diva-sdk';
import { Diva } from '@sheencity/diva-sdk';

@Injectable({
  providedIn: 'root',
})
export class DivaService {
  #client?: DivaClient;

  public get client() {
    if (!this.#client) new Error('diva client is not initialized');
    return this.#client;
  }

  /**
   * 初始话 webRtc 链接
   * @param element (HTMLElement) 视频加载的 dom 元素
   */
  public async init(element: HTMLDivElement) {
    console.log({ element });
    let diva: Diva;
    if (this.isEmbeddedMode()) {
      // 使用内嵌模式
      diva = new Diva({
        mode: 'embedded',
        apiKey: 'xxx',
        container: element,
      });
    } else {
      // 使用云渲染模式
      diva = new Diva({
        mode: 'cloud',
        apiKey: 'xxx',
        container: element,
        url: new URL('ws://127.0.0.1:3000'),
        logType: 'resolved',
      });
    }
    console.log('diva is', diva);
    this.#client = await diva.init();
    console.log('client is', this.client);
  }

  /**
   * 判断是否启用内嵌模式
   * @returns 内嵌模式下返回 true
   */
  public isEmbeddedMode(): boolean {
    if (window.navigator.userAgent.includes('Mars')) {
      return true;
    } else {
      return false;
    }
  }
}
