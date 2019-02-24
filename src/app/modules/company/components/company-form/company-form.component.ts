import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { buildAddressFormGroup } from '@common/form-utils';
import { UserCompaniesService } from '@core/services/user-companies.service';
import { Company } from '@models';
import { NotificationService } from '@notification/services/notification.service';
import { DestroyObservable } from 'app/common/destroy-observable';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent extends DestroyObservable implements OnInit {

  loading$: Observable<boolean>;
  company: Company;
  form: FormGroup;

  constructor(
    private _companyService: UserCompaniesService,
    private _notifService: NotificationService,
    private _fb: FormBuilder
  ) { super(); }

  ngOnInit() {
    this.loading$ = this._companyService.loading$;
    this._companyService.currentCompany$.pipe(takeUntil(this.destroy$)).subscribe(c => {
      this.company = { ...c };
      this.buildForm();
    });
  }

  buildForm() {
    this.form = this._fb.group({
      name: [this.company.name, Validators.required],
      email: [this.company.email, Validators.email],
      phone: [this.company.phone, Validators.pattern('[0-9]{10}')],
      siret: [this.company.siret, [Validators.minLength(14), Validators.maxLength(14)]],
      facturationAddress: buildAddressFormGroup(this._fb, this.company.facturationAddress),
    });
  }

  save() {
    if (this.form.valid && !this.form.pristine) {
      this._companyService.patch(this.company.id, this.form.value).subscribe(
        c => this._notifService.saveSuccess(),
        error => this._notifService.error()
      );
    }
  }

  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get phone() { return this.form.get('phone'); }
  get siret() { return this.form.get('siret'); }
  get facturationAddress() { return this.form.get('facturationAddress'); }

}
