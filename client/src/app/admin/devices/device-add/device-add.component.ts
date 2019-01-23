import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DevicesService } from '../services/devices.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-device-add',
  templateUrl: './device-add.component.html',
  styleUrls: ['./device-add.component.css']
})
export class DeviceAddComponent implements OnInit {
  addDeviceForm: FormGroup;
  closeResult: string;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly devicesService: DevicesService,
    private readonly notificator: ToastrService,
    ) {}

  private addDevice() {
    this.devicesService.addDevice(this.addDeviceForm.value).subscribe(
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnInit() {
    const name = this.formBuilder.control('Palacio Valdes, Salamanca', [Validators.required]);
    const longitude = this.formBuilder.control('40.971409', [Validators.required]);
    const latitude = this.formBuilder.control(' -5.669503', [Validators.required]);
    this.addDeviceForm = this.formBuilder.group({
      name,
      longitude,
      latitude
    });
  }

}
