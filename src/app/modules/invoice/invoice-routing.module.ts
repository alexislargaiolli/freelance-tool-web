import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { TriggerLoadInvoicesGuard } from './guards/trigger-load-invoices.guard';
import { TriggerLoadInvoiceGuard } from './guards/trigger-load-invoice.guard';
import { InvoiceEditionComponent } from './components/invoice-edition/invoice-edition.component';

const routes: Routes = [
    {
        path: '',
        component: InvoiceListComponent,
        canActivate: [TriggerLoadInvoicesGuard]
    },
    {
        path: ':invoiceId',
        component: InvoiceEditionComponent,
        canActivate: [TriggerLoadInvoiceGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InvoiceRoutingModule { }
