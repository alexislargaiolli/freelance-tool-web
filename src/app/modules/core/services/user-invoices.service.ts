import { Injectable } from '@angular/core';
import { Invoice } from '@models';
import { APIModelRepository } from './api-model.repository';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth/services/auth.service';
import { SessionService } from '@auth/services/session.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInvoicesService extends APIModelRepository<Invoice> {

  constructor(protected _httpClient: HttpClient, private _authService: AuthService, private _sessionService: SessionService) {
    super(_httpClient, '/me/invoices');
  }

  create(invoice: Invoice) {
    invoice.user = {
      id: this._sessionService.user.id
    };
    return super.create(invoice);
  }

  loadOne(id: number): Observable<Invoice> {
    const url = `${this._url}/${id}?join=userFacturationAddress&join=customerFacturationAddress`;
    return super.loadOne(id, url);
  }

}
