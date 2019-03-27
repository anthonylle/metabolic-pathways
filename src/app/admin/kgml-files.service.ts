import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class KgmlFilesService {

  constructor(private http: HttpClient) { }

  getAllKGMLFiles(){
    return this.http.get('http://localhost:3000/api/files').pipe(map((files) => {
      return files;
    }));
  }
}
