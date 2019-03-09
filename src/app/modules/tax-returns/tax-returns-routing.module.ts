import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxReturnsComponent } from './components/tax-returns/tax-returns.component';
import { TriggerLoadTaxReturnsGuard } from './guards/trigger-load-tax-returns.guard';
import { TaxReturnFormComponent } from './components/tax-return-form/tax-return-form.component';
import { TriggerLoadTaxReturnGuard } from './guards/trigger-load-tax-return.guard';

const routes: Routes = [
    {
        path: '',
        component: TaxReturnsComponent,
        canActivate: [TriggerLoadTaxReturnsGuard]
    },
    {
        path: ':taxReturnId',
        component: TaxReturnFormComponent,
        canActivate: [TriggerLoadTaxReturnGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaxReturnsRoutingModule { }
