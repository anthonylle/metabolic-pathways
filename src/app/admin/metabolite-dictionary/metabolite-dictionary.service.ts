import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { map } from "rxjs/operators";

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

}
