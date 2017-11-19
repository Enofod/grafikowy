import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSidenav } from '@angular/material';

import { SidenavService } from './core/services/sidenav.service';
import { AuthService } from './core/services/auth.service';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(
    private sidenavService: SidenavService,
    private authService: AuthService,
    private themeServie: ThemeService) { }

  public ngOnInit(): void {
    // Store sidenav to service
    this.sidenavService
      .setSidenav(this.sidenav);
  }

  isDarkTheme() {
    return this.themeServie.isDarkTheme();
  }

  isLoggedIn() {
    return this.authService.isUserOrAdmin();
  }
}
