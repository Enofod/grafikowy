import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MatDialogRef } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
    selector: 'app-register-dialog',
    templateUrl: './register-dialog.component.html',
    styleUrls: ['./register-dialog.component.css']
})
export class RegisterDialogComponent {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    passwordHide = true;

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);

    constructor(private authService: AuthService, public dialogRef: MatDialogRef<RegisterDialogComponent>) { }

    register(): void {
        this.authService.signUp(this.email, this.password, this.firstName, this.lastName, this.phone).subscribe(singUpResponse => {
            this.authService.authenticate(this.email, this.password).subscribe(validAuthentication => {
                if (validAuthentication) {
                    this.dialogRef.close('Zalogowano!');
                }
            });
        },
            err => {
                console.log(err);
            }
        );
    }
}
