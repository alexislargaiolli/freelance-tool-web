import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrentCompanyInterceptor } from '@core/interceptors/current-company.interceptor';
import { Invoice } from '@models';
import { APIModelRepository } from './api-model.repository';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService extends APIModelRepository<Invoice> {

  constructor(protected _httpClient: HttpClient) {
    super(_httpClient, `/${CurrentCompanyInterceptor.KEYWORD}/invoices`);
  }

  load() {
    return super.load(`${this._url}?join=userFacturationAddress&join=customerFacturationAddress`);
  }

  loadOne(id: number) {
    return super.loadOne(id, `${this._url}/${id}?join=userFacturationAddress&join=customerFacturationAddress`);
  }

}
