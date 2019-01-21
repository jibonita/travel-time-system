import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { RequesterService } from './requester.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserModel } from '../admin/users/models/user.model';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AuthService {
  // look up Persisting user authentication with BehaviorSubject in Angular
  // https://netbasal.com/angular-2-persist-your-login-status-with-behaviorsubject-45da9ec43243

  private readonly isLoggedInSubject$ = new BehaviorSubject<boolean>(
    this.hasToken()
  );

  private readonly isAdminSubject$ = new BehaviorSubject<boolean>(
    this.isAdmin()
  );

  public constructor(
    private readonly storageService: StorageService,
    private readonly requester: RequesterService
  ) {}

  public get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject$.asObservable();
  }
  public get isAdmin$(): Observable<boolean> {
    return this.isAdminSubject$.asObservable();
  }

  public registerUser(user: UserModel): Observable<any> {
    return this.requester.post(
      'http://localhost:3000/register',
      JSON.stringify(user)
    );
  }

  public loginUser(user: UserModel): Observable<any> {
    return this.requester
      .post('http://localhost:3000/login', JSON.stringify(user))
      .pipe(
        tap(token => {
          this.storageService.setItem('token', token);
          this.isLoggedInSubject$.next(true);
          if (this.getDecodedAccessToken(token).isAdmin) {
            this.isAdminSubject$.next(true);
          }
        })
      );
  }

  public logoutUser(): Observable<any> {
    return this.requester.post('http://localhost:3000/logout', null).pipe(
      tap(() => {
        this.storageService.removeItem('token');
        this.isLoggedInSubject$.next(false);
        this.isAdminSubject$.next(false);
      })
    );
  }

  private hasToken(): boolean {
    return !!this.storageService.getItem('token');
  }

  private isAdmin(): boolean {
    const token = this.getDecodedAccessToken(this.storageService.getItem('token'));
    return !!token? token.isAdmin : false;
  }

  private getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }
}
