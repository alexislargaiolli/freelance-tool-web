import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TaxReturnsComponent } from './components/tax-returns/tax-returns.component';
import { TaxReturnsRoutingModule } from './tax-returns-routing.module';
import { TaxReturnListComponent } from './components/tax-return-list/tax-return-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaxReturnFormComponent } from './components/tax-return-form/tax-return-form.component';
import { SelectInvoiceDialogComponent } from './components/select-invoice-dialog/select-invoice-dialog.component';

@NgModule({
  imports: [
    SharedModule, TaxReturnsRoutingModule, FormsModule, ReactiveFormsModule
  ],
  declarations: [TaxReturnsComponent, TaxReturnListComponent, TaxReturnFormComponent, SelectInvoiceDialogComponent],
  entryComponents: [SelectInvoiceDialogComponent]
})
export class TaxReturnsModule { }
