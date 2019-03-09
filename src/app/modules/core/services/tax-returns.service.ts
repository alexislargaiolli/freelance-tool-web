import { Injectable } from '@angular/core';
import { TaxReturn } from 'app/models/tax-returns.model';
import { APIModelRepository } from './api-model.repository';
import { HttpClient } from '@angular/common/http';
import { CurrentCompanyInterceptor } from '@core/interceptors/current-company.interceptor';

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

}
