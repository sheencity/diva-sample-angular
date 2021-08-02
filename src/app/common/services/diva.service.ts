import { Injectable } from '@angular/core';
import { CefAdapter, Diva, DivaClient } from '@sheencity/diva-sdk';

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
  async init(container: HTMLElement) {
    console.log({ container });
    const uri = 'http://127.0.0.1:3000';
    const apiKey = '<replace_your_api_key_here>';
    console.log(uri, apiKey, container);
    const adapter = new CefAdapter(container);
    const diva = new Diva({ apiKey, adapter });
    console.log('diva is', diva);
    this.client = await diva.init();
    console.log('client is', this.client);
  }
}
