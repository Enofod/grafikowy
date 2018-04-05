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
import { UserShifts } from '../../model/schedule/user-shifts';
import { MatSnackBar } from '@angular/material';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { RemoveUserDialogComponent } from './remove-user-dialog/remove-user-dialog.component';
import { MatDialog } from '@angular/material';

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
  private userNameCellHeaderName = 'Imię i nazwisko';
  private monthNames: string[] = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];

  dataSource: TableDataSource;

  private dataSubject = new BehaviorSubject<any[]>([]);

  columnHeaders: string[] = [];
  columns: ColumnDefinition[] = [];
  tableData: any[] = [];

  private schedule: Schedule;

  constructor(private route: ActivatedRoute,
      private scheduleService: ScheduleService,
      private themeService: ThemeService,
      private snackBar: MatSnackBar,
      private dialog: MatDialog
    ) {
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
        this.tableData = this.fillData(numberOfDays, schedule);

        this.dataSubject.next(this.tableData);
        this.schedule = schedule;
      });
  }

  saveSchedule() {
    this.snackBar.open('Funcjonalnosc jeszcze nie wspierana!', 'OK', { duration: 2500 });
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

  fillData(daysInMonth: number, schedule: Schedule) {
    let tableRow: any[] = [];
    const tableData: any[] = [];

    for (const userShift of schedule.userShifts) {
      tableRow.push(userShift.user);
      for (const shift of userShift.shiftInDay) {
        tableRow.push(shift);
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

  handleCellClick(row: string, column: string) {
    const cellValue = this.tableData[row][column];

    if (cellValue.shiftType !== null) {
      this.changeShiftType(row, column);
    }
  }

  changeShiftType(row: string, column: string) {
    const currentShiftType = this.tableData[row][column].shiftType;
    if (currentShiftType === 'DAY') {
      this.tableData[row][column].shiftType = 'NIGHT';
    } else if (currentShiftType === 'NIGHT') {
      this.tableData[row][column].shiftType = 'NONE';
    } else {
      this.tableData[row][column].shiftType = 'DAY';
    }
  }

  getDisplayValueForCell(value: any) {
    if (value.firstName && value.lastName) {
      return value.firstName + ' ' + value.lastName;
    }

    const shiftType = value.shiftType;
    if (shiftType === 'DAY') {
      return 'D';
    } else if (shiftType === 'NIGHT') {
      return 'N';
    } else if (shiftType === 'NONE') {
      return '-';
    }

    return value;

  }

  opendAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '450px',
      data: { groupName: this.groupName },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadSchedule();
    });
  }

  openRemoveUserDialog(): void {
    const dialogRef = this.dialog.open(RemoveUserDialogComponent, {
      width: '450px',
      data: { groupName: this.groupName },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadSchedule();
    });
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
