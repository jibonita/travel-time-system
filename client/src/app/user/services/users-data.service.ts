import { UserModel } from './../models/user.model';
import { Injectable } from '@angular/core';
import { RequesterService } from 'src/app/core/requester.service';
import { Observable } from 'rxjs';

@Injectable()
export class UserDataService {
  public constructor(private readonly requester: RequesterService) {}

  public getAllUsers(): Observable<UserModel[]> {
    return this.requester.get('http://localhost:3000/users');
  }
}
