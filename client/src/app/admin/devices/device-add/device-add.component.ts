import { MapService } from 'src/app/core/map.service';
import {
  Component,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DevicesService } from '../services/devices.service';
import { ToastrService } from 'ngx-toastr';
import { DeviceModel } from '../models/device.model';

@Component({
  selector: 'app-device-add',
  templateUrl: './device-add.component.html',
  styleUrls: ['./device-add.component.css']
})
export class DeviceAddComponent implements OnInit, AfterViewInit {
 
  addDeviceForm: FormGroup;
  closeResult: string;

  @Output() public newDevice = new EventEmitter<FormGroup>();
  public emitNewDeviceAddedEvent(value): void {
    this.newDevice.emit(value);
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly devicesService: DevicesService,
    private readonly notificator: ToastrService,
    private readonly mapService: MapService
  ) {}

  private addDevice() {
    console.log(this.addDeviceForm.value)
    this.devicesService.addDevice(this.addDeviceForm.value).subscribe(
      () => {
        // this.notificator.success('Device added successfully!');
        this.emitNewDeviceAddedEvent(this.addDeviceForm.value);
        // TODO: close modal
      },
      error => {
        console.log(error);
        // this.notificator.error(error.message, 'Device add failed!');
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
    const name = this.formBuilder.control('Palacio Valdes, Salamanca', [     Validators.required    ]);
    const longitude = this.formBuilder.control('40.971409', [      Validators.required    ]);
    const latitude = this.formBuilder.control(' -5.669503', [      Validators.required    ]);
    this.addDeviceForm = this.formBuilder.group({
      name,
      longitude,
      latitude
    });

  }

  ngAfterViewInit(): void {
    this.mapService.getMap.on('click', (e) => {
      this.getLonLat(e);
    });
  }

  getLonLat(event) {
    const [lat, lon] = this.mapService.getMapLatLon(event);

    this.mapService.addMarker([lat, lon]);
    this.addDeviceForm.controls['latitude'].setValue(lat.toString());
    this.addDeviceForm.controls['longitude'].setValue(lon.toString());
  }
}
