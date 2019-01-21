import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
//import { MaterialSharedModule } from '../shared/material-shared.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { AnonymousRouteActivatorService } from '../core/route-guards/anonymous-route-activator.service';
import { SentenceCasePipe } from '../pipes/sentence-case.pipe';
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
]

@NgModule({
  imports: [
    CommonModule,
    //MaterialSharedModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    SentenceCasePipe,
    LengthDirective,
                ],
})
export class AuthModule { }
