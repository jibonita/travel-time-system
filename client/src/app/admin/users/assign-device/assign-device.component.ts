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
  @Input() user: string;

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
    // get already assigned devices fro this user
    //console.log(this.user);
    
    // this.devicesService.getAllUserAssignedDevices(this.user).subscribe(
    //   (result) => {
    // });


    const name = this.formBuilder.control('', [Validators.required]);
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
        this.notificator.success('Devices assigned successfully!');
        this.modalService.dismissAll();
      },
      error => {
        console.log(error);
        //this.notificator.error(error.message, 'Device add failed!');
      }
    );
  }


}
