import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { UserCompaniesService } from '@core/services/user-companies.service';

@Injectable()
export class CurrentCompanyInterceptor implements HttpInterceptor {

    public static readonly KEYWORD = 'currentCompany';

    constructor(
        private _companyService: UserCompaniesService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.startsWith(`${environment.api_endpoint}/${CurrentCompanyInterceptor.KEYWORD}`)
            || this._companyService.currentCompany == null) {
            return next.handle(req);
        }
        // Clone the request to change url
        req = req.clone({
            url: req.url.replace(`/${CurrentCompanyInterceptor.KEYWORD}`, `/companies/${this._companyService.currentCompany.id}`)
        });
        // Pass on the cloned request instead of the original request.
        return next.handle(req);
    }
}
