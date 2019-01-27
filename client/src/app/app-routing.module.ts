import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';
import { ServerErrorComponent } from './components/server-error/server-errror.component';
import { AuthRouteActivatorService } from './core/route-guards/auth-route-activator.service';
import { AdmnOnlyActivatorService } from './core/route-guards/admin-only-route-activator.service';
import { ReportsLandingComponent } from './components/reports-landing/reports-landing.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'landing', component: ReportsLandingComponent,
    canActivate: [AuthRouteActivatorService] },
  { path: 'posts',
    loadChildren: './posts/posts.module#PostsModule',
    canActivate: [AdmnOnlyActivatorService]
                },
  { path: 'auth', loadChildren: './auth/auth-routing.module#AuthModule'},
  { path: 'users', loadChildren: './admin/users/user.module#UserModule' },
  { path: 'devices', loadChildren: './admin/devices/devices.module#DevicesModule' },

  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },

  { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
