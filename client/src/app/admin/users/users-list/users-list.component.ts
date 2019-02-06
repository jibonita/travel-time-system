import { UserModel } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services/users-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificatorService } from 'src/app/core/notificator.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  usersList: UserModel[] = [];
  constructor(
    private readonly usersService: UserDataService,
    private readonly notificator: NotificatorService
    ) {}

  ngOnInit() {
    this.usersService.getAllUsers().subscribe(
      (result) => {
        this.usersList = result;
      }
    );
  }

  updateUsersList(user) {
    this.usersList.push(user);
  }

  deleteUser(user): void {
    this.usersService.deleteUser(user).subscribe(
      () => {
        this.notificator.success('User deleted successfully!');
        this.usersList = this.usersList.filter((vUser ) => {
          return vUser.email !== user.email;
        });
      },
      error => {
        console.log(error);
        this.notificator.error(error.error.message, 'You cant delete yourself');
      }
    );
  }
}
