import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Schedule } from '../../model/schedule/schedule';
import { ScheduleService } from '../../services/schedule.service';
import { MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material';
import { MatSliderModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import 'rxjs/add/observable/of';
import { ShiftInDay } from '../../model/schedule/shift-in-day';
import { ThemeService } from '../../../core/services/theme.service';

declare var require: any;

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styles: [require('./schedule.component.scss')]
})
export class ScheduleComponent implements OnInit, OnDestroy {

  groupName: string;
  private sub: any;
  private selectedDate: Date = new Date();
  private userNameCellHeaderName = 'Nazwisko';
  private monthNames: string[] = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

  dataSource: TableDataSource;

  private dataSubject = new BehaviorSubject<any[]>([]);

  columnHeaders: string[] = [];
  columns: ColumnDefinition[] = [];
  tableData: string[] = [];

  private schedule: Schedule;

  constructor(private route: ActivatedRoute, private scheduleService: ScheduleService, private themeService: ThemeService) {
    this.dataSource = new TableDataSource(this.dataSubject);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.groupName = params.groupName;
      this.loadSchedule();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadSchedule() {
    this.scheduleService.getScheduleForGroupAtYearAndMonth(this.groupName, this.selectedDate.getFullYear().toString(),
     (this.selectedDate.getMonth() + 1).toString()).subscribe(schedule => {
      const numberOfDays = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1, 0).getDate();
      this.columnHeaders = this.generateHeaders(numberOfDays);
      this.columns = this.generateColumns(numberOfDays);
      this.tableData = this.generateData(numberOfDays, schedule);

      this.dataSubject.next(this.tableData);
      this.schedule = schedule;
    });
  }

  generateHeaders(daysInMonth: number) {
    const displayedColumns: string[] = [];

    displayedColumns.push(this.userNameCellHeaderName);

    for (let currentDay = 1; currentDay <= daysInMonth; currentDay++) {
      displayedColumns.push(currentDay.toString());
    }

    return displayedColumns;

  }

  generateColumns(daysInMonth: number) {
    let columnObj: object;
    const columns: ColumnDefinition[] = [];

    columns.push(new ColumnDefinition(
      this.userNameCellHeaderName,
      this.userNameCellHeaderName,
      []
    ));

    for (let currentDay = 1; currentDay <= daysInMonth; currentDay++) {
      columnObj = new function () {
        this.columnDef = currentDay.toString();
        this.header = currentDay.toString();
        this.cell = [];
      };

      columns.push(new ColumnDefinition(
        currentDay.toString(),
        currentDay.toString(),
        []
      ));
    }

    return columns;

  }

  generateData(daysInMonth: number, schedule: Schedule) {
    let tableRow: string[] = [];
    const tableData: any[] = [];

    for (const userShift of schedule.userShifts) {
      tableRow.push(userShift.user.lastName + ' ' + userShift.user.firstName);
      for (const shift of userShift.shiftInDay) {
        tableRow.push(shift.shiftType.toString());
      }

      tableData.push(tableRow);
      tableRow = [];
    }

    return tableData;
  }

  getSelectedDateString(): string {
    return this.monthNames[this.selectedDate.getMonth()] + ' ' + this.selectedDate.getFullYear();
  }

  goToNextMonth(): void {
    this.selectedDate.setMonth(this.selectedDate.getMonth() + 1);
    this.loadSchedule();
  }

  goToPreviousMonth(): void {
    this.selectedDate.setMonth(this.selectedDate.getMonth() - 1);
    this.loadSchedule();
  }

  changeShiftType(row: string, column: string) {
    const currentShiftType = this.tableData[row][column];
    if (currentShiftType === 'DAY') {
      this.tableData[row][column] = 'NIGHT';
    } else if (currentShiftType === 'NIGHT') {
      this.tableData[row][column] = 'NONE';
    } else {
      this.tableData[row][column] = 'DAY';
    }
  }

  getDisplayValueForCell(value: String) {
    if (value === 'DAY') {
      return 'D';
    } else if (value === 'NIGHT') {
      return 'N';
    } else if (value === 'NONE') {
      return '-';
    } else {
      return value;
    }
  }

  isDarkTheme() {
    return this.themeService.isDarkTheme();
  }
}

export class ColumnDefinition {
  columnDef: string;
  header: string;
  cell: any;

  constructor(columnDef: string, header: string, cell: any) {
    this.columnDef = columnDef;
    this.header = header;
    this.cell = cell;
  }
}

export class TableDataSource extends DataSource<any> {

  constructor(private data: BehaviorSubject<any[]>) {
    super();
  }

  connect() {
    return this.data.asObservable();
  }

  disconnect() { }
}
