import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserInvoicesService } from '@core/services/user-invoices.service';
import { Invoice } from '@models';
import { DestroyObservable } from 'app/common/destroy-observable';
import { takeUntil, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent extends DestroyObservable implements OnInit {

  invoice: Invoice;
  form: FormGroup;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _invoiceService: UserInvoicesService,
    private _fb: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    const invoiceId$ = this._activatedRoute.params.pipe(map(p => Number(p.invoiceId)));
    this._invoiceService.item$(invoiceId$)
      .pipe(
        takeUntil(this.destroy$),
        filter(invoice => invoice != null),
      ).subscribe(invoice => {
        this.invoice = invoice;
        this.form = this._fb.group({
          title: [this.invoice.title, Validators.required],
          userName: [this.invoice.userName],
          userPhone: [this.invoice.userPhone],
          userEmail: [this.invoice.userEmail],
          userSiret: [this.invoice.userSiret, [Validators.minLength(14), Validators.maxLength(14)]],
        });
      });
  }

  saveInvoice(form: NgForm) {

  }

  get title() { return this.form.get('title'); }

}
