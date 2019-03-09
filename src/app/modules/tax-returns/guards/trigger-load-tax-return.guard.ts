import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { TaxReturnsService } from '@core/services/tax-returns.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TriggerLoadTaxReturnGuard implements CanActivate {

  constructor(private _taxReturns: TaxReturnsService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const id = next.params.taxReturnId;
    if (id !== 'new') {
      this._taxReturns.loadOne(id).subscribe();
    }
    return true;
  }
}
