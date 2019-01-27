import { AuthService } from '../auth.service';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificatorService } from 'src/app/core/notificator.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthRouteActivatorService implements CanActivate {
  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly notificator: NotificatorService
  ) {}

  public canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn$.pipe(
      tap((isLogged: boolean) => {
        if (!isLogged) {
          this.router.navigate(['/auth/login']);
          this.notificator.error(
            'You must be logged-in in order to see this page!'
          );
        }
      })
    );
  }
}
