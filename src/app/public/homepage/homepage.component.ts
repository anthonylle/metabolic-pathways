import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HomepageService } from './homepage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [HomepageService]
})
export class HomepageComponent implements OnInit {

  anio: number = new Date().getFullYear();
  
  

  constructor(private service: HomepageService) { }
  

  ngOnInit() {
    
  }
  pathway1:any;
  pathway2:any;
  nombrepathway1:string;
  nombrepathway2:string;
  pathway1final:any;
  pathway2final:any;
  public onArchivoSeleccionado($event: { target: { files: any[]; }; }) {
    
    for (let i = 0; i < $event.target.files.length; i++) {
      this.pathway1 = $event.target.files[i];
      this.nombrepathway1 = this.pathway1.name;
      console.log(this.pathway1.name);
    }
    this.postcargarxml1();
    //var FileSaver = require('file-saver');
    //FileSaver.saveAs(pathway, "pathway.xml");
  }
  public onArchivoSeleccionado2($event: { target: { files: any[]; }; }) {
    
    for (let i = 0; i < $event.target.files.length; i++) {
      this.pathway2 = $event.target.files[i];
      this.nombrepathway2 = this.pathway2.name;
      console.log(this.pathway2.name);
    }
    this.postcargarxml2();
    //var FileSaver = require('file-saver');
    //FileSaver.saveAs(pathway, "pathway.xml");

    
  }
/*
  getxml(){
    this.service.get('')
    .subscribe(
      (data:any[]) => {
        console.log(data);
      }
    )
  }
*/
  postcargarxml1(){
    this.service.uploadXMLFile('//localhost:3000/api/uploadpathway',this.pathway1).subscribe(
      (data:any) => {
        console.log(data);
        this.pathway1final = data;
      }
    )
  }

  postcargarxml2(){
    this.service.uploadXMLFile('//localhost:3000/api/uploadpathway',this.pathway1).subscribe(
      (data:any) => {
        console.log(data);
        this.pathway2final = data;
      }
    )
  }

}
