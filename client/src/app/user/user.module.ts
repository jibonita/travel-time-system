import { LengthDirective } from './../directives/length.directive';
import { BoldMeDirective } from './../directives/bold.directive';
import { SentenceCasePipe } from './../pipes/sentence-case.pipe';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
//import { RegisterComponent } from './register/register.component';
//import { LoginComponent } from './login/login.component';
import { UserRoutingModule } from './user-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDataService } from './services/users-data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [SharedModule, UserRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [
    //RegisterComponent,
    //LoginComponent,
    UsersListComponent,
    //SentenceCasePipe,
    BoldMeDirective,
   // LengthDirective
  ],
  providers: [UserDataService]
})
export class UserModule { }
