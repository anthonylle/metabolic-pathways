import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pathway-image-view',
  templateUrl: './pathway-image-view.component.html',
  styleUrls: ['./pathway-image-view.component.css']
})
export class PathwayImageViewComponent implements OnInit {

  @Input() imagepathway1:string;
  @Input() imagepathway2:string;
  constructor() { }

  ngOnInit() {
  }

}
