import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { ThemeService } from '../../services/theme.service';

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
    private themeService: ThemeService) { }

  ngOnInit() {
    this.loadLoggedInUser();
  }

  loadLoggedInUser(): void {
    this.userService.getCurrentUserDetails().subscribe(user => {
      this.loggedUser = user;
    });
  }

  isDarkTheme() {
    return this.themeService.isDarkTheme();
  }


}
