import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { TriggerLoadInvoicesGuard } from './guards/trigger-load-invoices.guard';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { TriggerLoadInvoiceGuard } from './guards/trigger-load-invoice.guard';

const routes: Routes = [
    {
        path: '',
        component: InvoiceListComponent,
        canActivate: [TriggerLoadInvoicesGuard]
    },
    {
        path: ':invoiceId',
        component: InvoiceFormComponent,
        canActivate: [TriggerLoadInvoiceGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InvoiceRoutingModule { }
