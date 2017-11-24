import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';

import { ApiClientService } from '../../core/services/api-client.service';
import { Schedule } from '../model/schedule';

@Injectable()
export class ScheduleService {

  constructor(private apiClientService: ApiClientService) { }

  getScheduleForGroupAtYearAndMonth(groupId: string, year: string, month: string): Observable<Schedule> {
    const params = new HttpParams();
    params.append('groupId', groupId);
    params.append('year', year);
    params.append('month', month);

    const uri = 'schedule/group?groupId=' + groupId + '&year=' + year + ' &month=' + month;
    return this.apiClientService.get<Schedule>(uri);
  }

}
