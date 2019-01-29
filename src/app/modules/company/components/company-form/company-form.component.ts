import { Component, OnInit } from '@angular/core';
import { Company, Address } from '@models';
import { UserCompanyService } from '@core/services/user-company.service';
import { DestroyObservable } from 'app/common/destroy-observable';
import { takeUntil } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { NotificationService } from '@notification/services/notification.service';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent extends DestroyObservable implements OnInit {

  company: Company;

  constructor(private _companyService: UserCompanyService, private _notifService: NotificationService) { super(); }

  ngOnInit() {
    this._companyService.currentCompany$.pipe(takeUntil(this.destroy$)).subscribe(c => {
      this.company = { ...c };
      if (this.company.facturationAddress == null) {
        this.company.facturationAddress = {};
      }
    });
  }

  onSubmit(form: NgForm) {
    this._companyService.patch(this.company.id, this.company).subscribe(
      c => this._notifService.saveSuccess(),
      error => this._notifService.error()
    );
  }

}
