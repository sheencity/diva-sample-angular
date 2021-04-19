import { Component, OnDestroy, OnInit } from '@angular/core';
import { VideoConfigDto } from 'src/app/common/dtos/video.dto';

const videos = [
  {
    title: '视频名称',
  },
  {
    title: '视频名称',
  },
  {
    title: '视频名称',
  },
  {
    title: '视频名称',
  },
  {
    title: '视频名称',
  },
  {
    title: '视频名称',
  },
  {
    title: '视频名称',
  },
  {
    title: '视频名称',
  },
  {
    title: '视频名称',
  },
  {
    title: '视频名称',
  },
];

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit, OnDestroy {
  public videos = videos;

  public selected: number = null;

  constructor() {}

  switchVideo(video: VideoConfigDto, i: number) {
    this.selected = i;
    console.log('video is', video);
  }

  ngOnInit(): void {}

  // 销毁钩子
  ngOnDestroy(): void {}
}
