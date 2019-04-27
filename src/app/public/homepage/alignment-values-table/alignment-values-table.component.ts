import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alignment-values-table',
  templateUrl: './alignment-values-table.component.html',
  styleUrls: ['./alignment-values-table.component.css']
})
export class AlignmentValuesTableComponent implements OnInit {

  @Output() getMatch: EventEmitter<number> = new EventEmitter<number>()
  matchvalue: any = (<HTMLInputElement>document.getElementById("matchValue"));

  constructor() { }

  ngOnInit() {

  }

}
