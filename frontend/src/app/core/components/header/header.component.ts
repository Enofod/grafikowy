import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog: MatDialog, private authService: AuthService, private userService: UserService) { }

  loggedUser: User;

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

  logout() {
    this.authService.logout();
    this.loggedUser = null;
  }

  loadLoggedInUser(): void {
    this.userService.getCurrentUserDetails().subscribe(user => {
      this.loggedUser = user;
    });
  }

}
