import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { ThemeService } from '../../services/theme.service';
import { SidenavService } from '../../services/sidenav.service';

declare var require: any;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styles: [require('./sidenav.component.scss')]
})
export class SidenavComponent implements OnInit {

  loggedUser: User;

  constructor(
    private userService: UserService,
    private themeService: ThemeService,
    private sidenavService: SidenavService) { }

  ngOnInit() {
    this.loadLoggedInUser();
  }

  loadLoggedInUser(): void {
    this.userService.getCurrentUserDetails().subscribe(user => {
      this.loggedUser = user;
    });
  }

  closeNavbar() {
    this.sidenavService.close();
  }

  isDarkTheme() {
    return this.themeService.isDarkTheme();
  }


}
