import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './common/components/header/header.component';
import { NavComponent } from './common/components/nav/nav.component';
import { ContentBlockComponent } from './common/components/content-block/content-block.component';
import { DropDownComponent } from './common/components/dropdown.component/dropdown.component';
import { SwitcherComponent } from './common/components/switcher/switcher.component';

import { GlobalComponent } from './pages/global/global.component';
import { SceneComponent } from './pages/scene/scene.component';
import { VideoComponent } from './pages/video/video.component';
import { WeatherComponent } from './pages/weather/weather.component';
import { DateComponent } from './pages/date/date.component';
import { FloorComponent } from './pages/floor/floor.component';
import { StateComponent } from './pages/state/state.component';
import { OverlayComponent } from './pages/overlay/overlay.component';
import { MonitorComponent } from './pages/monitor/monitor.component';
import { LampComponent } from './pages/lamp/lamp.component';
import { CustomizeComponent } from './pages/customize/customize.component';
import { CodeViewComponent } from './common/components/code-view/code-view.component';
import { AirConditionerComponent } from './pages/air-conditioner/air-conditioner.component';
import { InputNumberComponent } from './common/components/input-number/input-number.component';
import { ColorPickerModule } from '@iplab/ngx-color-picker';

const COMPONENTS = [
  AppComponent,
  HeaderComponent,
  NavComponent,
  CodeViewComponent,
  ContentBlockComponent,
  DropDownComponent,
  SwitcherComponent,
  InputNumberComponent,
];
const PAGES = [
  GlobalComponent,
  SceneComponent,
  VideoComponent,
  WeatherComponent,
  DateComponent,
  FloorComponent,
  StateComponent,
  OverlayComponent,
  MonitorComponent,
  LampComponent,
  CustomizeComponent,
  AirConditionerComponent,
];

@NgModule({
  declarations: [...COMPONENTS, ...PAGES],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ColorPickerModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
