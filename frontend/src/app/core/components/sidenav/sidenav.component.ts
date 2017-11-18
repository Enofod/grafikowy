import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  loggedUser: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadLoggedInUser();
  }

  loadLoggedInUser(): void {
    this.userService.getCurrentUserDetails().subscribe(user => {
      this.loggedUser = user;
    });
  }

}
