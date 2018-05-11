import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MatDialogRef } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { SidenavService } from '../../../services/sidenav.service';
import { SidenavComponent } from '../../sidenav/sidenav.component';


@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {
  email: string;
  password: string;
  passwordHide = true;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(private authService: AuthService,
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private router: Router,
    private snackBar: MatSnackBar,
    private sidenavService: SidenavService,
    private sidenavComponent: SidenavComponent) { }

  authenticate(): void {
    this.authService.authenticate(this.email, this.password).subscribe(validAuthentication => {
      if (validAuthentication) {
        this.dialogRef.close('Zalogowano!');
        this.router.navigate(['/']);
        this.sidenavComponent.loadLoggedInUser();
      }
    },
      err => {
        this.snackBar.open('Niepoprawne dane do logowania!', 'OK', { duration: 2500 });
      }
    );
  }
}
