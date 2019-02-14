import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { InvoicesService } from '@core/services/invoices.service';

@Injectable({
  providedIn: 'root'
})
export class TriggerLoadInvoicesGuard implements CanActivate {

  constructor(private _invoices: InvoicesService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this._invoices.load().subscribe();
    return true;
  }
}
