import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { GroupService } from '../../../services/group.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-remove-user-dialog',
  templateUrl: './remove-user-dialog.component.html',
  styleUrls: ['./remove-user-dialog.component.css']
})
export class RemoveUserDialogComponent {

  email: string;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);


  constructor(public dialogRef: MatDialogRef<RemoveUserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
   private groupService: GroupService,
   private snackBar: MatSnackBar) { }

  public sendRemoveUserRequest() {
    console.log(this.email, this.data.groupName);
    this.snackBar.open('Funcjonalnosc jeszcze nie wspierana!', 'OK', { duration: 2500 });
    this.dialogRef.close('Funkcjonalnosc jeszcze nie wspierana!');
  }
}
