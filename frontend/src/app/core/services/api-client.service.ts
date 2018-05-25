import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

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

  postForVoid(uri: string, body: any): Observable<Object> {
    return this.http.post(environment.apiUrl.concat(uri), body,
      {
        headers: new HttpHeaders({ 'Authorization': localStorage.getItem(environment.authTokenLocalStorageKey) }),
        responseType: 'text' as 'text',
        observe: 'response'
      });
  }

  delete(uri: string): Observable<Object> {
    return this.http.delete(environment.apiUrl.concat(uri),
      {
        headers: new HttpHeaders({ 'Authorization': localStorage.getItem(environment.authTokenLocalStorageKey) }),
        responseType: 'text' as 'text',
        observe: 'response'
      });
  }

  putForVoid(uri: string, body: any): Observable<Object> {
    return this.http.put(environment.apiUrl.concat(uri), body,
      {
        headers: new HttpHeaders({ 'Authorization': localStorage.getItem(environment.authTokenLocalStorageKey) }),
        responseType: 'text' as 'text',
        observe: 'response'
      });
  }

  postWithoutAuthorizationForVoid(uri: string, body: any): Observable<Object> {
    return this.http.post(environment.apiUrl.concat(uri), body,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'text' as 'text',
        observe: 'response'
      });
  }
}
