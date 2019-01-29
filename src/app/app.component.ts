import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { SessionService } from '@auth/services/session.service';
import { AppUpdateService } from '@core/services/app-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _session: SessionService,
    private _appUpdate: AppUpdateService
  ) { }

  ngOnInit(): void {
    this._authService.checkAutoLogin();
  }

}
