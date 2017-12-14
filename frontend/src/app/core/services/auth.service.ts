import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { Observable } from 'rxjs/Observable';
import { JwtHelper } from 'angular2-jwt';
import { environment } from '../../../environments/environment';
import { SignUpUser } from '../model/sign-up-user';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class AuthService {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private apiClientService: ApiClientService) { }

  // It returns true, if valid authentication, otherwise it throws error
  authenticate(email: string, password: string): Observable<boolean> {
    return this.apiClientService.postWithoutAuthorizationForVoid('login', new LoginCredentials(email, password)).map(
      (response: Response) => {
        const authToken = response.headers.get('Authorization');
        localStorage.setItem(environment.authTokenLocalStorageKey, authToken);
        return true;
      }
    );
  }

  signUp(email: string, password: string, firstName: string, lastName: string, phone: string): Observable<Object> {
    const user = new SignUpUser();
    user.email = email;
    user.password = password;
    user.firstName = firstName;
    user.lastName = lastName;
    user.phone = phone;
    return this.apiClientService.postWithoutAuthorizationForVoid('users/sign-up', user);
  }

  logout(): void {
    localStorage.removeItem(environment.authTokenLocalStorageKey);
  }

  getToken(): string {
    return localStorage.getItem(environment.authTokenLocalStorageKey);
  }

  getUserEmail(): string {
    const authToken = this.getToken();
    if (authToken == null) {
      return null;
    }
    return this.jwtHelper.decodeToken(authToken).sub;
  }

  getUserRoles(): string[] {
    const authToken = this.getToken();
    if (authToken == null) {
      return null;
    }
    return this.jwtHelper.decodeToken(authToken).auth;
  }

  isTokenExpired(): boolean {
    const authToken = this.getToken();
    return authToken === null ? true : this.jwtHelper.isTokenExpired(authToken);
  }

  isAdmin(): boolean {
    const authToken = this.getToken();
    if (authToken === null) {
      return false;
    }
    return 'ROLE_ADMIN' === this.jwtHelper.decodeToken(authToken).auth;
  }

  isUserOrAdmin(): boolean {
    const authToken = this.getToken();
    if (authToken === null) {
      return false;
    }
    const auth = this.jwtHelper.decodeToken(authToken).auth;
    return 'ROLE_ADMIN' === auth || 'ROLE_USER' === auth;
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
