import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesRoutingModule } from './devices-routing.module';
import { DevicesListComponent } from './devices-list/devices-list.component';
import { DeviceAddComponent } from './device-add/device-add.component';
import { SentenceCasePipe } from 'src/app/pipes/sentence-case.pipe';
import { DevicesService } from './services/devices.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [DevicesListComponent, DeviceAddComponent],
  imports: [
    CommonModule,
    SharedModule,
    DevicesRoutingModule,
    ReactiveFormsModule
  ],
  providers: [DevicesService]
})
export class DevicesModule { }
