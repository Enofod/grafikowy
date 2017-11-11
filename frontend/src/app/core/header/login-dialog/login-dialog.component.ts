import {Component, Inject} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {
  hide = true;
  emailFormControl: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
   }

}
