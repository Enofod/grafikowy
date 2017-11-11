import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../shared/modules/material.module';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { Error404Component } from './components/error404/error404.component';
import { LoginDialogComponent } from './components/header/login-dialog/login-dialog.component';

import { AuthService } from './services/auth.service';
import { ApiClientService } from './services/api-client.service';

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
    AuthService,
    ApiClientService
  ],
  entryComponents: [
    LoginDialogComponent
  ]
})

export class CoreModule {
  constructor() {
  }
}
