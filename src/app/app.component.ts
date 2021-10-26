import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DivaService } from './common/services/diva.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('backendContainer', { read: ElementRef })
  backendContainer?: ElementRef<HTMLElement>;

  constructor(private _divaSer: DivaService) {}

  public async ngAfterViewInit() {
    if (!this.backendContainer) return;
    await this._divaSer.init(this.backendContainer.nativeElement);
  }
}
