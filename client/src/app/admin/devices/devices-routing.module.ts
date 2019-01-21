import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
//   {
//     path: '',
//     pathMatch: 'full',
//    component: DevicesListComponent,
//    canActivate: [AuthRouteActivatorService]
//  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicesRoutingModule {}
