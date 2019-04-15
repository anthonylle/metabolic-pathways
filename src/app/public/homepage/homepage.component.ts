declare function require(path: string);
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

  pathway1:File;
  pathway2:File;
  nombrepathway1:string;
  nombrepathway2:string;
  pathway1final:string; //= "ko00010";
  pathway2final:string; //= "ko00010";
  imagenpathway1:String =  "../../../assets/images/negro.png";
  imagenpathway2:String =  "../../../assets/images/negro.png";


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
    this.pathway1final = "ko00010";
    this.pathway2final = "ko00010";
  }
  
  public onArchivoSeleccionado(event: { target: { files: any[]; }; }) {
    this.pathway1 = event.target.files[0];
    this.nombrepathway1 = this.pathway1.name;
    this.postcargarxml1();
  }
  public onArchivoSeleccionado2(event: { target: { files: any[]; }; }) {
    
    this.pathway2 = event.target.files[0];
    this.nombrepathway2 = this.pathway2.name;
    this.postcargarxml2();
  }
  postcargarxml1(){
    this.service.uploadXMLFile('//localhost:3000/api/copyKGMLToTempUploads',this.pathway1).subscribe(
      (data:any) => {
        if(data.body){
          var key;
          for (key in data.body) {
            if (data.body.hasOwnProperty(key)) {
              this.pathway1final = data.body[key];
            }
          } 
          this.llamarapython1();
          this.cargarimagen1();

        }
        else{
          //console.log("paginita");
        }
      }
    )
  }

  postcargarxml2(){
    this.service.uploadXMLFile('//localhost:3000/api/copyKGMLToTempUploads',this.pathway2).subscribe(
      (data:any) => {
        if(data.body){
          var key;
          for (key in data.body) {
            if (data.body.hasOwnProperty(key)) {
              this.pathway2final = data.body[key];
            }
          } 
          this.llamarapython2();
          //this.cargarimagen2();
        }
        else{
          //console.log("paginita");
        }
      }
    )
  }

  llamarapython1(){
    this.service.llamarpython('//localhost:3000/api/python',this.pathway1final+'.xml','S1').subscribe(
      (data:any) => {
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

  cargarimagen1(){
    var path = "../../../../images/cit00710-1554877253297.png";
    console.log(path);
    this.imagenpathway1 =  require(path);
  }
  
  //cargarimagen2(){
  //  this.imagenpathway2 =  require("../../../../images/ko00010.png");
  //}

}
