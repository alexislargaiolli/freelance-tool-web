import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SessionService } from '@auth/services/session.service';
import { Observable } from 'rxjs';
import { User } from '@models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  isMobile: boolean;

  @Output()
  toggleSideMenu = new EventEmitter();

  user$: Observable<User>;

  constructor(private _session: SessionService) { }

  ngOnInit() {
    this.user$ = this._session.user$;
    this.user$.subscribe(console.log);
  }

}
