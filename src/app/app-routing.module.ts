import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth/guards/auth.guard';
import { LayoutComponent } from '@core/components/layout/layout.component';
import { LoginComponent } from '@core/components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: 'dashboard', loadChildren: 'app/modules/dashboard/dashboard.module#DashboardModule', canLoad: [AuthGuard] },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
