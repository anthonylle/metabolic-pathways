import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http'
import {map} from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(private http: HttpClient) { }

  uploadXMLFile(url: string, file: File):Observable<HttpEvent<any>>{
    let formData = new FormData();
    formData.append('file', file);

    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    const req = new HttpRequest('POST', url, formData, options);
    console.log("9");
    return this.http.request(req);
  }

  llamarpython(url: string, file1: string, file2: string, tipo: string):Observable<HttpEvent<any>>{
    let formData = new FormData();
    formData.append('file1', file1);
    formData.append('file2', file2);
    formData.append('tipo', tipo);
    console.log(formData);

    let params = new HttpParams();

    const options = {
      params: params,      reportProgress: true,
    };

    const req = new HttpRequest('POST', url, formData, options);

    return this.http.request(req);
  }
}
