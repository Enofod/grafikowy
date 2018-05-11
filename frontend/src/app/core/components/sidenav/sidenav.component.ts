import { Component, OnInit, ViewEncapsulation, NgZone } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { MatDialog } from '@angular/material';
import { ThemeService } from '../../services/theme.service';
import { SidenavService } from '../../services/sidenav.service';
import { AddGroupDialogComponent } from './add-group-dialog/add-group-dialog.component';
import { setTimeout } from 'timers';

declare var require: any;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styles: [require('./sidenav.component.scss')]
})
export class SidenavComponent implements OnInit {

  loggedUser: User;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private themeService: ThemeService,
    private sidenavService: SidenavService,
    private zone: NgZone) { }

  ngOnInit() {
    this.loadLoggedInUser();
  }

  loadLoggedInUser(): void {
    this.userService.getCurrentUserDetails().subscribe(user => {
      this.zone.run(() => {
        this.loggedUser = user;
        if (this.loggedUser !== null) {
          this.sidenavService.open();
        }
      });
    });
  }

  closeNavbar() {
    this.sidenavService.close();
  }

  openAddGroupDialog(): void {
    const dialogRef = this.dialog.open(AddGroupDialogComponent, {
      width: '450px',
      data: { userEmail: this.loggedUser.email },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadLoggedInUser();
    });
  }


  isDarkTheme() {
    return this.themeService.isDarkTheme();
  }


}
