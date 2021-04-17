import { Injectable } from '@angular/core';
import { Diva } from '@sheencity/diva-sdk';

type Awaited<T> = T extends Promise<infer U> ? U : never;

@Injectable({
  providedIn: 'root',
})
export class DivaService {
  client?: Awaited<ReturnType<Diva['init']>>;

  constructor() {}

  async init(container: HTMLElement) {
    console.log({ container });
    const uri = 'http://wuhan.corp.sheencity.com:3000';
    const apiKey = 'ZWYwMTM2YmUtYzkxMi00OWQzLTlkZDEtODMxY2QzY2FkZmM4';
    console.log(uri, apiKey, container);
    const diva = new Diva({ container, apiKey, uri });
    console.log('diva is', diva);
    this.client = await diva.init();
    console.log('client is', this.client);
  }
}
