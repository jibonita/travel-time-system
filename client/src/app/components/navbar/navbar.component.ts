import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NotificatorService } from 'src/app/core/notificator.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public DEFAULT_SEARCH = 'Nelson Mandela';
  public SEARCH_PLACEHOLDER = 'Search Posts..';

  public isLoggedIn: boolean;
  public isAdmin: boolean;
  private loginSubscription: Subscription;

  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly notificator: NotificatorService
  ) {}

  public get searchCallback(): () => void {
    // if you are going to pass a function to an input field
    // the function will lose its context - bind it
    return this.searchNavigationCallback.bind(this);
  }

  public ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(
      isLogged => (this.isLoggedIn = isLogged)
    );
    this.authService.isAdmin$.subscribe(
      isAdmin => (this.isAdmin = isAdmin)
    );
  }

  public ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }

  public logout(): void {
    this.authService.logoutUser().subscribe(() => {
      this.router.navigate(['/home']);
      // this.notificator.success('Logged out successfully!');
    });
  }

  private searchNavigationCallback(): void {
    this.router.navigate(['/posts']);
  }
}
