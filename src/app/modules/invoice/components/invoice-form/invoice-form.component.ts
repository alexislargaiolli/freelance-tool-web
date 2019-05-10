import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DestroyObservable } from '@common/destroy-observable';
import { validateAllFormFields, buildAddressFormGroup } from '@common/form-utils';
import { InvoicesService } from '@core/services/invoices.service';
import { Address, Invoice, InvoiceItem, InvoiceState } from '@models';
import { NotificationService } from '@notification/services/notification.service';
import { combineLatest, merge, Observable } from 'rxjs';
import { filter, map, startWith, takeUntil } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SelectCustomerDialogComponent } from 'app/modules/customers/components/select-customer-dialog/select-customer-dialog.component';
import { Customer } from 'app/models/customer.model';
import * as moment from 'moment';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent extends DestroyObservable implements OnInit {

  invoiceId$: Observable<number>;
  invoice: Invoice;
  form: FormGroup;
  InvoiceState = InvoiceState;

  @Output()
  change = new EventEmitter<Invoice>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _invoiceService: InvoicesService,
    private _notif: NotificationService,
    private _fb: FormBuilder,
    private dialog: MatDialog
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
      code: [this.invoice.code, Validators.required],
      state: [this.invoice.state, Validators.required],
      amount: [this.invoice.amount, [Validators.min(0), Validators.max(99999999)]],
      amountDutyFree: [this.invoice.amountDutyFree, [Validators.min(0), Validators.max(99999999)]],
      tvaAmount: [this.invoice.tvaAmount, [Validators.min(0), Validators.max(99999999)]],
      tvaActive: [this.invoice.tvaActive, Validators.required],
      validityDate: [this.invoice.validityDate],
      startDate: [this.invoice.startDate],
      paid: [this.invoice.paid],
      portage: [this.invoice.portage],
      portageSalary: [this.invoice.portageSalary, [Validators.min(0), Validators.max(99999999)]],
      paymentDate: [this.invoice.paymentDate],
      userName: [this.invoice.userName],
      userPhone: [this.invoice.userPhone, Validators.pattern('[0-9]{10}')],
      userEmail: [this.invoice.userEmail, Validators.email],
      userSiret: [this.invoice.userSiret, [Validators.minLength(14), Validators.maxLength(14)]],
      userFacturationAddress: buildAddressFormGroup(this._fb, this.invoice.userFacturationAddress),
      tvaIdentifier: [this.invoice.tvaIdentifier],
      customerName: [this.invoice.customerName],
      customerPhone: [this.invoice.customerPhone, Validators.pattern('[0-9]{10}')],
      customerEmail: [this.invoice.customerEmail, Validators.email],
      customerSiret: [this.invoice.customerSiret, [Validators.minLength(14), Validators.maxLength(14)]],
      customerFacturationAddress: buildAddressFormGroup(this._fb, this.invoice.customerFacturationAddress),
    });
    this.form.addControl('invoiceItems', this.buildItemsFormArray(this.invoice.invoiceItems));
    this.form.valueChanges.pipe(takeUntil(this.destroy$), startWith(this.invoice)).subscribe(value => {
      this.change.emit(value);
    });
    this.form.controls.startDate.valueChanges.pipe(
      takeUntil(this.destroy$),
      filter(startDate => startDate != null))
      .subscribe(startDate => {
        const validityDate = moment(startDate).add(1, 'month').endOf('month').toDate();
        this.form.controls.validityDate.setValue(validityDate);
        const code = this._invoiceService.generateInvoiceCode(startDate, this.invoice.id);
        this.form.controls.code.setValue(code);
      });
  }

  openCustomerList() {
    let dialogRef: MatDialogRef<SelectCustomerDialogComponent>;
    dialogRef = this.dialog.open(SelectCustomerDialogComponent);
    return dialogRef.afterClosed().subscribe((c: Customer) => {
      this.form.controls.customerName.setValue(c.name);
      this.form.controls.customerPhone.setValue(c.phone);
      this.form.controls.customerSiret.setValue(c.siret);
      this.form.controls.customerEmail.setValue(c.email);
      const address = { ...c.facturationAddress };
      address.id = null;
      this.form.controls.customerFacturationAddress.setValue(address);
      this.form.markAsDirty();
    });
  }

  saveInvoice() {
    if (this.form.valid && this.form.dirty) {
      // const invoiceAttributes = getModifiedFields(this.form);
      // invoiceAttributes['invoiceItems'] = this.invoiceItems.value;
      // invoiceAttributes['userFacturationAddress'] = this.userFacturationAddress.value;
      // invoiceAttributes['customerFacturationAddress'] = this.customerFacturationAddress.value;
      this._invoiceService.patch(this.invoice.id, this.form.value).subscribe(
        () => this._notif.saveSuccess(),
        () => this._notif.error()
      );
    } else {
      validateAllFormFields(this.form);
    }
  }

  createItem() {
    const item = {
      label: 'Nouvelle ligne', quantity: 1, unitPrice: 1, totalPrice: 1
    };
    const group = this.buildItemFromGroup(item);
    this.invoiceItems.push(group);
  }

  removeItem(index: number) {
    this.invoiceItems.removeAt(index);
  }

  buildItemsFormArray(items: InvoiceItem[]): FormArray {
    const itemFormGroups = items.map(item => this.buildItemFromGroup(item));
    const formArray = this._fb.array(itemFormGroups);
    return formArray;
  }

  buildItemFromGroup(item: InvoiceItem): FormGroup {
    const group = this._fb.group({
      label: [item.label, Validators.required],
      quantity: [item.quantity, [Validators.required, Validators.min(0)]],
      unitPrice: [item.unitPrice, Validators.required],
      totalPrice: [item.totalPrice, Validators.required],
    });
    combineLatest(
      group.controls.quantity.valueChanges.pipe(startWith(group.controls.quantity.value)),
      group.controls.unitPrice.valueChanges.pipe(startWith(group.controls.unitPrice.value))
    ).pipe(takeUntil(this.destroy$)).subscribe(([quantity, unitPrice]) => {
      if (quantity && unitPrice) {
        const totalPrice = Math.round(quantity * unitPrice * 100) / 100;
        group.controls.totalPrice.setValue(totalPrice);
      }
    });
    merge(
      group.controls.totalPrice.valueChanges,
      this.tvaActive.valueChanges,
    ).pipe(takeUntil(this.destroy$)).subscribe(() => {
      const amountDutyFree = this.computeAmount();
      const tva = this.computeTVA(amountDutyFree);
      this.form.controls.amountDutyFree.setValue(amountDutyFree);
      this.form.controls.amountDutyFree.markAsDirty();
      this.form.controls.tvaAmount.setValue(tva);
      this.form.controls.tvaAmount.markAsDirty();
      this.form.controls.amount.setValue(amountDutyFree + tva);
      this.form.controls.amount.markAsDirty();
    });
    return group;
  }

  computeAmount() {
    return this.invoiceItems.controls.reduce((total, group: FormGroup) => total + group.controls.totalPrice.value, 0);
  }

  computeTVA(amountDutyFree: number) {
    const tva = amountDutyFree * 0.2 * (this.tvaActive.value ? 1 : 0);
    const roundedTva = Math.round(tva * 100) / 100;
    return roundedTva;
  }

  get title() { return this.form.get('title'); }
  get tvaActive() { return this.form.get('tvaActive'); }
  get portage() { return this.form.get('portage'); }

  get invoiceItems(): FormArray { return this.form.get('invoiceItems') as FormArray; }
  get userFacturationAddress(): FormGroup { return this.form.get('userFacturationAddress') as FormGroup; }
  get customerFacturationAddress(): FormGroup { return this.form.get('customerFacturationAddress') as FormGroup; }

}
