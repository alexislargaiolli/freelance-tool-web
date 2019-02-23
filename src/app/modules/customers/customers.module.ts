import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CustomersRoutingModule
  ],
  declarations: [
    CustomersComponent, CustomerListComponent, CustomerFormComponent
  ]
})
export class CustomersModule { }
