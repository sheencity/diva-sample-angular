import { Component, OnInit } from '@angular/core';

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
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  public videos = videos;

  constructor() { }

  ngOnInit(): void {
  }

}
