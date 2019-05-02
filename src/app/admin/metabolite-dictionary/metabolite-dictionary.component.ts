import {Component, OnInit, ViewChild} from '@angular/core';
import { MetaboliteDictionaryService } from "./metabolite-dictionary.service";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-metabolite-dictionary',
  templateUrl: './metabolite-dictionary.component.html',
  styleUrls: ['./metabolite-dictionary.component.css'],
  providers: [MetaboliteDictionaryService]
})
export class MetaboliteDictionaryComponent implements OnInit {

  constructor(private service: MetaboliteDictionaryService) {
    this.service.getDictionary().subscribe( translations =>{
      this.translations = translations;
      this.translationsData = new MatTableDataSource<any>(translations as
        {_id: string, code: string, name: string, createdAt: Date, updatedAt: Date, __v: number}[]);
    });
  }

  translations: any = [];
  translationsData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Code', 'Name', 'Created At', 'Actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {

    this.translationsData.sort = this.sort;
    this.translationsData.paginator = this.paginator;
  }

  deleteEntry(id: string){
    console.log(id);
    this.service.deleteEntry('http://localhost:3000/api/translations/'+id).subscribe(
            translations => {
              this.service.getDictionary().subscribe( translations =>{
                this.translations = translations;
                this.translationsData = new MatTableDataSource<any>(translations as
                  {_id: string, code: string, name: string, createdAt: Date, updatedAt: Date, __v: number}[]);
              });
            }
        );
  }

  addNewEntry(){
    var name = "";
    var code = "";
    name = (<HTMLInputElement>document.getElementsByName("name")[0]).value;
    code = (<HTMLInputElement>document.getElementsByName("code")[0]).value;
    if(name != "" && code != ""){
      //console.log(name);
      //console.log(code);
      return new Promise( (resolve, reject) => {
        this.service.addNewEntry('http://localhost:3000/api/translations/',name, code).subscribe(
            translations => {
              this.service.getDictionary().subscribe( translations =>{
                this.translations = translations;
                this.translationsData = new MatTableDataSource<any>(translations as
                  {_id: string, code: string, name: string, createdAt: Date, updatedAt: Date, __v: number}[]);
              });
            }
        );
      });


    } 
  }



}
