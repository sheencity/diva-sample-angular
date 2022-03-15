import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { WebRtcAdapter } from '@sheencity/diva-sdk-core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { DivaService } from './common/services/diva.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('backendContainer', { read: ElementRef })
  backendContainer?: ElementRef<HTMLDivElement>;
  private _changeResolution$ = new Subject<boolean>();
  private _subs: Subscription;

  constructor(private _divaSer: DivaService) {}

  private _updateResolution = () => {
    if (this._divaSer.adapter instanceof WebRtcAdapter) {
      const height = this.backendContainer.nativeElement.clientHeight;
      const width = this.backendContainer.nativeElement.clientWidth;
      this._divaSer.client.setResolution({ width, height });
    }
  }

  public async ngAfterViewInit() {
    if (this.backendContainer) {
      await this._divaSer.init(this.backendContainer.nativeElement);
      this._updateResolution();

      // 监听显示区域的改变
      const resizeObserver = new ResizeObserver(() => {
        this._changeResolution$.next(true);
      })
      resizeObserver.observe(this.backendContainer.nativeElement);
    }
    this._subs = this._changeResolution$
      .pipe(debounceTime(200))
      .subscribe(this._updateResolution);
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}
