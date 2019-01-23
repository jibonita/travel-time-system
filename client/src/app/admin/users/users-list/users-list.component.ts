import { UserModel } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services/users-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit {
  regForm: FormGroup;
  usersList: UserModel[] = [];
  notificator: any;
  constructor(
    private readonly usersService: UserDataService,
    private formBuilder: FormBuilder
    ) {}

  ngOnInit() {
    this.usersService.getAllUsers().subscribe(
      (result) => {
        this.usersList = result;
        console.log(this.usersList.length);
      }
    );
  }

  deleteUser(): void {
    this.regForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required])
    });

    this.usersService.deleteUser(this.regForm.value).subscribe(
      () => {
        this.notificator.success('User deleted successfully!');
      },
      error => {
        console.log(error);
        this.notificator.error(error.error.message, 'Registration failed!');
      }
    );
  }
}
