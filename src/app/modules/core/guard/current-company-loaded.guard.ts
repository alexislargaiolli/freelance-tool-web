import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import { UserCompaniesService } from '@core/services/user-companies.service';
import { Observable } from 'rxjs';
import { take, filter, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CurrentCompanyLoadedGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(private _companyService: UserCompaniesService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.isLoaded();
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.isLoaded();
    }

    canLoad(route: Route): Observable<boolean> {
        return this.isLoaded();
    }

    isLoaded() {
        return this._companyService.currentCompany$.pipe(filter(company => company != null), map(c => true));
    }

}

