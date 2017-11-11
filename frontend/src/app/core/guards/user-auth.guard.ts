import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from '../components/header/login-dialog/login-dialog.component';
import { AuthService } from '../services/auth.service';
import 'rxjs/add/observable/of';

@Injectable()
export class UserAuthGuard implements CanActivate {

  constructor(private dialog: MatDialog, private authService: AuthService) { }

  canActivate(): Observable<boolean> {
    if (this.authService.isTokenExpired()) {
      const dialogRef = this.dialog.open(LoginDialogComponent, {
        width: '450px'
      });
      return dialogRef.afterClosed().map(result => {
        return this.authService.isUserOrAdmin();
      });
    }
    return Observable.of(true);
  }
}
