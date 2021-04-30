import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/common/services/data.service';
import { DivaService } from 'src/app/common/services/diva.service';

const videos = [
  {
    title: '测试路径01',
    index: 0,
  },
  {
    title: '测试路径02',
    index: 1,
  },
  {
    title: '测试路径03',
    index: 2,
  },
  {
    title: '测试路径04',
    index: 3,
  },
  {
    title: '测试路径05',
    index: 4,
  },
  {
    title: '测试路径06',
    index: 5,
  },
  {
    title: '测试路径07',
    index: 6,
  },
  {
    title: '测试路径08',
    index: 7,
  },
  {
    title: '测试路径09',
    index: 8,
  },
  {
    title: '测试路径10',
    index: 9,
  },
] as {title: string, index: number}[];

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit, OnDestroy {
  public videos = videos;

  public selectedVideo: string = null;

  public isPlaying = false;

  constructor(private _diva: DivaService, public _data: DataService) {}

  /**
   * 播放路径
   * @param video (VideoConfigDto) 路径
   */
  async toggleVideo(video: {title: string, index: number}) {
    this.selectedVideo = video.title;
    await this._diva.client.request('StopCameraTrack');
    await this._diva.client.request('PlayCameraTrackByIndex', {
      index: video.index,
    });
    this._data.changeCode(`client.playCameraTrack('${video.title}')`);
  }

  /**
   * 设置块的 icon
   * @param video 路径
   * @returns 
   */
  iconBind(video) {
    return 'assets/icon/video/play.png';
  }

  ngOnInit(): void {
    this._diva.client?.applyScene('半鸟瞰');
    if (this._diva.client?.applyScene) {
      this._data.changeCode(`client.applyScene('半鸟瞰')`);
    }
  }

  // 销毁钩子
  ngOnDestroy(): void {
    if (this.isPlaying) {
      this._diva.client.request('StopCameraTrack');
      this._data.changeCode(`client.StopCameraTrack()`);
    }
  }
}
