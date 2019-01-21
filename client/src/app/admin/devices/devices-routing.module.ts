import { DevicesListComponent } from './devices-list/devices-list.component';
import { AdmnOnlyActivatorService } from './../../core/route-guards/admin-only-route-activator.service';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DeviceAddComponent } from './device-add/device-add.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DevicesListComponent,
    canActivate: [AdmnOnlyActivatorService]
 },
 {
    path: 'add',
    component: DeviceAddComponent,
    canActivate: [AdmnOnlyActivatorService]
 },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicesRoutingModule {}
