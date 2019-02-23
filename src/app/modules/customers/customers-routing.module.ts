import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { TriggerLoadCustomerGuard } from './guards/trigger-load-customer.guard';

const routes: Routes = [
    {
        path: '',
        component: CustomersComponent
    },
    {
        path: ':customerId',
        component: CustomerFormComponent,
        canActivate: [TriggerLoadCustomerGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomersRoutingModule { }
