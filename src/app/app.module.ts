import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './common/components/header/header.component';
import { NavComponent } from './common/components/nav/nav.component';
import { ContentBlockComponent } from './common/components/content-block/content-block.component';
import { EventBlockComponent } from './common/components/event-block/event-block.component';
import { DropDownComponent } from './common/components/dropdown.component/dropdown.component';

import { SceneComponent } from './pages/scene/scene.component';
import { VideoComponent } from './pages/video/video.component';
import { WeatherComponent } from './pages/weather/weather.component';
import { DateComponent } from './pages/date/date.component';
import { StateComponent } from './pages/state/state.component';
import { CustomizeComponent } from './pages/customize/customize.component';
import { GlobalComponent } from './pages/global/global.component';
import { FloorComponent } from './pages/floor/floor.component';
import { MonitorComponent } from './pages/monitor/monitor.component';
import { LampComponent } from './pages/lamp/lamp.component';
import { OverlayComponent } from './pages/overlay/overlay.component';

const COMPONENTS = [
  AppComponent,
  HeaderComponent,
  NavComponent,
  ContentBlockComponent,
  EventBlockComponent,
  DropDownComponent,
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
];

@NgModule({
  declarations: [...COMPONENTS, ...PAGES, FloorComponent, MonitorComponent, LampComponent, OverlayComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
