import { Injectable } from '@angular/core';

import { User } from '../model/user';
import { Observable } from 'rxjs/Observable';

import { ApiClientService } from './api-client.service';
import { AuthService } from './auth.service';


@Injectable()
export class UserService {

  constructor(private apiClientService: ApiClientService, private authService: AuthService) { }

  getUserByEmail(email: string): Observable<User> {
    return this.apiClientService.get<User>('users/' + email);
  }

  getCurrentUserDetails(): Observable<User> {
    const userEmail = this.authService.getUserEmail();
    if (userEmail == null) {
      return Observable.of(null);
    }
    return this.getUserByEmail(this.authService.getUserEmail()).map(user => {
      return {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        roles: this.authService.getUserRoles(),
        usingGroups: user.usingGroups,
        moderatingGroups: user.moderatingGroups
      }; // TODO: Check if there is better way to add user roles
    });
  }
}
