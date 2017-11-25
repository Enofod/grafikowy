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

  private groupId: any;
  private sub: any;

  private schedule: Schedule;

  constructor(private route: ActivatedRoute, private scheduleService: ScheduleService) {
    this.dataSource = new tableDataSource(this._dataSubject)
  }

  ngOnInit() {
    this.updateTableData();
    this.sub = this.route.params.subscribe(params => {
      this.groupId = +params.groupId;

      this.scheduleService.getScheduleForGroupAtYearAndMonth(this.groupId.toString(), '2017', '11').subscribe(schedule => {
        console.log(schedule);
        this.schedule = schedule;
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  dataSource: tableDataSource;

  _dataSubject = new BehaviorSubject<any[]>([])

  columnHeaders: string[] = [];
  columns: object[] = [];
  tableData: string[] = [];

  columnSliderValue: number;
  rowSliderValue: number;


  updateTableData() {
    this.columnHeaders = this.generateHeaders(this.columnSliderValue);
    this.columns = this.generateColumns(this.columnSliderValue);
    this.tableData = this.generateData(this.columnSliderValue, this.rowSliderValue);

    this._dataSubject.next(this.tableData)
  }

  generateHeaders(tableColumns: number)                                                           // Create headers, this is just a array of strings
  {

    var innerIndex: number = 1;
    var displayedColumns: string[] = [];

    displayedColumns.push('Imię');
    do {
      displayedColumns.push(innerIndex.toString())

    }
    while (innerIndex++ < tableColumns);

    return displayedColumns;

  }

  generateColumns(tableColumns: number)                                                           // Create columns, this is an array of objects. The object the holds the headingName, Label and Cell 
  {

    var innerIndex: number = 1;
    var columnObj: object;
    var columns: object[] = [];

    columnObj = new function () {
      this.columnDef = "Imię";
      this.header = "Imię";
      this.cell = [];
    }

    columns.push(columnObj)

    do {

      columnObj = new function () {
        this.columnDef = innerIndex.toString();
        this.header = innerIndex.toString();
        this.cell = [];
      }

      columns.push(columnObj)

    }
    while (innerIndex++ < tableColumns);

    return columns;

  }

  generateData(tableColumns: number, tableRows: number)                                         // Create table data, this is just a 2d array of sequential numbers
  {
    var innerIndex: number = 1;
    var outerIndex: number = 0;
    var value: number;
    var tableRow: string[] = [];
    var tableData: any[] = [];

    do {
      tableRow.push('Dawid')
      innerIndex = 1;
      do {
        value = outerIndex * 10 + innerIndex
        tableRow.push(value.toString())
      }
      while (innerIndex++ < tableColumns);

      tableData.push(tableRow);
      tableRow = [];

    }
    while (outerIndex++ < tableRows - 1);

    return tableData;

  }
}

export class tableDataSource extends DataSource<any>
{

  constructor(private _data: BehaviorSubject<any[]>) {
    super();
  }

  connect() {
    return this._data.asObservable()
  }

  disconnect() { }

}