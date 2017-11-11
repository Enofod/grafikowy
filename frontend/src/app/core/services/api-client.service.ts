import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';

@Injectable()
export class ApiClientService {

  constructor(private http: HttpClient) { }

  get(uri: string): any {
    this.http.get(environment.apiUrl.concat(uri)).subscribe(data => {
      return data['value'];
    });
  }

  post(uri: string, body: any): Observable<Object> {
    return this.http.post(environment.apiUrl.concat(uri), body);
  }

  postForEmptyResponse(uri: string, body: any): Observable<Object> {
    return this.http.post(environment.apiUrl.concat(uri), body,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'text' as 'text',
        observe: 'response'
      });
  }
}
