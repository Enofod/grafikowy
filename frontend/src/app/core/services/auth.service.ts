import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { Observable } from 'rxjs/Observable';
import { JwtHelper} from 'angular2-jwt';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class AuthService {

  jwtHelper: JwtHelper = new JwtHelper();
  tokenFieldName = 'grafikowyAuthToken';

  constructor(private apiClientService: ApiClientService) { }

  // It returns true, if valid authentication, otherwise it throws error
  authenticate(email: string, password: string): Observable<boolean> {
    console.log('Authenticating: ' + email + ' ' + password);

    return this.apiClientService.postForEmptyResponse('login', new LoginCredentials(email, password)).map(
      (response: Response) => {
        const authToken = response.headers.get('Authorization');
        localStorage.setItem(this.tokenFieldName, authToken);
        return true;
      }
    );
  }

  getUserEmail(): string {
    const authToken = localStorage.getItem(this.tokenFieldName);
    return this.jwtHelper.decodeToken(authToken).sub;
  }

  isTokenExpired(): boolean {
    const authToken = localStorage.getItem(this.tokenFieldName);
    return authToken === null ? true : this.jwtHelper.isTokenExpired(authToken);
  }

  isAdmin(): boolean {
    const authToken = localStorage.getItem(this.tokenFieldName);
    if (authToken === null) {
      return false;
    }
    return 'ROLE_ADMIN' === this.jwtHelper.decodeToken(authToken).auth;
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
