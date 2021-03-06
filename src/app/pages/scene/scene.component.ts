import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/common/services/data.service';
import { DivaService } from 'src/app/common/services/diva.service';

const scenes = [
  { title: '测试场景01', index: 0 },
  { title: '测试场景02', index: 1 },
  { title: '测试场景03', index: 2 },
  { title: '测试场景04', index: 3 },
  { title: '测试场景05', index: 4 },
  { title: '测试场景06', index: 5 },
  { title: '测试场景07', index: 6 },
  { title: '测试场景08', index: 7 },
  { title: '测试场景09', index: 8 },
  { title: '测试场景10', index: 9 },
] as { title: string; index: number }[];

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
})
export class SceneComponent implements OnInit {
  public scenes = scenes;
  constructor(private _diva: DivaService, private _data: DataService) {}

  /**
   * 切换场景
   * @param scene 场景
   */
  switchScene(scene: { title: string; index: number }) {
    console.log({ scene });
    this._diva.client?.applyScene(scene.index).then(() => {
      this._data.changeCode(`client.applyScene('${scene.title}')`);
    });
  }

  ngOnInit(): void {
    this._diva.client?.applyScene('半鸟瞰').then(() => {
      this._data.changeCode(`client.applyScene('半鸟瞰')`);
    });
  }
}
