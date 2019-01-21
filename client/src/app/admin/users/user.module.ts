import { BoldMeDirective } from '../../directives/bold.directive';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDataService } from './services/users-data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UsersListComponent,
    BoldMeDirective,
  ],
  imports: [SharedModule, UserRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [UserDataService]
})
export class UserModule { }
