import { Component, OnDestroy, OnInit } from '@angular/core';
import { VideoConfigDto } from 'src/app/common/dtos/video.dto';
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
];

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

  async toggleVideo(video: VideoConfigDto) {
    this.selectedVideo = video.title;
    await this._diva.client.request('StopCameraTrack');
    await this._diva.client.request('PlayCameraTrackByIndex', {
      index: video.index,
    });
    this._data.changeCode(`client.PlayCameraTrack(${video.title})`);
  }

  iconBind(video) {
    return 'assets/icon/video/play.png';
  }

  ngOnInit(): void {}

  // 销毁钩子
  ngOnDestroy(): void {
    if (this.isPlaying) {
      this._diva.client.request('StopCameraTrack');
      this._data.changeCode(`client.StopCameraTrack()`);
    }
  }
}
