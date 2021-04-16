import { Component, Input, OnInit } from '@angular/core';
import { SceneConfigDto } from '../../dtos/scene.dto';

@Component({
  selector: 'app-event-block',
  templateUrl: './event-block.component.html',
  styleUrls: ['./event-block.component.scss']
})
export class EventBlockComponent implements OnInit {

  @Input() config: SceneConfigDto = {};
  constructor() { }

  ngOnInit(): void {
  }

}
