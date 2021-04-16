import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicComponent } from './pages/basic/basic.component';
import { CustomizeComponent } from './pages/customize/customize.component';
import { DateComponent } from './pages/date/date.component';
import { GlobalComponent } from './pages/global/global.component';
import { PoiComponent } from './pages/poi/poi.component';
import { SceneComponent } from './pages/scene/scene.component';
import { StateComponent } from './pages/state/state.component';
import { VideoComponent } from './pages/video/video.component';
import { WeatherComponent } from './pages/weather/weather.component';

const routes: Routes = [
  { path: '', redirectTo: 'scene', pathMatch: 'full' },
  { path: 'scene', component: SceneComponent },
  { path: 'video', component: VideoComponent },
  { path: 'weather', component: WeatherComponent },
  { path: 'date', component: DateComponent },
  { path: 'state', component: StateComponent },
  { path: 'poi', component: PoiComponent },
  { path: 'customize', component: CustomizeComponent },
  { path: 'basic', component: BasicComponent },
  { path: 'global', component: GlobalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
