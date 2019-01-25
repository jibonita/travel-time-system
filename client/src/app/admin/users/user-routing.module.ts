import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UsersListComponent } from './users-list/users-list.component';
import { AdmnOnlyActivatorService } from 'src/app/core/route-guards/admin-only-route-activator.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
   component: UsersListComponent,
   canActivate: [AdmnOnlyActivatorService]
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
