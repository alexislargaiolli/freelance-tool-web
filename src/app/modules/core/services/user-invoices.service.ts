import { Injectable } from '@angular/core';
import { Invoice } from '@models';
import { APIModelRepository } from './api-model.repository';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserInvoicesService extends APIModelRepository<Invoice> {

  constructor(protected _httpClient: HttpClient, private _authService: AuthService) {
    super(_httpClient, '/me/invoices');
  }

}
