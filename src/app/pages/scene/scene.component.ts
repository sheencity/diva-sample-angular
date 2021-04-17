import { Component, OnInit } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { SceneConfigDto } from 'src/app/common/dtos/scene.dto';
import { DivaService } from 'src/app/common/services/diva.service';

const scenes = plainToClass(SceneConfigDto, [
  {
    title: '全局鸟瞰',
    index: 1,
  },
  {
    title: '楼梯细节',
    index: 1,
  },
  {
    title: '场景名称1',
    index: 2,
  },
  {
    title: '场景名称1',
    index: 3,
  },
  {
    title: '场景名称1',
    index: 4,
  },
  {
    title: '场景名称1',
    index: 5,
  },
  {
    title: '场景名称1',
    index: 6,
  },
  {
    title: '场景名称1',
    index: 7,
  },
  {
    title: '场景名称1',
    index: 8,
  },
  {
    title: '场景名称1',
    index: 9,
  },
]);

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
})
export class SceneComponent implements OnInit {
  public scenes = scenes;
  constructor(private _diva: DivaService) {}

  switchScene(scene: SceneConfigDto) {
    console.log({scene});
    this._diva.client?.applyScene(scene.index);
  }

  ngOnInit(): void {
    this._diva.client?.applyScene(1);
  }
}
