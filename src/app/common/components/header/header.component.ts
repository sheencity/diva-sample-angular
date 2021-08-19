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

  private _joyStick = false;
  public set joyStick(v: boolean) {
    this._joyStick = v;
  }
  public get joyStick() {
    return this._joyStick;
  }

  private _fullScreen = false;
  public set fullScreen(v: boolean) {
    this._fullScreen = v;
  }
  public get fullScreen() {
    return this._fullScreen;
  }

  constructor() { }

  public toggleJoystick(event: boolean): void {
    this.joyStick = event;
    const joystickEle = document.getElementById('joyStick');
    if (joystickEle) {
      this.joyStick ? joystickEle.style.display = 'block' : joystickEle.style.display = 'none';
    }
  }

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
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  ngOnInit(): void {
  }

}
