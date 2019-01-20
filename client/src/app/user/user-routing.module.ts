//import { RegisterComponent } from './register/register.component';
//import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UsersListComponent } from './users-list/users-list.component';
import { AuthRouteActivatorService } from '../core/route-guards/auth-route-activator.service';
import { AnonymousRouteActivatorService } from '../core/route-guards/anonymous-route-activator.service';

const routes: Routes = [
  { path: '', redirectTo: '/users/all', pathMatch: 'full' },
  {
    path: 'all',
    component: UsersListComponent,
    canActivate: [AuthRouteActivatorService]
  },

  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   canActivate: [AnonymousRouteActivatorService]
  // },
  // {
  //   path: 'register',
  //   component: RegisterComponent,
  //   canActivate: [AnonymousRouteActivatorService]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
