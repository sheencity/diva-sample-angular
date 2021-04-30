import { Injectable } from '@angular/core';
import { Diva, DivaClient } from '@sheencity/diva-sdk';

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
    const uri = 'http://192.168.50.18:3000';
    const apiKey = '<replace_your_api_key_here>';
    console.log(uri, apiKey, container);
    const diva = new Diva({ container, apiKey, uri });
    console.log('diva is', diva);
    this.client = await diva.init();
    console.log('client is', this.client);
  }
}
