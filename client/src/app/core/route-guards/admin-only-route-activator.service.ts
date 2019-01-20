import { AuthService } from '../auth.service';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificatorService } from 'src/app/core/notificator.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class AdmnOnlyActivatorService implements CanActivate {
  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly notificator: NotificatorService
  ) {}

  public canActivate(): Observable<boolean> {
    return this.authService.isAdmin$.pipe(
      tap((isAdmin: boolean) => {
        if (!isAdmin) {
          this.router.navigate(['/home']);
          this.notificator.error(
            'Accessed only by admin!'
          );
        }
      })
    );
  }
}
