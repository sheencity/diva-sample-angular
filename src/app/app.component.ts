import { Component, ElementRef, ViewChild } from '@angular/core';
import { DivaService } from './common/services/diva.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('backendContainer', { read: ElementRef }) backendContainer?: ElementRef;
  constructor(private _divaSer: DivaService) {}
  public ngAfterViewInit() {
    const container = document.getElementById('container') as HTMLElement;
    if (this.backendContainer) {
      this._divaSer.init(container)
    }
  }
}
