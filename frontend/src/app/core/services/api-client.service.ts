import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';

@Injectable()
export class ApiClientService {

  constructor(private http: HttpClient) { }

  get<T>(uri: string): Observable<T> {
    return this.http.get<T>(environment.apiUrl.concat(uri),
      {
        headers: new HttpHeaders({ 'Authorization': localStorage.getItem(environment.authTokenLocalStorageKey) }),
      }
    );
  }

  post<T>(uri: string, body: any): Observable<T> {
    return this.http.post<T>(environment.apiUrl.concat(uri), body,
      {
        headers: new HttpHeaders({ 'Authorization': localStorage.getItem(environment.authTokenLocalStorageKey) }),
      }
    );
  }

  postWithoutAuthorizationForEmptyResponse(uri: string, body: any): Observable<Object> {
    return this.http.post(environment.apiUrl.concat(uri), body,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'text' as 'text',
        observe: 'response'
      });
  }
}
