import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Schedule} from '../../model/schedule';
import {ScheduleService} from '../../services/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit, OnDestroy {
  id: number;
  private sub: any;

  schedule: Schedule;

  constructor(private route: ActivatedRoute, private scheduleService: ScheduleService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number

       this.scheduleService.getScheduleForGroupAtYearAndMonth(this.id.toString(), '2017', '11').subscribe(schedule => {
         console.log(schedule);
         this.schedule = schedule;
       });
       // In a real app: dispatch action to load the details here.
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
