import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiClientService } from '../../core/services/api-client.service';
import { Schedule } from '../model/schedule/schedule';

@Injectable()
export class ScheduleService {

  constructor(private apiClientService: ApiClientService) { }

  getScheduleForGroupAtYearAndMonth(groupNmae: string, year: string, month: string): Observable<Schedule> {
    const uri = 'schedule/group?groupName=' + groupNmae + '&year=' + year + ' &month=' + month;
    return this.apiClientService.get<Schedule>(uri);
  }

  postSchedule(schedule: Schedule): Observable<Schedule> {
    const uri = 'schedule/group';
    return this.apiClientService.post<Schedule>(uri, schedule);
  }

}
