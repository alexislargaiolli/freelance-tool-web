import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth/guards/auth.guard';
import { LayoutComponent } from '@core/components/layout/layout.component';
import { LoginComponent } from '@core/components/login/login.component';
import { CurrentCompanyLoadedGuard } from '@core/guard/current-company-loaded.guard';
import { TriggerLoadCompagniesDataGuard } from '@core/guard/trigger-load-compagnies.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard, TriggerLoadCompagniesDataGuard],
    canActivateChild: [AuthGuard, CurrentCompanyLoadedGuard],
    children: [
      { path: 'dashboard', loadChildren: 'app/modules/dashboard/dashboard.module#DashboardModule', canLoad: [AuthGuard] },
      { path: 'company', loadChildren: 'app/modules/company/company.module#CompanyModule', canLoad: [AuthGuard] },
      { path: 'customers', loadChildren: 'app/modules/customers/customers.module#CustomersModule', canLoad: [AuthGuard] },
      { path: 'tax-returns', loadChildren: 'app/modules/tax-returns/tax-returns.module#TaxReturnsModule', canLoad: [AuthGuard] },
      {
        path: 'invoice',
        loadChildren: 'app/modules/invoice/invoice.module#InvoiceModule',
        canLoad: [AuthGuard]
      },
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
