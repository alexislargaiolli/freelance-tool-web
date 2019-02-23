import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { CustomersService } from '@core/services/customers.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TriggerLoadCustomerGuard implements CanActivate {

  constructor(private _customers: CustomersService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const id = next.params.customerId;
    if (id !== 'new') {
      this._customers.loadOne(id).subscribe();
    }
    return true;
  }
}
