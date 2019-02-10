import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserInvoicesService } from '@core/services/user-invoices.service';
import { Invoice, Address, InvoiceState } from '@models';
import { DestroyObservable } from 'app/common/destroy-observable';
import { takeUntil, map, filter, tap } from 'rxjs/operators';
import { NotificationService } from '@notification/services/notification.service';
import { merge, Observable, forkJoin } from 'rxjs';
import { InvoiceItemFormComponent } from '../invoice-item-form/invoice-item-form.component';
import { UserInvoiceItemsService } from '@core/services/user-invoice-items.service';
import { getModifiedFields } from 'app/common/form-utils';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent extends DestroyObservable implements OnInit {

  @ViewChild(InvoiceItemFormComponent)
  invoiceItemForm: InvoiceItemFormComponent;

  invoiceId$: Observable<number>;
  invoice: Invoice;
  form: FormGroup;
  InvoiceState = InvoiceState;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _invoiceService: UserInvoicesService,
    private _notif: NotificationService,
    private _fb: FormBuilder,
    private _invocieItemService: UserInvoiceItemsService,
  ) {
    super();
  }

  ngOnInit() {
    this.invoiceId$ = this._activatedRoute.params.pipe(map(p => Number(p.invoiceId)));
    this._invoiceService.item$(this.invoiceId$)
      .pipe(
        takeUntil(this.destroy$),
        filter(invoice => invoice != null),
      ).subscribe(invoice => {
        this.invoice = invoice;
        this.buildForm();
      });
  }

  buildForm() {
    this.form = this._fb.group({
      title: [this.invoice.title, Validators.required],
      state: [this.invoice.state, Validators.required],
      userName: [this.invoice.userName],
      userPhone: [this.invoice.userPhone, Validators.pattern('[0-9]{10}')],
      userEmail: [this.invoice.userEmail, Validators.email],
      userSiret: [this.invoice.userSiret, [Validators.minLength(14), Validators.maxLength(14)]],
      userFacturationAddress: this.buildAddressFormGroup(this.invoice.userFacturationAddress),
      customerName: [this.invoice.customerName],
      customerPhone: [this.invoice.customerPhone, Validators.pattern('[0-9]{10}')],
      customerEmail: [this.invoice.customerEmail, Validators.email],
      customerSiret: [this.invoice.customerSiret, [Validators.minLength(14), Validators.maxLength(14)]],
      customerFacturationAddress: this.buildAddressFormGroup(this.invoice.customerFacturationAddress),
    });
  }

  saveInvoice() {
    if (this.form.valid && this.invoiceItemForm.formArray.valid) {

      const itemsToPatch = this.invoiceItemForm.itemsToPatch();
      const itemsToCreate = this.invoiceItemForm.itemsToCreate();
      const itemCreate$ = itemsToCreate.map(item => this._invocieItemService.createItem(this.invoice.id, item));
      const itemPaches$ = Object.entries(itemsToPatch)
        .map(([id, attributes]) => this._invocieItemService.patchItem(this.invoice.id, Number(id), attributes));

      const itemDeletes$ = this.invoiceItemForm.itemsToRemove.map(id =>
        this._invocieItemService.deleteItem(this.invoice.id, id).pipe(tap(() => this.invoiceItemForm.itemRemoved(id)))
      );
      const request$ = [...itemCreate$, ...itemPaches$, ...itemDeletes$];

      const invoiceAttributes = getModifiedFields(this.form);
      if (Object.values(invoiceAttributes).length > 0) {
        const invoicePatch$ = this._invoiceService.patch(this.invoice.id, invoiceAttributes);
        request$.push(invoicePatch$);
      }
      forkJoin(request$).subscribe(
        () => {
          this.invoiceItemForm.onSaveSuccess();
          this._notif.saveSuccess();
        },
        () => this._notif.error()
      );
    } else {
      this.validateAllFormFields(this.form);
      this.validateAllFormFields(this.invoiceItemForm.formArray);
    }
  }

  formatModifiedAttributes() {
    const attributes = getModifiedFields(this.form);
  }

  validateAllFormFields(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  private buildAddressFormGroup(address: Address) {
    return this._fb.group({
      address1: [address != null ? address.address1 : '', Validators.required],
      address2: [address != null ? address.address2 : ''],
      address3: [address != null ? address.address3 : ''],
      city: [address != null ? address.city : '', Validators.required],
      postalCode: [address != null ? address.postalCode : '', Validators.required],
    });
  }

  get title() { return this.form.get('title'); }

}
