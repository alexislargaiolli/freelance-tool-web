import { Injectable } from '@angular/core';
import { InvoicesService } from './invoices.service';
import { Observable, combineLatest } from 'rxjs';
import { TurnOverInfo } from 'app/models/turnover-info.model';
import { Period, Invoice, InvoiceState } from '@models';
import { map } from 'rxjs/operators';
import { DashboardSummary } from 'app/models/dashboard-summary.model';
import { TaxReturnsService } from './tax-returns.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private _invoicesService: InvoicesService,
    private _taxReturns: TaxReturnsService
  ) { }

  public summary(period$: Observable<Period>): Observable<DashboardSummary> {
    const taxReturns$ = this._taxReturns.itemsByPeriod(period$);
    const invoices$ = this._invoicesService.getInvoiceByPeriod(period$);
    return combineLatest(invoices$, taxReturns$).pipe(
      map(([invoices, taxReturns]) => {
        const result: DashboardSummary = {
          turnover: {
            total: 0,
            totalDutyFree: 0,
            totalWithoutPortage: 0,
            totalWithoutPortageDutyFree: 0
          },
          portage: {
            total: 0,
            totalDutyFree: 0,
            totalSalary: 0
          },
          profit: {
            total: 0,
            totalTax: 0,
            totalDutyFree: 0
          }
        };
        invoices.forEach(invoice => {
          if (invoice.state === InvoiceState.SENT) {
            if (invoice.portage) {
              result.portage.total += invoice.amount;
              result.portage.totalDutyFree += invoice.amountDutyFree;
              result.portage.totalSalary += invoice.portageSalary;
            } else {
              result.turnover.totalWithoutPortage += invoice.amount;
              result.turnover.totalWithoutPortageDutyFree += invoice.amountDutyFree;
            }
            result.turnover.total += invoice.amount;
            result.turnover.totalDutyFree += invoice.amountDutyFree;
          }
        });
        taxReturns.forEach(taxReturn => {
          result.profit.totalTax += taxReturn.taxAmount;
        });
        result.profit.total = result.turnover.totalWithoutPortageDutyFree + result.portage.totalSalary;
        result.profit.totalDutyFree = result.profit.total - result.profit.totalTax;

        return result;
      })
    );
  }

}
