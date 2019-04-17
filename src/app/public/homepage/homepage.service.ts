import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http'
import {map} from "rxjs/operators";
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(private http: HttpClient) { }

  private subject = new Subject<any>();


  getCurrentAlgorithmType(): Observable<any>{
    return this.subject.asObservable();
  }

  setCurrentAlgorithmType(type: string) {
    this.subject.next({ text: type });
  }


  uploadXMLFile(url: string, file: File):Observable<HttpEvent<any>>{
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

  llamarpython(url: string, file: string, tipo: string):Observable<HttpEvent<any>>{
    let formData = new FormData();
    formData.append('file', file);
    formData.append('tipo', tipo);
    console.log(formData);

    let params = new HttpParams();

    const options = {
      params: params, reportProgress: true,
    };

    const req = new HttpRequest('POST', url, formData, options);

    return this.http.request(req);
  }
}
