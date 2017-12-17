import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { GroupService } from '../../../services/group.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent {

  email: string;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);


  constructor(public dialogRef: MatDialogRef<AddUserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
   private groupService: GroupService) { }

  public sendAddUserRequest() {
    console.log(this.email, this.data.groupName);
    this.groupService.addUserToGroup(this.email, this.data.groupName).subscribe(response => {
      this.dialogRef.close('Dodano!');
    });
  }
}
