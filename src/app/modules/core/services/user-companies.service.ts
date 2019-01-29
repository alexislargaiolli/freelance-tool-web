import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from '@models';
import { APIModelRepository } from './api-model.repository';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import { AuthService } from '@auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserCompaniesService extends APIModelRepository<Company> {

  private _currentCompanyId$ = new BehaviorSubject<number>(null);
  private _currentCompany$: Observable<Company>;
  public get currentCompany$(): Observable<Company> { return this._currentCompany$; }

  constructor(protected _httpClient: HttpClient) {
    super(_httpClient, '/me/companies');
    const currentId$ = this._currentCompanyId$.pipe(filter(id => id != null));
    this._currentCompany$ = combineLatest(this._items$, currentId$, (items, id) => items.get(id));
  }

  load() {
    return super.load(`${this._url}?join=facturationAddress`).pipe(
      tap(companies => {
        if (companies.length > 0) {
          this._currentCompanyId$.next(companies[0].id);
        }
      })
    );
  }

}
