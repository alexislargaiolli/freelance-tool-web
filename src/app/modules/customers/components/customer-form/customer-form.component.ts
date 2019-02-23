import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DestroyObservable } from '@common/destroy-observable';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap, takeUntil, filter, tap } from 'rxjs/operators';
import { CustomersService } from '@core/services/customers.service';
import { of } from 'rxjs';
import { Customer } from 'app/models/customer.model';
import { buildAddressFormGroup, validateAllFormFields } from '@common/form-utils';
import { NotificationService } from '@notification/services/notification.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent extends DestroyObservable implements OnInit {

  customer: Customer;
  form: FormGroup;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _customersService: CustomersService,
    private _notif: NotificationService,
    private _router: Router
  ) {
    super();
  }

  ngOnInit() {
    this._activatedRoute.params.pipe(
      map(p => p.customerId),
      takeUntil(this.destroy$),
      mergeMap(id => {
        if (id === 'new') {
          const customer: Customer = {
            facturationAddress: {}
          };
          return of(customer);
        } else {
          return this._customersService.item$(of(Number(id))).pipe(filter(c => c != null));
        }
      })
    ).subscribe(customer => {
      this.customer = customer;
      this.buildForm();
    });
  }

  buildForm() {
    this.form = this._fb.group({
      name: [this.customer.name, Validators.required],
      lastname: [this.customer.lastname],
      firstname: [this.customer.firstname],
      email: [this.customer.email, Validators.email],
      phone: [this.customer.phone, Validators.pattern('[0-9]{10}')],
      siret: [this.customer.siret, [Validators.minLength(14), Validators.maxLength(14)]],
      facturationAddress: buildAddressFormGroup(this._fb, this.customer.facturationAddress),
    });
  }

  save() {
    if (this.form.valid && this.form.dirty) {
      if (this.customer.id) {
        this._customersService.patch(this.customer.id, this.form.value).subscribe(
          () => this._notif.saveSuccess(),
          () => this._notif.error()
        );
      } else {
        this._customersService.create(this.form.value).subscribe(
          (c) => {
            this._notif.saveSuccess();
            this._router.navigate(['customers', c.id]);
          },
          () => this._notif.error()
        );
      }
    } else {
      validateAllFormFields(this.form);
    }
  }

  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get phone() { return this.form.get('phone'); }
  get siret() { return this.form.get('siret'); }
  get facturationAddress() { return this.form.get('facturationAddress'); }

}
