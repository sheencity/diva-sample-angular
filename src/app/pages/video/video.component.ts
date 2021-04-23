import { Component, OnDestroy, OnInit } from '@angular/core';
import { VideoConfigDto } from 'src/app/common/dtos/video.dto';
import { DataService } from 'src/app/common/services/data.service';
import { DivaService } from 'src/app/common/services/diva.service';

const videos = [
  {
    title: '测试路径01',
  },
  {
    title: '测试路径02',
  },
  {
    title: '测试路径03',
  },
  {
    title: '测试路径04',
  },
  {
    title: '测试路径05',
  },
  {
    title: '测试路径06',
  },
  {
    title: '测试路径07',
  },
  {
    title: '测试路径08',
  },
  {
    title: '测试路径09',
  },
  {
    title: '测试路径10',
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
    await this._diva.client.request('PlayCameraTrack', {
      name: video.title,
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
