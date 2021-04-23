import { Injectable } from '@angular/core';
import { Diva, DivaClient } from '@sheencity/diva-sdk';

@Injectable({
  providedIn: 'root',
})
export class DivaService {
  client?: DivaClient;

  constructor() {}

  async init(container: HTMLElement) {
    console.log({ container });
    const uri = 'localhost:3000';
    const apiKey = 'ZWYwMTM2YmUtYzkxMi00OWQzLTlkZDEtODMxY2QzY2FkZmM4';
    console.log(uri, apiKey, container);
    const diva = new Diva({ container, apiKey, uri });
    console.log('diva is', diva);
    this.client = await diva.init();
    console.log('client is', this.client);
  }
}
