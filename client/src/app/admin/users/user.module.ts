import { DevicesModule } from './../devices/devices.module';
import { BoldMeDirective } from '../../directives/bold.directive';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDataService } from './services/users-data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterTechUserComponent } from './register-tech-user/register-tech-user.component';
import { AssignDeviceComponent } from './assign-device/assign-device.component';
import { DevicesService } from '../devices/services/devices.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    UsersListComponent,
    BoldMeDirective,
    RegisterTechUserComponent,
    AssignDeviceComponent,
  ],
  imports: [SharedModule, UserRoutingModule, FormsModule, ReactiveFormsModule, DevicesModule, NgbModule],
  providers: [UserDataService]
})
export class UserModule { }
