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
  constructor() { }

  ngOnInit(): void {
  }

}
