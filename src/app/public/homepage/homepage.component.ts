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
  subscriptionType: Subscription;
  subscriptionCode: Subscription;
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
  imagenpathway1:String =  "../../../assets/images/negro.png";
  imagenpathway2:String =  "../../../assets/images/negro.png";

  pathwayGraph1: any;
  pathwayGraph2: any;
  pathwayNodes1: object;
  pathwayNodes2: object;

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
  }

  checkAlgorithmType(){
    alert("Current Algorithm Type: " + this.currentAlgorithmTypeSelected);
  }

  processPathways(){
    switch(this.currentAlgorithmTypeSelected){
      case "Original":
        if(this.currentAlgorithmCodeSelected == 'A1'){
          console.log("EXECUTING ALGORITHM A1");
          const originalArgs = {"code": this.currentAlgorithmCodeSelected,
                        "pathwayGraph1": this.pathwayGraph1,
                        "pathwayGraph2": this.pathwayGraph2,
                        "match": 1, //hard coded
                        "missmatch": -1, //hard coded
                        "gap": -2}; //hard coded
          this.callPython(originalArgs, this.service).then(result =>{
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
            console.log("EXECUTING ALGORITHM A2");
            const originalArgs = {"code": this.currentAlgorithmCodeSelected,
                          "pathwayGraph1": this.pathwayGraph1,
                          "pathwayGraph2": this.pathwayGraph2};
            this.callPython(originalArgs, this.service).then(result =>{
              console.log("RESULT FROM A2 ALGORITHM");
              this.currentAlgorithmExecutionResult = [];
              for (const key in result) {
                if (result.hasOwnProperty(key)) {
                  this.currentAlgorithmExecutionResult.push({"key": key, "value": result[key]});
                }
              }
              console.log(this.currentAlgorithmExecutionResult);
            }).catch(error =>{
              console.log("ERROR IN A2 ALGORITHM EXECUTION");
            });
          }else{
            alert("Unknown code");
          }
        }
        break;
      case "Extended":
        const extendedArgs = {"code": this.currentAlgorithmCodeSelected,
          "pathwayGraph1": this.pathwayGraph1,
          "pathwayGraph2": this.pathwayGraph2,
          "match": 1,
          "missmatch": -1,
          "gap": -2};
        switch (this.currentAlgorithmCodeSelected) {
          case 'A1T1':
            break;
          case 'A1T2':
            extendedArgs['startNodeGraph1'] = 1; // hard coded
            extendedArgs['startNodeGraph2'] = 1; // hard coded
            break;
          case 'A1T3':
            extendedArgs['startNodeGraph1'] = 1; // hard coded
            extendedArgs['startNodeGraph2'] = 1; // hard coded
            extendedArgs['endNodeGraph1'] = 1; // hard coded
            extendedArgs['endNodeGraph2'] = 1; // hard coded
            break;
          case 'A1T4':
            extendedArgs['startNodeGraph1'] = 1; // hard coded
            extendedArgs['startNodeGraph2'] = 1; // hard coded
            extendedArgs['endNodeGraph1'] = 1; // hard coded
            extendedArgs['endNodeGraph2'] = 1; // hard coded
            break;
          case 'A1T5':
            extendedArgs['startNodeGraph1'] = 1; // hard coded
            extendedArgs['startNodeGraph2'] = 1; // hard coded
            extendedArgs['endNodeGraph1'] = 1; // hard coded
            extendedArgs['endNodeGraph2'] = 1; // hard coded
            break;
        }
        this.callPython(extendedArgs, this.service).then(result =>{
          console.log("RESULT FROM EXTENDED ALGORITHM");
          this.currentAlgorithmExecutionResult = [];
          for (const key in result) {
            if (result.hasOwnProperty(key)) {
              this.currentAlgorithmExecutionResult.push({"key": key, "value": result[key]});
            }
          }
          console.log(this.currentAlgorithmExecutionResult);
          //this.currentAlgorithmExecutionResult = Array.of(JSON.stringify(result));

        }).catch(error =>{
          console.log("ERROR IN EXTENDED ALGORITHM EXECUTION");
        });
        break;
      case "Weighted":
        alert("Not supported yet");
        break;
    }
  }
  
  public onSelectedFile(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.pathway1 = fileInput.target.files[0];
      this.pathwayName1 = this.pathway1.name;
      console.log("Pathway1 name:");
      console.log(this.pathwayName1);
      this.fileUploaded(this.pathway1, this.service).then(filename => {
        console.log(filename);
        let args = {"code": "C1", "filename": filename + ".xml"};
        this.callPython(args, this.service).then(data => {
          console.log("RESULT FROM PYTHON");
          console.log(data["Compound Graph 1"]);
          this.pathwayGraph1 = JSON.stringify(data["Compound Graph 1"]);  // TODO A1 & A2 work with diff parsed JSONs
          console.log("Calling NIndex Now for this Graph1");
          let indexArgs = {"code": "NIndex", "pathwayGraph": this.pathwayGraph1};
          this.callPython(indexArgs, this.service).then( indexes =>{
            console.log("Indexes for this pathway1 are");
            console.log(indexes);

          });
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
          console.log(data["Compound Graph 1"]);
          this.pathwayGraph2 = JSON.stringify(data["Compound Graph 1"]);
          console.log("Calling NIndex Now for this Graph2");
          let indexArgs = {"code": "NIndex", "pathwayGraph": this.pathwayGraph2};
          this.callPython(indexArgs, this.service).then( indexes =>{
            console.log("Indexes for this pathway2 are");
            console.log(indexes);

          });
        });
      });
    }
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


}
