import { Component, OnInit } from '@angular/core';

const scenes = [
  {
    title: '全局鸟瞰',
  },
  {
    title: '楼梯细节',
  },
  {
    title: '场景名称1',
  },
  {
    title: '场景名称1',
  },
  {
    title: '场景名称1',
  },
  {
    title: '场景名称1',
  },
  {
    title: '场景名称1',
  },
  {
    title: '场景名称1',
  },
  {
    title: '场景名称1',
  },
  {
    title: '场景名称1',
  },
];

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
})
export class SceneComponent implements OnInit {
  public scenes = scenes;
  constructor() {}

  ngOnInit(): void {}
}
