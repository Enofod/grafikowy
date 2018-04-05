import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { GroupService } from '../../../../features/services/group.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-group-dialog',
  templateUrl: './add-group-dialog.component.html',
  styleUrls: ['./add-group-dialog.component.css']
})
export class AddGroupDialogComponent {

  groupName: string;

  constructor(public dialogRef: MatDialogRef<AddGroupDialogComponent>, private groupService: GroupService, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar) { }

  public sendCreateGroupRequest() {
    this.snackBar.open('Funcjonalnosc jeszcze nie wspierana!', 'OK', { duration: 2500 });
    this.dialogRef.close('Funkcjonalnosc jeszcze nie wspierana!');
  }
}
