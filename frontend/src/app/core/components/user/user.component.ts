import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  loggedUser: User;

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit() {
    this.userService.getUserByEmail(this.authService.getUserEmail()).subscribe(user => {
      this.loggedUser = user;
    });
  }

}
