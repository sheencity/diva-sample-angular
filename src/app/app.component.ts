import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
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
  backendContainer?: ElementRef<HTMLElement>;
  private _changeResolution$ = new Subject<boolean>();
  private _subs: Subscription;

  constructor(private _divaSer: DivaService) {}

  private _updateResolution = () => {
    const height = this.backendContainer.nativeElement.clientHeight;
    const width = this.backendContainer.nativeElement.clientWidth;
    this._divaSer.client.setResolution({ width, height });
  }

  public async ngAfterViewInit() {
    if (this.backendContainer) {
      await this._divaSer.init(this.backendContainer.nativeElement);
      this._updateResolution();
      window.onresize = () => {
        this._changeResolution$.next(true);
      };
    }
    this._subs = this._changeResolution$
      .pipe(debounceTime(200))
      .subscribe(this._updateResolution);
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}
