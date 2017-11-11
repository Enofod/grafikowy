import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {
  email: string;
  password: string;
  passwordHide = true;

  constructor(private authService: AuthService, public dialogRef: MatDialogRef<LoginDialogComponent>) { }

  authenticate(): void {
    this.authService.authenticate(this.email, this.password).subscribe(validAuthentication => {
      if (validAuthentication) {
        this.dialogRef.close('Zalogowano!');
      }
    },
      err => {
        console.log('QPA');
      }
    );
  }
}
