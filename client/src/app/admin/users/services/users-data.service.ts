import { UserEmail } from './../models/user-email.model';
import { UserModel } from './../models/user.model';
import { Injectable } from '@angular/core';
import { RequesterService } from '../../../../app/core//requester.service';
import { Observable } from 'rxjs';

@Injectable()
export class UserDataService {
  public constructor(private readonly requester: RequesterService) {}

  public getAllUsers(): Observable<UserModel[]> {
    return this.requester.get('http://localhost:3000/users');
  }

  public deleteUser(email: UserEmail): Observable<any> {
    return this.requester.post('http://localhost:3000/users/create', JSON.stringify(email));
  }
}
