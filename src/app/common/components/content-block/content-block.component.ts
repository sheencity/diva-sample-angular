import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-block',
  templateUrl: './content-block.component.html',
  styleUrls: ['./content-block.component.scss']
})
export class ContentBlockComponent implements OnInit {
  @Input() caption: string;
  @Input() width = false;

  constructor() { }

  ngOnInit(): void {
  }

}
