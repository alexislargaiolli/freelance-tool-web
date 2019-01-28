import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { SessionService } from '@auth/services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _session: SessionService
  ) { }

  ngOnInit(): void {
    this._authService.checkAutoLogin();
  }

}
