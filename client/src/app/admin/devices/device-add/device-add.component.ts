import { MapService } from 'src/app/core/map.service';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit,
  Input
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
  title: string;
  @Input() isAddDevice: boolean;
  //action = this.isAddDevice ? 'New Device' : 'Edit Device';
  
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

  ngOnInit() {
    const name = this.formBuilder.control(
      this.isAddDevice ? this.addDevice.name : ''
      , [Validators.required]);
    const longitude = this.formBuilder.control('', [Validators.required]);
    const latitude = this.formBuilder.control('', [Validators.required]);
    this.addDeviceForm = this.formBuilder.group({
      name,
      longitude,
      latitude
    });
    
    console.log(this.isAddDevice)
  }

  ngAfterViewInit(): void {
    this.title = this.isAddDevice ? 'Edit Device' : 'New Device' ;
    this.mapService.getMap.on('click', (e) => {
      this.getLonLat(e);
    });
  }

  addDevice() {
    this.devicesService.addDevice(this.addDeviceForm.value).subscribe(
       () => {
         // this.notificator.success('Device added successfully!');
         this.emitNewDeviceAddedEvent(this.addDeviceForm.value);
         // TODO: close modal
       },
       error => {
         console.log(error);
         this.notificator.error(error.message, 'Device add failed!');
       }
     );
   }

  getLonLat(event) {
    const [lat, lon] = this.mapService.getMapLatLon(event);

    this.mapService.addMarker([lat, lon]);
    this.addDeviceForm.controls['latitude'].setValue(lat.toString());
    this.addDeviceForm.controls['longitude'].setValue(lon.toString());
  }
}
