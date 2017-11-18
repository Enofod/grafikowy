import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../environments/environment';
import { MatSidenav } from '@angular/material';

import { SidenavService } from './core/services/sidenav.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(
    private sidenavService: SidenavService,
    private authService: AuthService) { }

  public ngOnInit(): void {
    // Store sidenav to service
    this.sidenavService
      .setSidenav(this.sidenav);
  }

  isDarkTheme() {
    const themeColor = localStorage.getItem(environment.themeColor);
    return themeColor != null && themeColor === 'dark';
  }

  isLoggedIn() {
    return this.authService.isUserOrAdmin();
  }
}
