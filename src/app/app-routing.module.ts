import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { IndexComponent } from './org/index/index.component';
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
    component: IndexComponent,
    resolve: {
      org: OrgResolverService
    },
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'time-track',
        loadChildren: () => import('./time-track/time-track-routing.module').then(m => m.TimeTrackRoutingModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
