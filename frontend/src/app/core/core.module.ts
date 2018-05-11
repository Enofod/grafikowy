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
import { RegisterDialogComponent } from './components/header/register-dialog/register-dialog.component';
import { AddGroupDialogComponent } from './components/sidenav/add-group-dialog/add-group-dialog.component';
import { UserComponent } from './components/user/user.component';

import { AuthService } from './services/auth.service';
import { ApiClientService } from './services/api-client.service';
import { UserService } from './services/user.service';
import { SidenavService } from './services/sidenav.service';
import { ThemeService } from './services/theme.service';

import { UserAuthGuard } from './guards/user-auth.guard';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LandingComponent } from './components/landing/landing.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidenavComponent
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    Error404Component,
    HeaderComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    AddGroupDialogComponent,
    UserComponent,
    SidenavComponent,
    LandingComponent
  ],
  providers: [
    AuthService,
    ApiClientService,
    UserService,
    SidenavService,
    ThemeService,
    UserAuthGuard,
    AdminAuthGuard,
    SidenavComponent
  ],
  entryComponents: [
    LoginDialogComponent,
    RegisterDialogComponent,
    AddGroupDialogComponent
  ]
})

export class CoreModule {
  constructor() {
  }
}
