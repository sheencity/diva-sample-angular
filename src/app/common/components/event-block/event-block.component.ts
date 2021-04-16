import { Component, Input, OnInit } from '@angular/core';
import { SceneConfigDto } from '../../dtos/scene.dto';
import { VideoConfigDto } from '../../dtos/video.dto';
import { WeatherConfigDto } from '../../dtos/weather.dto';

@Component({
  selector: 'app-event-block',
  templateUrl: './event-block.component.html',
  styleUrls: ['./event-block.component.scss']
})
export class EventBlockComponent implements OnInit {

  @Input() config: SceneConfigDto | VideoConfigDto | WeatherConfigDto = {};
  constructor() { }

  ngOnInit(): void {
  }

}
