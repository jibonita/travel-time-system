import { DevicesService } from './../../devices/services/devices.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NotificatorService } from 'src/app/core/notificator.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { МodalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'app-assign-device',
  templateUrl: './assign-device.component.html',
  styleUrls: ['./assign-device.component.css']
})
export class AssignDeviceComponent implements OnInit {
  deviceList: any[] = [];
  addMultipleDevicesForm: FormGroup;
  closeResult: string;

  @Input() user: string;

  @ViewChild(МodalComponent) public modal: МodalComponent;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly devicesService: DevicesService,
    private readonly notificator: NotificatorService,
  ) {  }

  ngOnInit() {
    this.devicesService.getAllDevices().subscribe(
      (result) => {
        this.deviceList = result;
    });
    this.addMultipleDevicesForm = this.formBuilder.group({
    });
  }


  // open(content) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(() => {
  //     // this.closeResult = `Closed with: ${result}`;
  //   }, () => {
  //     // this.closeResult = `Dismissed`;
  //   });
  // }

  addMultipleDevices(devices) {
    this.modal.close();
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
      },
      error => {
        console.log(error);
        this.notificator.error(error.message, 'Devices assign failed!');
      }
    );
  }


}
