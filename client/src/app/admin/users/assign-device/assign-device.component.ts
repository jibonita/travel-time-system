import { DevicesService } from './../../devices/services/devices.service';
import { Component, OnInit } from '@angular/core';
import { DeviceModel } from '../../devices/models/device.model';
import { NotificatorService } from 'src/app/core/notificator.service';

@Component({
  selector: 'app-assign-device',
  templateUrl: './assign-device.component.html',
  styleUrls: ['./assign-device.component.css']
})
export class AssignDeviceComponent implements OnInit {
  deviceList: DeviceModel[] = [];

  constructor(
    private readonly devicesService: DevicesService,
    private readonly notificator: NotificatorService
  ) { }

  ngOnInit() {
    this.devicesService.getAllDevices().subscribe(
      (result) => {
        this.deviceList = result;
    });
  }

}
