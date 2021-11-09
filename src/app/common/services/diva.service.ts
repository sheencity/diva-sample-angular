import { Injectable } from '@angular/core';
import { Diva, DivaClient } from '@sheencity/diva-sdk';
import { CefAdapter, WebRtcAdapter } from '@sheencity/diva-sdk-adapter';

@Injectable({
  providedIn: 'root',
})
export class DivaService {
  // divaClient
  client?: DivaClient;

  constructor() {}

  /**
   * 初始话 webRtc 链接
   * @param container (HTMLElement) 视频加载的 dom 元素
   */
  async init(container: HTMLDivElement) {
    console.log({ container });
    const apiKey = '<replace_your_api_key_here>';

    // 使用云渲染模式
    const uri = new URL('ws://127.0.0.1:3000');
    const adapter = new WebRtcAdapter(container, uri);

    // 使用内嵌模式
    // const adapter = new CefAdapter(container);

    const diva = new Diva({ apiKey, adapter });
    console.log('diva is', diva);
    this.client = await diva.init();
    console.log('client is', this.client);
  }
}
