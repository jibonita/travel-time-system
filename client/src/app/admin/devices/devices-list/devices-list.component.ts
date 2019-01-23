import { DeviceModel } from './../models/device.model';
import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../services/devices.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent implements OnInit {
  devicesList: DeviceModel[];

  constructor(
    private readonly devicesService: DevicesService,
    private readonly notificator: ToastrService,

  ) { }

  ngOnInit() {
    this.devicesService.getAllDevices().subscribe(
      (data) => {
        this.devicesList = data;
      },
      error => {
        this.notificator.error(error.message, 'Add device failed!');
      }
    );
  }

}
