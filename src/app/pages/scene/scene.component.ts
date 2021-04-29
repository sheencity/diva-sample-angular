import { Component, OnDestroy, OnInit } from '@angular/core';
import { SceneConfigDto } from 'src/app/common/dtos/scene.dto';
import { DataService } from 'src/app/common/services/data.service';
import { DivaService } from 'src/app/common/services/diva.service';

const scenes = [
  {
    title: '测试场景01',
    index: 0,
  },
  {
    title: '测试场景02',
    index: 1,
  },
  {
    title: '测试场景03',
    index: 2,
  },
  {
    title: '测试场景04',
    index: 3,
  },
  {
    title: '测试场景05',
    index: 4,
  },
  {
    title: '测试场景06',
    index: 5,
  },
  {
    title: '测试场景07',
    index: 6,
  },
  {
    title: '测试场景08',
    index: 7,
  },
  {
    title: '测试场景09',
    index: 8,
  },
  {
    title: '测试场景10',
    index: 9,
  },
];

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
})
export class SceneComponent implements OnInit, OnDestroy {
  public scenes = scenes;
  constructor(private _diva: DivaService, private _data: DataService) {}

  /**
   * 切换场景
   * @param scene 场景
   */
  switchScene(scene: SceneConfigDto) {
    console.log({ scene });
    this._diva.client?.applyScene(scene.index);
    if (this._diva.client?.applyScene) {
      this._data.changeCode(`client.applyScene('${scene.title}')`);
    }
  }

  ngOnInit(): void {
    this._diva.client?.applyScene('半鸟瞰');
    if (this._diva.client?.applyScene) {
      this._data.changeCode(`client.applyScene('半鸟瞰')`);
    }
    // this._diva.client?.applyScene('场景切换');
    // if (this._diva.client?.applyScene) {
    //   this._data.changeCode(`client.applyScene('场景切换')`);
    // }
  }

  // 销毁钩子
  ngOnDestroy(): void {}
}
