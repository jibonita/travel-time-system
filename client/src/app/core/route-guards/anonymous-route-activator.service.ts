import { AuthService } from '../auth.service';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificatorService } from 'src/app/core/notificator.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AnonymousRouteActivatorService implements CanActivate {
  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly notificator: NotificatorService
  ) {}

  public canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn$.pipe(
      map((isLogged: boolean) => {
        if (isLogged) {
          this.router.navigate(['/home']);
          this.notificator.error(
            'You must not be logged-in in order to access this page!'
          );
        }

        return !isLogged;
      })
    );
  }
}
