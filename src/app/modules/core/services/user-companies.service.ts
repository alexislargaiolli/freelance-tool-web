import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '@models';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { APIModelRepository } from './api-model.repository';

@Injectable({
  providedIn: 'root'
})
export class UserCompaniesService extends APIModelRepository<Company> {

  private _currentCompany$ = new BehaviorSubject<Company>(null);
  public get currentCompany$(): Observable<Company> { return this._currentCompany$; }
  public get currentCompany(): Company { return this._currentCompany$.value; }

  constructor(protected _httpClient: HttpClient) {
    super(_httpClient, '/me/companies');
  }

  load() {
    return super.load(`${this._url}?join=facturationAddress`).pipe(
      tap(companies => {
        if (companies.length > 0) {
          this._currentCompany$.next(companies[0]);
        }
      })
    );
  }

}
