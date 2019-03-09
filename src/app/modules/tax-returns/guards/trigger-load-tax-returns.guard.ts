import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { TaxReturnsService } from '@core/services/tax-returns.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TriggerLoadTaxReturnsGuard implements CanActivate {

  constructor(private _taxReturns: TaxReturnsService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this._taxReturns.load().subscribe();
    return true;
  }
}
