import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RequesterService } from './requester.service';
import { StorageService } from './storage.service';
import { NotificatorService } from './notificator.service';
import { AuthService } from './auth.service';
import { SearchService } from './search.service';
import { AnonymousRouteActivatorService } from './route-guards/anonymous-route-activator.service';
import { AuthRouteActivatorService } from './route-guards/auth-route-activator.service';
import { AdmnOnlyActivatorService } from './route-guards/admin-only-route-activator.service';

@NgModule({
  providers: [
    RequesterService,
    StorageService,
    NotificatorService,
    AuthService,
    SearchService,
    AuthRouteActivatorService,
    AnonymousRouteActivatorService, 
    AdmnOnlyActivatorService
  ]
})
export class CoreModule {
  public constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('Core module is already provided!');
    }
  }
}
