import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';
import { CalendarService } from '../../services/calendar.service';
import { AuthService } from '../../../core/services/auth.service';
import { Calendar } from '../../model/calendar/calendar';

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
  private monthNames: string[] = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

  private dayNames: string[] = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];

  calendar: any[] = [];

  tiles: any[] = [];

  fixedCols = 7;
  fixedRowHeight = 90;

  constructor(private route: ActivatedRoute, private themeService: ThemeService, private calendarService: CalendarService,
    private authService: AuthService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.groupName = params.groupName;

      this.updateTiles();
    });
  }

  updateTiles() {
    this.calendarService.getCalendarForUserAndGroupAndYearAndMonth(
      this.authService.getUserEmail(), this.groupName, this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1)
      .subscribe(calendar => {
        this.generateTiles(calendar);
      });
  }

  generateTiles(calendar: Calendar) {
    const date = this.selectedDate;
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    let firstDayOfTheWeek = firstDay.getDay();
    const tempTiles = new Array();


    this.dayNames.forEach(dayName => {
      tempTiles.push({ text: dayName, qualifier: 'dayName' });
    });

    if (firstDay.getDay() - 1 === -1) {
      firstDayOfTheWeek = 7;
    }
    for (let i = 0; i < firstDayOfTheWeek - 1; i++) {
      tempTiles.push({ text: '', qualifier: 'outOfMonth' });
    }

    for (let i = 1; i < lastDay.getDate() + 1; i++) {
      tempTiles.push({ text: i, qualifier: 'NONE' });
    }

    if (lastDay.getDay() !== 0) {
      for (let i = 7; i > lastDay.getDay(); i--) {
        tempTiles.push({ text: '', qualifier: 'outOfMonth' });
      }
    }

    console.log(calendar);
    calendar.shiftInDay.forEach(shiftInDay => {
      tempTiles[this.dayNames.length + firstDayOfTheWeek - 1 + shiftInDay.day - 1].qualifier = shiftInDay.shiftType;
     });

     this.tiles = tempTiles;
  }

  getSelectedDateString(): string {
    return this.monthNames[this.selectedDate.getMonth()] + ' ' + this.selectedDate.getFullYear();
  }

  goToNextMonth(): void {
    this.selectedDate.setMonth(this.selectedDate.getMonth() + 1);
    this.updateTiles();
  }

  goToPreviousMonth(): void {
    this.selectedDate.setMonth(this.selectedDate.getMonth() - 1);
    this.updateTiles();
  }

  isDarkTheme() {
    return this.themeService.isDarkTheme();
  }

}
