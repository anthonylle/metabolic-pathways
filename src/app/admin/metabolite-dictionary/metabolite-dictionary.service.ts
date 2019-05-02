import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http'
import { map } from "rxjs/operators";
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetaboliteDictionaryService {

  constructor(private http: HttpClient) { }

  getDictionary() {
    return this.http.get('http://localhost:3000/api/translations/').pipe(map((translations) => {
      return translations;
    }));
  }

  addNewEntry(url: string, name: string, code: string):Observable<HttpEvent<any>>{
    let formData = new FormData();
    formData.append('name', name);
    formData.append('code', code);

    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };
    
    const req = new HttpRequest('POST', url, formData, options);
    return this.http.request(req);
  }

  deleteEntry(url: string):Observable<HttpEvent<any>>{
    let formData = new FormData();

    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };
    
    const req = new HttpRequest('DELETE', url, formData, options);
    return this.http.request(req);
  }

}
