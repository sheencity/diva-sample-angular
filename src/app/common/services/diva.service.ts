import { Injectable } from '@angular/core';
import type { DivaClient } from '@sheencity/diva-sdk';
import { Diva } from '@sheencity/diva-sdk';
import type { Adapter } from '@sheencity/diva-sdk-core';
import { CefAdapter, WebRtcAdapter } from '@sheencity/diva-sdk-core';

@Injectable({
  providedIn: 'root',
})
export class DivaService {
  #client?: DivaClient;
  adapter: Adapter;

  public get client() {
    if (!this.#client) new Error('diva client is not initialized');
    return this.#client;
  }

  /**
   * 初始话 webRtc 链接
   * @param container (HTMLElement) 视频加载的 dom 元素
   */
  public async init(container: HTMLDivElement) {
    console.log({ container });
    const apiKey = '<replace_your_api_key_here>';
    const adapter: Adapter = this.isEmbeddedMode()
      ? new CefAdapter(container) // 使用内嵌模式
      : new WebRtcAdapter(container, new URL('ws://127.0.0.1:3000')); // 使用云渲染模式
    this.adapter = adapter;
    const diva = new Diva({ apiKey, adapter });
    console.log('diva is', diva);

    this.#client = await diva.init();

    console.log('client is', this.client);
  }

  /**
   * 判断是否启用内嵌模式
   * @returns 内嵌模式下返回 true
   */
  public isEmbeddedMode(): boolean {
    return /Mars/.test(globalThis.navigator.userAgent);
  }
}
