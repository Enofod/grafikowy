import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { LoggerService } from './logger.service';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../shared/modules/material.module';
import { Error404Component } from './error404/error404.component';
import { LoginDialogComponent } from './header/login-dialog/login-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    Error404Component,
    HeaderComponent,
    LoginDialogComponent
  ],
  providers: [
    LoggerService
  ],
  entryComponents: [
    LoginDialogComponent
  ]
})

export class CoreModule {
  constructor() {
  }
}
