import { MapService } from 'src/app/core/map.service';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit,
  Input,
  ViewChild
} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DevicesService } from '../services/devices.service';
import { ToastrService } from 'ngx-toastr';
import { DeviceModel } from '../models/device.model';
import { МodalComponent } from 'src/app/shared/modal/modal.component';

@Component({
  selector: 'app-device-add',
  templateUrl: './device-add.component.html',
  // templateUrl: './temp.html',
  styleUrls: ['./device-add.component.css']
})
export class DeviceAddComponent implements OnInit, AfterViewInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly devicesService: DevicesService,
    private readonly notificator: ToastrService,
    private readonly mapService: MapService
  ) {}

  addDeviceForm: FormGroup;
  closeResult: string;
  title: string;
  @Input() isAddDevice: boolean;
  @Input() devid: string;
  
  @Output() public newDevice = new EventEmitter<FormGroup>();

  @ViewChild(МodalComponent) public modal: МodalComponent;
  public emitNewDeviceAddedEvent(value): void {
    this.newDevice.emit(value);
  }

  ngOnInit() {
    console.log(this.isAddDevice)

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
  }

  ngAfterViewInit(): void {
    // console.log('AfterView Init');
    // console.log('comp after view', document.getElementById('mapid'+this.devid))
    //  const defaultLatLon = [42.698289, 23.324640];

    // console.log(`dev-add,afterView: ima li map?${'mapid'+this.devid} `+ document.getElementById('mapid'+this.devid));
    //   if (this.mapService.getMap) {
    //     const mapId = 'mapid'+this.devid;
    //     this.mapService.initMap(mapId, defaultLatLon, 13);
    //   }

    //console.log(this.title)
     this.title = this.isAddDevice ? 'Edit Device' : 'New Device' ;

 

  }

  loadDeviceModal() {
    this.modal.open();

    this.mapService.destroy();

    const defaultLatLon = [42.698289, 23.324640];
    if (!this.mapService.getMap) {
      const mapId = `mapid${this.devid}`;
      this.mapService.initMap(mapId, defaultLatLon, 13);
    }

     this.mapService.getMap.on('click', (e) => {
        this.getLonLat(e);
      });


  }
  addDevice() {
    this.devicesService.addDevice(this.addDeviceForm.value).subscribe(
       () => {
         this.notificator.success('Device added successfully!');
         this.emitNewDeviceAddedEvent(this.addDeviceForm.value);
         this.modal.close();
       },
       error => {
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
