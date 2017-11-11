import { Injectable } from '@angular/core';

import { User } from '../model/user';
import { Observable } from 'rxjs/Observable';

import { ApiClientService } from './api-client.service';

@Injectable()
export class UserService {

  constructor(private apiClientService: ApiClientService) { }

  getUserByEmail(email: string): Observable<User> {
    return this.apiClientService.get<User>('users/' + email);
  }
}
