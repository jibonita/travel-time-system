import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-device-add',
  templateUrl: './device-add.component.html',
  styleUrls: ['./device-add.component.css']
})
export class DeviceAddComponent implements OnInit {
  addDeviceForm: FormGroup;
  closeResult: string;

  constructor(private modalService: NgbModal,
    private readonly formBuilder: FormBuilder
    ) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
    const deviceName = this.formBuilder.control('', [Validators.required]);
    const longitude = this.formBuilder.control('', [Validators.required]);
    const latitude = this.formBuilder.control('', [Validators.required]);
    this.addDeviceForm = this.formBuilder.group({
      deviceName,
      longitude,
      latitude
    });
  }

}
