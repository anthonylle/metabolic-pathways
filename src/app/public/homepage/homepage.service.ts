import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http'
import { map } from "rxjs/operators";
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(private http: HttpClient) { }

  private subject = new Subject<any>();

  getCurrentAlgorithmCode(): Observable<any>{
    return this.subject.asObservable();
  }

  setCurrentAlgorithmCode(code: string) {
    this.subject.next({ text: code });
  }

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
    console.log("RETURN FROM UPLOADXMLFILE SERVICE");
    return this.http.request(req);
  }

  callPython(args: object):Observable<HttpEvent<any>>{ //url: string, filename: string, code: string
    let url = "//localhost:3000/api/python";
    let formData = new FormData();

    const algorithmCodes = ["A1", "A1T1", "A1T2", "A1T3", "A1T4", "A1T5"]; //TODO check for A2
    if(algorithmCodes.includes(args['code'])){
      //TODO implement the rest of the body params at this form data for the other codes
    }
    if(['C1'].includes(args['code'])){
      formData.append('filename', args['filename']);
      formData.append('code', args['code']);
    }

    let params = new HttpParams();//.set('filename', file);
    //params.append('code', code);

    const options = {
      params: params, reportProgress: true,
    };

    const req = new HttpRequest('POST', url, formData, options);

    const data = this.http.request(req);
    console.log("DATA FROM HOMEPAGE SERVICE (PYTHON): ");
    console.log(data);
    return data;
  }
}
