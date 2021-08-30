import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private _exampleCode = false;
  public set exampleCode(v: boolean) {
    this._exampleCode = v;
  }
  public get exampleCode() {
    return this._exampleCode;
  }

  private _fullScreen = false;
  public set fullScreen(v: boolean) {
    this._fullScreen = v;
  }
  public get fullScreen() {
    return this._fullScreen;
  }

  constructor() { }

  public toggleFullScreen(event: boolean): void {
    this.fullScreen = event;
    this.fullScreen ? this.getFullScreen(document.documentElement) : this.exitFullScreen();
  }

  public getFullScreen(ele: Element): void {
    if (ele.requestFullscreen) {
      ele.requestFullscreen();
    }
  }

  public exitFullScreen(): void {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }

  ngOnInit(): void {
  }

}
