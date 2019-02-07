import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { AnonymousRouteActivatorService } from '../core/route-guards/anonymous-route-activator.service';
import { RegisterComponent } from './register/register.component';
import { LengthDirective } from '../directives/length.directive';

const ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AnonymousRouteActivatorService]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AnonymousRouteActivatorService]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    LengthDirective,
  ],
  exports: [LoginComponent],
})
export class AuthModule { }
