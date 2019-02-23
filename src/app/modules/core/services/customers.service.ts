import { Injectable } from '@angular/core';
import { Customer } from 'app/models/customer.model';
import { APIModelRepository } from './api-model.repository';
import { HttpClient } from '@angular/common/http';
import { CurrentCompanyInterceptor } from '@core/interceptors/current-company.interceptor';
import { UserCompaniesService } from './user-companies.service';
import { filter, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomersService extends APIModelRepository<Customer> {

  constructor(protected _httpClient: HttpClient, private _companyService: UserCompaniesService) {
    super(_httpClient, `/${CurrentCompanyInterceptor.KEYWORD}/customers`);
  }

  initialize() {
    this._companyService.currentCompany$.pipe(
      filter(c => c != null),
      mergeMap(c => this.load())
    ).subscribe();
  }

  load() {
    return super.load(`${this._url}?join=facturationAddress`);
  }

  loadOne(id: number) {
    return super.loadOne(id, `${this._url}/${id}?join=facturationAddress`);
  }

}
