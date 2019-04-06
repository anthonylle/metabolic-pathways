import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HomepageService } from './homepage.service';

declare var require: any;

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
  pathway1final:string = "ko00010";
  pathway2final:string = "ko00010";
  imagenpathway1:any =  "../../../assets/images/blanco.png";
  imagenpathway2:any =  "../../../assets/images/blanco.png";
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
    this.service.uploadXMLFile('//localhost:3000/api/copyKGMLToTempUploads',this.pathway1).subscribe(
      (data:any) => {
        console.log("3");
        var key;
        for (key in data.body) {
          if (data.body.hasOwnProperty(key)) {
            this.pathway1final = data.body[key];
          }
        } 
        console.log("nombre: "+ this.pathway1final);
        this.llamarapython();
        this.cargarimagen1();
      }
    )
  }

  postcargarxml2(){
    this.service.uploadXMLFile('//localhost:3000/api/copyKGMLToTempUploads',this.pathway2).subscribe(
      (data:any) => {
        var key;
        for (key in data.body) {
          if (data.body.hasOwnProperty(key)) {
            this.pathway2final = data.body[key];
          }
        } 
        console.log(this.pathway2final);
        this.cargarimagen2();
      }
    )
  }

  cargarimagen1(){
    this.imagenpathway1 =  require("../../../../images/"+this.pathway1final+".png");
  }
  
  cargarimagen2(){
    this.imagenpathway2 =  require("../../../../images/ko00010.png");
  }

  llamarapython(){
    this.service.llamarpython('//localhost:3000/api/python/',this.pathway1final+'.xml','','S2').subscribe(
      (data:any) => {
        console.log(data);
      }
    )
  }

}
