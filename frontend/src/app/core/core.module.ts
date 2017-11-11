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
import { UserComponent } from './components/user/user.component';

import { AuthService } from './services/auth.service';
import { ApiClientService } from './services/api-client.service';
import { UserService } from './services/user.service';

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
    LoginDialogComponent,
    UserComponent
  ],
  providers: [
    AuthService,
    ApiClientService,
    UserService
  ],
  entryComponents: [
    LoginDialogComponent
  ]
})

export class CoreModule {
  constructor() {
  }
}
