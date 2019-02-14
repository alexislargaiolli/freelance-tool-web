import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { SessionService } from '@auth/services/session.service';
import { AppUpdateService } from '@core/services/app-update.service';
import { take } from 'rxjs/operators';
import { UserCompaniesService } from '@core/services/user-companies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _session: SessionService,
    private _companyService: UserCompaniesService,
    private _appUpdate: AppUpdateService
  ) { }

  ngOnInit(): void {
    this._authService.checkAutoLogin().pipe(take(1)).subscribe();
    this._session.initialize();
  }

}
