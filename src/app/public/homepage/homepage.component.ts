import { Component, OnInit } from '@angular/core';
//declare var require: any;
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  anio: number = new Date().getFullYear();
  
  

  constructor() { }

  ngOnInit() {
    
  }
  public onArchivoSeleccionado($event: { target: { files: any[]; }; }) {
    var pathway: any;
    for (let i = 0; i < $event.target.files.length; i++) {
      pathway = $event.target.files[i];
      console.log(pathway.name);
    }
    //var FileSaver = require('file-saver');
    //FileSaver.saveAs(pathway, "pathway.xml");
  }



}
