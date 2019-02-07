import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesRoutingModule } from './devices-routing.module';
import { SentenceCasePipe } from 'src/app/pipes/sentence-case.pipe';
import { DevicesListComponent } from './devices-list/devices-list.component';
import { DeviceAddComponent } from './device-add/device-add.component';
import { DevicesService } from './services/devices.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DevicesRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DevicesListComponent, DeviceAddComponent],
  providers: [DevicesService]
})
export class DevicesModule {}
