import { DeviceModel } from './../models/device.model';
import { DevicesService } from './../../devices/services/devices.service';
import { Component, OnInit, ViewChild, ElementRef, Host, Input } from '@angular/core';
import { NotificatorService } from 'src/app/core/notificator.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersListComponent } from '../users-list/users-list.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-assign-device',
  templateUrl: './assign-device.component.html',
  styleUrls: ['./assign-device.component.css']
})
export class AssignDeviceComponent implements OnInit {
  deviceList: any[] = [];
  addMultipleDevicesForm: FormGroup;
  @Input() user: any;

  closeResult: string;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly devicesService: DevicesService,
    private readonly notificator: NotificatorService,

    private readonly modalService: NgbModal,
  ) {  }

  ngOnInit() {
    this.devicesService.getAllDevices().subscribe(
      (result) => {
        this.deviceList = result;
    });

    const name = this.formBuilder.control('', [Validators.required]);
    // const longitude = this.formBuilder.control('40.971409', [Validators.required]);
    // const latitude = this.formBuilder.control(' -5.669503', [Validators.required]);
    this.addMultipleDevicesForm = this.formBuilder.group({
    });
  }


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed`;
    });
  }

  addMultipleDevices(devices) {
    const devicesID = [];
    devices.forEach(element => {
      if (element.isActive === true) {
        const device = element.id;

        devicesID.push(device);
      }
    });
    this.devicesService.assignDevice(this.user, devicesID).subscribe(
      () => {
        this.notificator.success('Device added successfully!');
        // close modal
      },
      error => {
        console.log(error);
        //this.notificator.error(error.message, 'Device add failed!');
      }
    );
  }


}
