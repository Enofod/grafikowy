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

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit, OnDestroy {

  groupId: any;
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

  constructor(private route: ActivatedRoute, private scheduleService: ScheduleService) {
    this.dataSource = new TableDataSource(this.dataSubject);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.groupId = +params.groupId;
      this.updateTableData();


    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  updateTableData() {
    this.scheduleService.getScheduleForGroupAtYearAndMonth(this.groupId.toString(), '2017', '11').subscribe(schedule => {
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

    const numberOfPeople = 10;

    const personName = 'Dawid';

    for (let currentPersonIndex = 0; currentPersonIndex < numberOfPeople; currentPersonIndex++) {
      tableRow.push(personName);
      for (let currentDay = 1; currentDay <= daysInMonth; currentDay++) {
        tableRow.push(currentDay.toString() + ' ' + currentPersonIndex);
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
    this.updateTableData();
  }

  goToPreviousMonth(): void {
    this.selectedDate.setMonth(this.selectedDate.getMonth() - 1);
    this.updateTableData();
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
