import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { environment } from '../../../../environments/environment';
import { SidenavService } from '../../services/sidenav.service';
import { Router } from '@angular/router';

declare var require: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [require('./header.component.scss')]
})
export class HeaderComponent implements OnInit {

  loggedUser: User;

  constructor(private dialog: MatDialog,
    private authService: AuthService,
    private userService: UserService,
    private sidenavService: SidenavService,
    private router: Router,
    private themeService: ThemeService) { }

  ngOnInit() {
    this.loadLoggedInUser();
  }

  isLoggedIn(): boolean {
    if (this.loggedUser === null && this.authService.isUserOrAdmin()) {
      this.loadLoggedInUser();
    }
    return this.loggedUser != null;
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '450px'
    });
  }

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: '450px'
    });
  }

  logout() {
    this.authService.logout();
    this.loggedUser = null;

    this.router.navigate(['/']); //for the case 'the user logout I want him to be redirected to home.
  }

  loadLoggedInUser(): void {
    this.userService.getCurrentUserDetails().subscribe(user => {
      this.loggedUser = user;
    });
  }

  isDarkTheme() {
    return this.themeService.isDarkTheme();
  }

  changeTheme(): void {
    this.themeService.switchTheme();
  }

  public toggleSidenav() {
    this.sidenavService
      .toggle()
      .then(() => { });
  }


}
