import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { MaterialModule } from './shared/modules/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { ScheduleComponent } from './features/components/schedule/schedule.component';
import { ScheduleService } from './features/services/schedule.service';
import { AddUserDialogComponent } from './features/components/schedule/add-user-dialog/add-user-dialog.component';
import { RemoveUserDialogComponent } from './features/components/schedule/remove-user-dialog/remove-user-dialog.component';
import { CalendarService } from './features/services/calendar.service';
import { GroupService } from './features/services/group.service';
import { CalendarComponent } from './features/components/calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    ScheduleComponent,
    CalendarComponent,
    AddUserDialogComponent,
    RemoveUserDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [
    ScheduleService,
    CalendarService,
    GroupService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddUserDialogComponent,
    RemoveUserDialogComponent
  ]
})
export class AppModule { }
