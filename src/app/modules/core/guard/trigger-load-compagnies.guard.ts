import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserCompaniesService } from '@core/services/user-companies.service';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TriggerLoadCompagniesDataGuard implements CanActivate {

  constructor(private _companyService: UserCompaniesService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this._companyService.load().subscribe();
    return true;
  }
}
