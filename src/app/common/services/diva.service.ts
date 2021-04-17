import { Injectable } from '@angular/core';
// import { DivaClient } from '@sheencity/diva-sdk/lib/clients/diva.client';

@Injectable({
  providedIn: 'root',
})
export class DivaService {
  // client?: DivaClient;

  constructor() {}

  async init(container: HTMLElement) {
    console.log({container});
    // const uri = 'http://wuhan.corp.sheencity.com:3000';
    // const apiKey = 'ZWYwMTM2YmUtYzkxMi00OWQzLTlkZDEtODMxY2QzY2FkZmM4';
    // console.log(uri, apiKey, container);
    // const diva = new Diva({ container, apiKey, uri });
    // console.log('diva is', diva);
    // const client = await diva.init();
    // console.log('client is', client);
  }
}
