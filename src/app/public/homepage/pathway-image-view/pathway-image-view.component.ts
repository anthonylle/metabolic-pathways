import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pathway-image-view',
  templateUrl: './pathway-image-view.component.html',
  styleUrls: ['./pathway-image-view.component.css']
})
export class PathwayImageViewComponent implements OnInit {

  @Input() imagepathway1:String;
  @Input() imagepathway2:String;
  constructor() { }

  ngOnInit() {
  }

}
