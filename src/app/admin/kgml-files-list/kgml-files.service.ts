import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http'
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KgmlFilesService {

  constructor(private http: HttpClient) { }

  getAllKGMLFiles(){
    return this.http.get('http://localhost:3000/api/files').pipe(map((files) => {
      console.log("9");
      return files;
    }));
  }

  uploadKGMLFileToDB(url: string, file: File):Observable<HttpEvent<any>>{
    let formData = new FormData();
    formData.append('file', file);

    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    const req = new HttpRequest('POST', url, formData, options);
    return this.http.request(req);
  }

}
