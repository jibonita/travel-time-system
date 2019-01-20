import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services/users-data.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit {
  constructor(private readonly usersService: UserDataService) {}

  ngOnInit() {
    this.usersService.getAllUsers().subscribe(console.log);
  }
}
