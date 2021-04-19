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
    title: '主楼鸟瞰',
    index: 1,
  },
  {
    title: '主楼',
    index: 2,
  },
  {
    title: '显示管线',
    index: 3,
  },
  {
    title: '电梯演示',
    index: 4,
  },
  {
    title: '夜晚显示管线',
    index: 5,
  },
  {
    title: '夜晚隐藏管线',
    index: 6,
  },
  {
    title: '炸开场景',
    index: 7,
  },
  {
    title: '四季演示',
    index: 8,
  },
  {
    title: '四季演示关闭',
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
    this._diva.client?.applyScene(scene.title);
  }

  ngOnInit(): void {
    this._diva.client?.applyScene('场景切换');
  }
}
