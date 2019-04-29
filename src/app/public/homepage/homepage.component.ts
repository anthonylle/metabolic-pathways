declare var require: any
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HomepageService } from './homepage.service';
import { Subscription } from 'rxjs';
import * as jsPDF from 'jspdf';
import { matDrawerAnimations } from '@angular/material';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [HomepageService]
})
export class HomepageComponent implements OnInit {

  @ViewChild('content') content: ElementRef;

  subscriptionType: Subscription;
  subscriptionCode: Subscription;
  anio: any;
  month: any;
  day: any;
  currentAlgorithmTypeSelected: any;
  currentAlgorithmCodeSelected: any;
  currentAlgorithmExecutionResult: any[];
  constructor(private service: HomepageService) {
    this.subscriptionType = service.getCurrentAlgorithmType().subscribe(type =>
    {
      console.log("RECEIVING FROM SERVICE TYPE");
      console.log(type);
      this.currentAlgorithmTypeSelected = type.text;

    });
    this.subscriptionCode = service.getCurrentAlgorithmCode().subscribe(code =>{
      console.log("RECEIVING FROM SERVICE CODE");
      console.log(code);
      this.currentAlgorithmCodeSelected = code.code;
      }
    );
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
        if(this.currentAlgorithmCodeSelected == 'A1'){
          console.log("EXECUTING ALGORITHM A1");
          const args = {"code": this.currentAlgorithmCodeSelected,
                        "pathwayGraph1": this.pathwayGraph1,
                        "pathwayGraph2": this.pathwayGraph2,
                        "match": 1, //hard coded
                        "missmatch": -1, //hard coded
                        "gap": -2}; //hard coded
          this.callPython(args, this.service).then(result =>{
            console.log("RESULT FROM A1 ALGORITHM");
            this.currentAlgorithmExecutionResult = [];
            for (const key in result) {
              if (result.hasOwnProperty(key)) {
                this.currentAlgorithmExecutionResult.push({"key": key, "value": result[key]});
              }
            }
            console.log(this.currentAlgorithmExecutionResult);
            //this.currentAlgorithmExecutionResult = Array.of(JSON.stringify(result));

          }).catch(error =>{
            console.log("ERROR IN A1 ALGORITHM EXECUTION");
          });
        }else{
          if(this.currentAlgorithmCodeSelected == 'A2'){
            alert("A2 execution to be implemented");
          }else{
            alert("Unknown code");
          }
        }


        //alert(this.currentAlgorithmCodeSelected);
        break;
      case "Extended":
        alert(this.currentAlgorithmTypeSelected);
        alert(this.currentAlgorithmCodeSelected);
        break;
      case "Weighted":
        alert(this.currentAlgorithmTypeSelected);
        alert(this.currentAlgorithmCodeSelected);
        break;
    }
  }
  
  async onSelectedFile(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.pathway1 = fileInput.target.files[0];
      this.pathwayName1 = this.pathway1.name;
      console.log("Pathway1 name:");
      console.log(this.pathwayName1);
      this.fileUploaded(this.pathway1, this.service).then(filename => {
        console.log("filename");
        console.log(filename);
        let args = {"code": "C1", "filename": filename + ".xml"};
        this.callPython(args, this.service).then(data => {
          console.log("RESULT FROM PYTHON");
          console.log(data["Graph1"]);
          this.pathwayGraph1 = JSON.stringify(data["Graph1"]);
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
      this.fileUploaded(this.pathway2, this.service).then(filename => {
        console.log(filename);
        let args = {"code": "C1", "filename": filename + ".xml"};
        this.callPython(args, this.service).then(data => {
          console.log("RESULT FROM PYTHON");
          console.log(data["Graph1"]);
          this.pathwayGraph2 = JSON.stringify(data["Graph1"]);
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

    
    //imagen estatica
    var image = new Image();
    var width;
    var height;

    html2canvas(document.querySelector('#content')).then(canvas => {
      //logo del tec
      var logo = new Image();
      logo.src = "../../../assets/images/logo-tec.png";
      doc.addImage(logo,"PNG",165, 0, 40, 20);

      //titulo
      doc.text('Metabolic Pathways Comparison',60,30);
  
      //fecha
      doc.text("Date: " + this.anio+"-"+this.month+"-"+this.day,10,50);

      image.onload = function() {
      
        width = image.width;
        height = image.height;
        console.log(width);
        console.log(height);
        doc.addImage(image,"PNG",5, 100, width/10, height/10);

        doc.addPage();
        doc.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);

        doc.save('Resultado.pdf');
        
      };
      image.src = require("../../../../images/cit00710-1556178748605.png");
      
    });
    
    
  }

  print() {
		const filename  = 'prueba.pdf';

		html2canvas(document.querySelector('#content')).then(canvas => {
			let pdf = new jsPDF('p', 'mm', 'a4');
			pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 5, 100);
			pdf.save(filename);
		});
	}
}
