import { Component, OnInit } from '@angular/core';
import { DestroyObservable } from '@common/destroy-observable';
import { TaxReturn, TaxReturnType, Invoice } from '@models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaxReturnsService } from '@core/services/tax-returns.service';
import { NotificationService } from '@notification/services/notification.service';
import { map, takeUntil, mergeMap, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import { validateAllFormFields } from '@common/form-utils';
import { MatDialog } from '@angular/material';
import { SelectInvoiceDialogComponent } from '../select-invoice-dialog/select-invoice-dialog.component';

@Component({
  selector: 'app-tax-return-form',
  templateUrl: './tax-return-form.component.html',
  styleUrls: ['./tax-return-form.component.scss']
})
export class TaxReturnFormComponent extends DestroyObservable implements OnInit {

  taxReturn: TaxReturn;
  form: FormGroup;
  taxReturnTypes = TaxReturnType;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _taxReturnsService: TaxReturnsService,
    private _notif: NotificationService,
    private _router: Router,
    private _dialog: MatDialog
  ) {
    super();
  }

  ngOnInit() {
    this._activatedRoute.params.pipe(
      map(p => p.taxReturnId),
      takeUntil(this.destroy$),
      mergeMap(id => {
        if (id === 'new') {
          const taxReturn: TaxReturn = {
            date: new Date(),
            type: TaxReturnType.QUARTERLY,
            amount: 0
          };
          return of(taxReturn);
        } else {
          return this._taxReturnsService.item$(of(Number(id))).pipe(filter(c => c != null));
        }
      })
    ).subscribe(taxReturn => {
      this.taxReturn = taxReturn;
      this.buildForm();
    });
  }

  buildForm() {
    this.form = this._fb.group({
      date: [this.taxReturn.date],
      amount: [this.taxReturn.amount],
      taxAmount: [this.taxReturn.taxAmount],
      type: [this.taxReturn.type],
      periodStartDate: [this.taxReturn.periodStartDate],
      periodEndDate: [this.taxReturn.periodEndDate],
      invoices: [this.taxReturn.invoices ? this.taxReturn.invoices : []]
    });
    this.form.controls.invoices.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(invoices => {
      const amount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
      this.form.controls.amount.setValue(amount);
      this.form.controls.invoices.markAsDirty();
    });
  }

  save() {
    if (this.form.valid && this.form.dirty) {
      if (this.taxReturn.id) {
        this._taxReturnsService.patch(this.taxReturn.id, this.form.value).subscribe(
          () => this._notif.saveSuccess(),
          () => this._notif.error()
        );
      } else {
        this._taxReturnsService.create(this.form.value).subscribe(
          (c) => {
            this._notif.saveSuccess();
            this._router.navigate(['tax-returns', c.id]);
          },
          () => this._notif.error()
        );
      }
    } else {
      validateAllFormFields(this.form);
    }
  }

  openSelectInvoiceDialog() {
    const invoicesToExclude: Invoice[] = this.form.controls.invoices.value;
    this._dialog.open(SelectInvoiceDialogComponent, { data: { invoicesToExclude } }).afterClosed().subscribe(invoice => {
      if (invoice != null) {
        this.addInvoice(invoice);
      }
    });
  }

  addInvoice(invoice: Invoice) {
    const invoices = [...this.form.controls.invoices.value, invoice];
    this.form.controls.invoices.setValue(invoices);
    this.form.controls.invoices.markAsDirty();
  }

  deleteInvoice(invoice: Invoice) {
    const invoices = this.form.controls.invoices.value.filter(e => e.id !== invoice.id);
    this.form.controls.invoices.setValue(invoices);
    this.form.controls.invoices.markAsDirty();
  }

}
