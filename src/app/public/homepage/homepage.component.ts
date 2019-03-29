import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  anio: number = new Date().getFullYear();
  
  

  constructor(private httpClient:HttpClient) { }
  

  ngOnInit() {
    
  }
  pathway1:any;
  pathway2:any;
  nombrepathway1:string;
  nombrepathway2:string;
  public onArchivoSeleccionado($event: { target: { files: any[]; }; }) {
    
    for (let i = 0; i < $event.target.files.length; i++) {
      this.pathway1 = $event.target.files[i];
      this.nombrepathway1 = this.pathway1.name;
      console.log(this.pathway1.name);
    }
    //var FileSaver = require('file-saver');
    //FileSaver.saveAs(pathway, "pathway.xml");
  }
  public onArchivoSeleccionado2($event: { target: { files: any[]; }; }) {
    
    for (let i = 0; i < $event.target.files.length; i++) {
      this.pathway2 = $event.target.files[i];
      this.nombrepathway2 = this.pathway2.name;
      console.log(this.pathway2.name);
    }
    //var FileSaver = require('file-saver');
    //FileSaver.saveAs(pathway, "pathway.xml");

    
  }

  getxml(){
    this.httpClient.get('')
    .subscribe(
      (data:any[]) => {
        console.log(data);
      }
    )
  }

  postcargarxml(){
    this.httpClient.post('',
    {
      datoss:"datos",
      datos2:"datos2"
    })
    .subscribe(
      (data:any) => {
        console.log(data);
      }
    )
  }

}
