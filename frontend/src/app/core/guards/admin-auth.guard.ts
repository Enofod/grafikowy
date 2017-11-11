import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from '../components/header/login-dialog/login-dialog.component';
import { AuthService } from '../services/auth.service';
import 'rxjs/add/observable/of';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  canActivate(): Observable<boolean> {
    if (!this.authService.isUserOrAdmin() || this.authService.isTokenExpired()) { // not logged in or token expired
      const dialogRef = this.dialog.open(LoginDialogComponent, {
        width: '450px'
      });
      return dialogRef.afterClosed().map(result => {
        return this.handleIsAdmin(this.authService.isAdmin());
      });
    }

    return Observable.of(this.handleIsAdmin(this.authService.isAdmin()));
  }

  private handleIsAdmin(isAdmin: boolean): boolean {
    if (!isAdmin) {
      this.snackBar.open('Ta strona dostepna jest tylko dla administratorow!', 'OK', { duration: 2500 });
    }
    return isAdmin;
  }
}
