import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';
import { CalendarService } from '../../services/calendar.service';
import { AuthService } from '../../../core/services/auth.service';

declare var require: any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styles: [require('./calendar.component.scss')],
})
export class CalendarComponent implements OnInit {

  private groupName: string;
  private sub: any;
  private selectedDate: Date = new Date();

  constructor(private route: ActivatedRoute, private themeService: ThemeService, private calendarService: CalendarService,
    private authService: AuthService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.groupName = params.groupName;

      this.calendarService.getCalendarForUserAndGroupAndYearAndMonth(
        this.authService.getUserEmail(), this.groupName, this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1)
        .subscribe(calendar => {
          console.log(calendar);
        });
    });
  }

  isDarkTheme() {
    return this.themeService.isDarkTheme();
  }

}
