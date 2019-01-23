import { DeviceModel } from './../models/device.model';
import { Injectable } from '@angular/core';
import { RequesterService } from '../../../core/requester.service';
import { Observable } from 'rxjs';

@Injectable()
export class DevicesService {
  public constructor(
    private readonly requester: RequesterService,
   // private readonly notificator: ToastrService
    ) {}

  public getAllDevices(): Observable<DeviceModel[]> {
    return this.requester.get('http://localhost:3000/devices');
  }

  public addDevice(device: DeviceModel): Observable<DeviceModel[]> {
    return this.requester.post('http://localhost:3000/devices', JSON.stringify(device));
  }
}
