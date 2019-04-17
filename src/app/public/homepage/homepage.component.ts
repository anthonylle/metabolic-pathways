import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HomepageService } from './homepage.service';
import { Subscription } from 'rxjs';

declare var require: any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [HomepageService]
})
export class HomepageComponent implements OnInit {

  anio: number = new Date().getFullYear();
  subscription: Subscription;
  currentAlgorithmTypeSelected: any;
  constructor(private service: HomepageService) {
    this.subscription = service.getCurrentAlgorithmType().subscribe(type =>
    { this.currentAlgorithmTypeSelected = type.text; });
  }

  pathway1:File;
  pathway2:File;
  nombrepathway1:string;
  nombrepathway2:string;
  pathway1final:string; //= "ko00010";
  pathway2final:string; //= "ko00010";
  imagenpathway1:any =  "../../../assets/images/blanco.png";
  imagenpathway2:any =  "../../../assets/images/blanco.png";

  pathwayGraph1: any;
  pathwayGraph2: any;

  isExtendedSelected: boolean;

  ngOnInit() {
    this.pathway1final = "";
    this.pathway2final = "";
    this.isExtendedSelected = false;
    this.currentAlgorithmTypeSelected = "Original";
  }

  checkAlgorithmType(){
    alert("Current Algorithm Type: " + this.currentAlgorithmTypeSelected);
  }

  processPathways(){
    switch(this.currentAlgorithmTypeSelected){
      case "Original":
        alert(this.currentAlgorithmTypeSelected);
        break;
      case "Extended":
        alert(this.currentAlgorithmTypeSelected);
        break;
      case "Weighted":
        alert(this.currentAlgorithmTypeSelected);
        break;
    }
  }
  
  public onArchivoSeleccionado(event: { target: { files: any[]; }; }) {
    
    this.pathway1 = event.target.files[0];
    this.nombrepathway1 = this.pathway1.name;
    //console.log("El nombre del archivo 1 es: "+this.nombrepathway1);
    console.log("pathway1: ");
    console.log(this.pathway1);
    this.postcargarxml1();
    console.log("soin i love you");
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
        if(data.body){
          var key;
          console.log("data");
          console.log(data);
          for (key in data.body) {
            if (data.body.hasOwnProperty(key)) {
              console.log("pathwayfinal: "+  data.body[key]);
              this.pathway1final = data.body[key];
            }
          } 
          console.log("nombre: "+ this.pathway1final);
          this.llamarapython1();
          //this.cargarimagen1();

        }else{
          //console.log("paginita");
        }
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
        this.llamarapython2();
        //this.cargarimagen2();
      }
    )
  }

  //cargarimagen1(){
  //  this.imagenpathway1 =  require("../../../../images/"+this.pathway1final+".png");
  //}
  
  //cargarimagen2(){
  //  this.imagenpathway2 =  require("../../../../images/ko00010.png");
  //}

  llamarapython1(){
    this.service.llamarpython('//localhost:3000/api/python',this.pathway1final+'.xml','S1').subscribe(
      (data:any) => {
        console.log("datosmagicos");
        console.log(data);
      }
    )
  }

  llamarapython2(){
    this.service.llamarpython('//localhost:3000/api/python',this.pathway2final+'.xml','S1').subscribe(
      (data:any) => {
        console.log(data);
      }
    )
  }

}
