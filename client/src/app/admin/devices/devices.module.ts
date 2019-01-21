import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesRoutingModule } from './devices-routing.module';
import { DevicesListComponent } from './devices-list/devices-list.component';
import { DeviceAddComponent } from './device-add/device-add.component';
import { SentenceCasePipe } from 'src/app/pipes/sentence-case.pipe';

@NgModule({
  declarations: [DevicesListComponent, DeviceAddComponent],
  imports: [
    CommonModule,
    DevicesRoutingModule,
    ReactiveFormsModule
  ]
})
export class DevicesModule { }
