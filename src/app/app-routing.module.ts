import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RestrictedComponent } from './layout/restricted/restricted.component';
import { UnrestrictedComponent } from './layout/unrestricted/unrestricted.component';
import { OrgResolverService } from './org/org-resolver.service';
import { StartComponent } from './org/start/start.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/start',
    pathMatch: 'full'
  },
  {
    path: 'start',
    component: StartComponent
  },
  {
    path: ':slug',
    component: UnrestrictedComponent,
    resolve: {
      org: OrgResolverService
    },
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
    ]
  },
  {
    path: ':slug',
    component: RestrictedComponent,
    canActivate: [AuthGuard],
    resolve: {
      org: OrgResolverService
    },
    children: [
      {
        path: 'time-track',
        loadChildren: () => import('./time-track/time-track-routing.module').then(m => m.TimeTrackRoutingModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
