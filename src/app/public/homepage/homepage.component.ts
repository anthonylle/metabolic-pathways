declare function require(path: string);
import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HomepageService } from './homepage.service';
import { Subscription } from 'rxjs';

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

  pathway1: File;
  pathway2: File;
  pathwayName1:string;
  pathwayName2:string;
  pathway1final:string; //= "ko00010";
  pathway2final:string; //= "ko00010";
  imagenpathway1:String =  "../../../assets/images/negro.png";
  imagenpathway2:String =  "../../../assets/images/negro.png";

  pathwayGraph1: any;
  pathwayGraph2: any;

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
  
  public onSelectedFile(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.pathway1 = fileInput.target.files[0];
      this.pathwayName1 = this.pathway1.name;
      console.log("Pathway1 name:");
      console.log(this.pathwayName1);
      console.log("Post cargar xml1");
      //this.copyXML1();
      this.fileUploaded(this.pathway1, this.service).then(filename => {
        console.log(filename);
        let args = {"code": "C1", "filename": filename + ".xml"};
        this.callPython(args, this.service).then(data => {
          console.log("RESULT FROM PYTHON NEW VERSION");
          console.log(data);
        });
        console.log("MUY AFUERA!");
      });
    }
  }
  public onSelectedFile2(fileInput: any) {

  }

  callPython  = function(args, providedService){
    return new Promise( (resolve, reject)=>{
      //args.push({"url": "localhost:3000/api/python"}); //now url is within the service
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


}
