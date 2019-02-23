import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomersService } from '@core/services/customers.service';
import { Customer } from 'app/models/customer.model';
import { Router } from '@angular/router';
import { NotificationService } from '@notification/services/notification.service';
import { DialogsService } from '@core/services/dialog.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  loading$: Observable<boolean>;
  creating$: Observable<boolean>;
  customers$: Observable<Customer[]>;

  constructor(
    private _customerService: CustomersService,
    private _router: Router,
    private _notif: NotificationService,
    private _dialogService: DialogsService
  ) { }

  ngOnInit() {
    this.loading$ = this._customerService.loading$;
    this.creating$ = this._customerService.creating$;
    this.customers$ = this._customerService.items$;
  }

  createCustomer() {
    this._router.navigate(['customers', 'new']);
  }

  selectCustomer(customer: Customer) {
    this._router.navigate(['customers', customer.id]);
  }

  deleteCustomer(customer: Customer) {
    this._dialogService.confirm('Confirmation', `Êtes-vous sure de vouloir supprimer « ${customer.name} » ?`)
      .subscribe((confirmed) => {
        if (confirmed) {
          this._customerService.delete(customer.id).subscribe(
            () => this._notif.removeSuccess(),
            () => this._notif.removeError()
          );
        }
      });
  }

}
