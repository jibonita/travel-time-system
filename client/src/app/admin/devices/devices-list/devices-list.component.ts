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

  updateList(event) {
    this.devicesList.push(event);
  }

  deleteDevice(device): void {
    this.devicesService.deleteDevice(device.id).subscribe(
      () => {
        const index = this.devicesList.indexOf(device);
        this.devicesList.splice(index, 1);
        this.notificator.success('Device deleted successfully!');
      },
      error => {
        console.log(error);
        this.notificator.error(error.error.message, 'Device already deleted');
      }
    );
  }

  editDevice(device){
    console.log('Edit');
  }

  setDisplay(state){
    return state;
  }
  
}
