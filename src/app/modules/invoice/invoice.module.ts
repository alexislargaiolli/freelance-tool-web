import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoiceFormUserInfoComponent } from './components/invoice-form-user-info/invoice-form-user-info.component';
import { InvoiceFormCustomerInfoComponent } from './components/invoice-form-customer-info/invoice-form-customer-info.component';
import { InvoiceItemFormComponent } from './components/invoice-item-form/invoice-item-form.component';

@NgModule({
  declarations: [
    InvoiceListComponent, InvoiceFormComponent, InvoiceFormUserInfoComponent, InvoiceFormCustomerInfoComponent, InvoiceItemFormComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    InvoiceRoutingModule
  ]
})
export class InvoiceModule { }
