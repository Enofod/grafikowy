import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {

  constructor(private apiClientService: ApiClientService) { }

  // It returns true, if valid authentication, otherwise it throws error
  authenticate(email: string, password: string): Observable<boolean> {
    console.log('Authenticating: ' + email + ' ' + password);

    return this.apiClientService.postForEmptyResponse('login', new LoginCredentials(email, password)).map(
      (response: Response) => {
        console.log(response.headers.get('Authorization'));
        return true;
      }
    );
  }
}

class LoginCredentials {
  private email: string;
  private password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
