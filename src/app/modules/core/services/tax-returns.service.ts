import { Injectable } from '@angular/core';
import { TaxReturn } from 'app/models/tax-returns.model';
import { APIModelRepository } from './api-model.repository';
import { HttpClient } from '@angular/common/http';
import { CurrentCompanyInterceptor } from '@core/interceptors/current-company.interceptor';
import { Period } from '@models';
import * as moment from 'moment';
import { combineLatest, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaxReturnsService extends APIModelRepository<TaxReturn> {

  constructor(protected _httpClient: HttpClient) {
    super(_httpClient, `/${CurrentCompanyInterceptor.KEYWORD}/taxreturns`);
  }

  loadOne(id: number) {
    return super.loadOne(id, `${this._url}/${id}?join=invoices`);
  }

  itemsByPeriod(period$: Observable<Period>) {
    return combineLatest(this.items$, period$, (taxReturns, period) => {
      return taxReturns.filter(taxReturn => moment(taxReturn.periodStartDate).isBetween(period.start, period.end));
    });
  }

}
