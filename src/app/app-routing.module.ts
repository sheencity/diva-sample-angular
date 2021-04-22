import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  { path: '', redirectTo: 'global', pathMatch: 'full' },
  { path: 'global', component: GlobalComponent },
  { path: 'scene', component: SceneComponent },
  { path: 'video', component: VideoComponent },
  { path: 'weather', component: WeatherComponent },
  { path: 'date', component: DateComponent },
  { path: 'floor', component: FloorComponent },
  { path: 'state', component: StateComponent },
  { path: 'overlay', component: OverlayComponent },
  { path: 'monitor', component: MonitorComponent },
  { path: 'lamp', component: LampComponent },
  { path: 'customize', component: CustomizeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
