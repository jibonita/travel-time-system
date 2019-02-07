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

  public getAllUserAssignedDevices(id): Observable<DeviceModel[]> {
    return this.requester.get('http://localhost:3000/devices/assigned/' + id);
  }

  public addDevice(device: DeviceModel): Observable<DeviceModel[]> {
    return this.requester.post('http://localhost:3000/devices', JSON.stringify(device));
  }

  public assignDevice(user, devices): Observable<any> {
    const assignDeviceDTO = {
      'user': user,
      'devices': devices
    };
    return this.requester.post('http://localhost:3000/devices/assign', JSON.stringify(assignDeviceDTO));
  }

  public editDevice(id, device: DeviceModel) {
    return this.requester.put(`http://localhost:3000/devices/${id}`, JSON.stringify(device));
  }

  public deleteDevice(id): Observable<DeviceModel[]> {
    return this.requester.delete('http://localhost:3000/devices/' + id);
  }

}
