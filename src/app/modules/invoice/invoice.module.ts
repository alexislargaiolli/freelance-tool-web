import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoiceFormUserInfoComponent } from './components/invoice-form-user-info/invoice-form-user-info.component';

@NgModule({
  declarations: [InvoiceListComponent, InvoiceFormComponent, InvoiceFormUserInfoComponent],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    InvoiceRoutingModule
  ]
})
export class InvoiceModule { }
