declare var require: any
import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HomepageService } from './homepage.service';
import { Subscription } from 'rxjs';
import * as jsPDF from 'jspdf';
import { matDrawerAnimations } from '@angular/material';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [HomepageService]
})
export class HomepageComponent implements OnInit {

  anio: any;
  month: any;
  day: any;
  subscription: Subscription;
  currentAlgorithmTypeSelected: any;
  currentAlgorithmCodeSelected: any;
  constructor(private service: HomepageService) {
    this.subscription = service.getCurrentAlgorithmType().subscribe(type =>
    { this.currentAlgorithmTypeSelected = type.text; });
  }


  pathway1: File;
  pathway2: File;
  pathwayName1:string;
  pathwayName2:string;
  pathway1final:string; //= "ko00010";
  pathway2final:string; //= "ko00010";

  pathwayGraph1: any;
  pathwayGraph2: any;
  //imagepathway1:string =  require("../../../../images/cit00710-1556089914716.png");
  imagepathway1:string =  "../../../assets/images/negro.png";
  imagepathway2:string =  "../../../assets/images/negro.png";

  isExtendedSelected: boolean;

  /*
  obtener valores de la tabla
  var matchvalue = (<HTMLInputElement>document.getElementById("matchValue")).value;
  var matchvalue = (<HTMLInputElement>document.getElementById("mismatchValue")).value;
  var matchvalue = (<HTMLInputElement>document.getElementById("gapValue")).value;
  */
  /*
  obtener el algortimo a utilizar
  var matchvalue = (<HTMLInputElement>document.getElementById("final-algorithm-selector")).value;
  */

  ngOnInit() {
    this.pathway1final = "";
    this.pathway2final = "";
    this.isExtendedSelected = false;
    this.currentAlgorithmTypeSelected = "Original";
    this.currentAlgorithmCodeSelected = "A1";
    this.isExtendedSelected = this.currentAlgorithmTypeSelected == "Extended";

    this.anio = new Date().getFullYear();
    this.month = new Date().getMonth() + 1;
    this.day = new Date().getDate();
    if(this.day<10){
      this.day = '0' + this.day.toString();
    }
    if(this.month<10){
      this.month = '0' + this.month.toString();
    }

  }

  checkAlgorithmType(){
    alert("Current Algorithm Type: " + this.currentAlgorithmTypeSelected);
  }

  processPathways(){
    switch(this.currentAlgorithmTypeSelected){
      case "Original":
        alert(this.currentAlgorithmTypeSelected);
        alert(document.getElementById('final-algorithm-selector'));
        //alert(this.currentAlgorithmCodeSelected);
        break;
      case "Extended":
        alert(this.currentAlgorithmTypeSelected);
        break;
      case "Weighted":
        alert(this.currentAlgorithmTypeSelected);
        break;
    }
  }
  
  async onSelectedFile(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.pathway1 = fileInput.target.files[0];
      this.pathwayName1 = this.pathway1.name;
      console.log("Pathway1 name:");
      console.log(this.pathwayName1);
      console.log("Post cargar xml1");
      let args
      this.fileUploaded(this.pathway1, this.service).then(filename => {
        console.log("filename");
        console.log(filename);
        args = {"code": "C1", "filename": filename + ".xml"};
        this.callPython(args, this.service).then(data => {
          console.log("RESULT FROM PYTHON NEW VERSION");
          console.log(data["Graph1"]);
          this.pathwayGraph1 = data["Graph1"];
        });
      });
    }
  }

  public onSelectedFile2(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.pathway2 = fileInput.target.files[0];
      this.pathwayName2 = this.pathway2.name;
      console.log("Pathway2 name:");
      console.log(this.pathwayName2);
      console.log("Post cargar xml2");
      this.fileUploaded(this.pathway1, this.service).then(filename => {
        console.log(filename);
        let args = {"code": "C1", "filename": filename + ".xml"};
        this.callPython(args, this.service).then(data => {
          console.log("RESULT FROM PYTHON NEW VERSION");
          console.log(data);
          this.pathwayGraph2 = data["Graph1"]
        });
      });
    }
    //this.imagepathway1 =  require("../../../../images/cit00710-1556089914716.png");
  }

  callPython  = function(args, providedService){
    return new Promise( (resolve, reject)=>{
      providedService.callPython(args).subscribe(
        (data)=>{
          if(data.body){
            resolve(data.body);
          }
        }
      );
    });
  };

  fileUploaded = function(xmlFile, providedService){
    return new Promise( (resolve, reject) => {
      providedService.uploadXMLFile('//localhost:3000/api/copyKGMLToTempUploads',xmlFile).subscribe(
          (data) => {
            if(data.body){
              var key;
              for (key in data.body) {
                if (data.body.hasOwnProperty(key)) {
                  resolve(data.body[key]);
                  //this.pathway1final = data.body[key];
                }
              }
            }
          }
      );
    });
  };

  async cargarimagen(){
  }

  downloadpdf(){
    const doc = new jsPDF();

    //logo del tec
    var logo = new Image();
    logo.src = "../../../assets/images/logo-tec.png";
    doc.addImage(logo,"PNG",165, 0, 40, 20);

    

    //titulo
    doc.text('Metabolic Pathways Comparison',60,30);
    
    //fecha
    doc.text("Date: " + this.anio+"-"+this.month+"-"+this.day,10,50);

    
    //imagen estatica
    var image = new Image();
    var width;
    var height;
    image.onload = function() {
      width = image.width;
      height = image.height;
      console.log(width);
      console.log(height);
      doc.addImage(image,"PNG",5, 100, width/10, height/10);
      doc.save('Resultado.pdf');
    };
    image.src = require("../../../../images/cit00710-1556178748605.png");
    console.log(width);
    



    






    
  }
}
