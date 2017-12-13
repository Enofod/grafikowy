import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiClientService } from '../../core/services/api-client.service';
import { Calendar } from '../model/calendar/calendar';

@Injectable()
export class GroupService {

  constructor(private apiClientService: ApiClientService) { }

  addUserToGroup(userEmail: string, groupName: string): Observable<Object> {
    const uri = 'groups/' + groupName + '/addUser';
    return this.apiClientService.postForVoid(uri, {email: userEmail});
  }

  removeUserFromGroup(userEmail: string, groupName: string): Observable<Object> {
    const uri = 'groups/' + groupName + '/removeUser';
    return this.apiClientService.postForVoid(uri, {email: userEmail});
  }

}
