import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { GroupService } from '../../../services/group.service';

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
   private groupService: GroupService) { }

  public sendRemoveUserRequest() {
    console.log(this.email, this.data.groupName);
    this.groupService.removeUserFromGroup(this.email, this.data.groupName).subscribe(response => {
      this.dialogRef.close('Usunięto!');
    });
  }
}
