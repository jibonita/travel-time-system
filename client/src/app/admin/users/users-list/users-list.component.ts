import { UserModel } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services/users-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificatorService } from 'src/app/core/notificator.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html'
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

  deleteUser(email): void {
    this.usersService.deleteUser(email).subscribe(
      () => {
        this.notificator.success('User deleted successfully!');
      },
      error => {
        console.log(error);
        this.notificator.error(error.error.message, 'You cant delete yourself');
      }
    );
  }
}
