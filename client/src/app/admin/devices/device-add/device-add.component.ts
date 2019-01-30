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
export class DeviceAddComponent implements OnInit {
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

  @ViewChild(МodalComponent) public modal: МodalComponent;

  @Output() public newDevice = new EventEmitter<FormGroup>();
  @Output() public updateDevice = new EventEmitter();

  public emitNewDeviceAddedEvent(value): void {
    this.newDevice.emit(value);
  }

  public emitUpdateDeviceListEvent(value): void {
    this.updateDevice.emit(value);
  }

  ngOnInit() {
    this.title = this.isAddDevice ? 'Edit Device' : 'New Device';

    const name = this.formBuilder.control(
      this.isAddDevice ? this.isAddDevice['name'] : '',
      [Validators.required]
    );
    const longitude = this.formBuilder.control(
      this.isAddDevice ? this.isAddDevice['longitude'] : '',
      [Validators.required]
    );
    const latitude = this.formBuilder.control(
      this.isAddDevice ? this.isAddDevice['latitude'] : '',
      [Validators.required]
    );
    this.addDeviceForm = this.formBuilder.group({
      name,
      longitude,
      latitude
    });
  }

  loadDeviceModal() {
    this.modal.open();

    this.mapService.destroy();

    let latLon = [];
    if (this.isAddDevice) {
      latLon = [
        this.isAddDevice['latitude'],
        this.isAddDevice['longitude']
      ];
    }

    if (!this.mapService.getMap) {
      const mapId = `mapid${this.devid}`;
      this.mapService.initMap(mapId, latLon, 13);
    }

    this.mapService.getMap.on('click', e => {
      this.getLonLat(e);
    });

    if (this.isAddDevice) {
      this.mapService.addMarker([
          this.isAddDevice['latitude'],
          this.isAddDevice['longitude']
        ]);
    }
  }

  addDevice() {
    this.devicesService.addDevice(this.addDeviceForm.value).subscribe(
      (data) => {
        this.notificator.success('Device added successfully!');
        this.emitNewDeviceAddedEvent(data);
        this.modal.close();
      },
      error => {
        this.notificator.error(error.message, 'Device add failed!');
      }
    );
  }

  editDevice() {
    this.modal.close();

    this.devicesService
      .editDevice(this.isAddDevice['id'], this.addDeviceForm.value)
      .subscribe(
        (data) => {
          this.notificator.success('Device updated successfully!');
          this.emitUpdateDeviceListEvent(data);
        },
        error => {
          this.notificator.error(error.message, 'Device Udpdate failed!');
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
