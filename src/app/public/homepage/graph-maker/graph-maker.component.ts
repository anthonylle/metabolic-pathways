import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph-maker',
  templateUrl: './graph-maker.component.html',
  styleUrls: ['./graph-maker.component.css']
})
export class GraphMakerComponent implements OnInit {

  constructor() { }

  currentGraph: any[];
  currentNodes: any[];

  ngOnInit() {
    this.currentGraph = [];
    this.currentNodes = [];
  }

  addNode(){
    const elem = (<HTMLInputElement>document.getElementById("node-input"));
    const node = elem.value;
    elem.value = "";
    // TODO check for duplicated nodes in current array
    this.currentNodes.push({"name":node});//, "index": this.currentNodes.length});
  }

  deleteNode(node){
    this.currentNodes = this.currentNodes.filter(function(value, index, arr){
      return value != node;
    });
    //this.updateIndexOfNodes();
  }

  /*updateIndexOfNodes(){ // Unused now
    let i = 0;
    for(i; i< this.currentNodes.length; i++){
      this.currentNodes[i]['index'] = i;
    }
  }*/

}
