import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiClientService } from '../../core/services/api-client.service';
import { Calendar } from '../model/calendar/calendar';

@Injectable()
export class CalendarService {

  constructor(private apiClientService: ApiClientService) { }

  getCalendarForUserAndGroupAndYearAndMonth(userEmail: string, groupName: string, year: number, month: number): Observable<Calendar> {
    const uri = 'shifts?userEmail=' + userEmail + '&groupName=' + groupName + '&year=' + year.toString() + '&month=' + month;
    return this.apiClientService.get<Calendar>(uri);
  }

}
