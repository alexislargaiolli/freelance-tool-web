import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { SessionService } from '@auth/services/session.service';
import { AppUpdateService } from '@core/services/app-update.service';
import { take, filter } from 'rxjs/operators';
import { UserCompaniesService } from '@core/services/user-companies.service';
import { CustomersService } from '@core/services/customers.service';
import { InvoicesService } from '@core/services/invoices.service';
import { TaxReturnsService } from '@core/services/tax-returns.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _session: SessionService,
    private _customersService: CustomersService,
    private _companyService: UserCompaniesService,
    private _appUpdate: AppUpdateService,
    private _invoiceService: InvoicesService,
    private _taxReturnService: TaxReturnsService
  ) { }

  ngOnInit(): void {
    this._appUpdate.initialize();
    this._authService.checkAutoLogin().pipe(take(1)).subscribe();
    this._session.initialize();
    this._customersService.initialize();
    this._companyService.currentCompany$.pipe(filter(c => c != null)).subscribe(c => {
      this._invoiceService.load().subscribe();
      this._taxReturnService.load().subscribe();
    });
  }

}
