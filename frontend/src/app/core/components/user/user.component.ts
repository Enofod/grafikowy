import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  loggedUser: User;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getCurrentUserDetails().subscribe(user => {
      console.log(user);
      this.loggedUser = user;
    });
  }

}
