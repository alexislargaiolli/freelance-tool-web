import { Component, OnInit } from '@angular/core';
import { TaxReturn } from '@models';
import { Observable } from 'rxjs';
import { TaxReturnsService } from '@core/services/tax-returns.service';
import { Router } from '@angular/router';
import { NotificationService } from '@notification/services/notification.service';
import { DialogsService } from '@core/services/dialog.service';

@Component({
  selector: 'app-tax-returns',
  templateUrl: './tax-returns.component.html',
  styleUrls: ['./tax-returns.component.scss']
})
export class TaxReturnsComponent implements OnInit {

  loading$: Observable<boolean>;
  creating$: Observable<boolean>;
  taxReturns$: Observable<TaxReturn[]>;

  constructor(
    private _taxReturnsService: TaxReturnsService,
    private _router: Router,
    private _notif: NotificationService,
    private _dialogService: DialogsService
  ) { }

  ngOnInit() {
    this.loading$ = this._taxReturnsService.loading$;
    this.creating$ = this._taxReturnsService.creating$;
    this.taxReturns$ = this._taxReturnsService.items$;
  }

  create() {
    this._router.navigate(['tax-returns', 'new']);
  }

  select(taxReturn: TaxReturn) {
    this._router.navigate(['tax-returns', taxReturn.id]);
  }

  delete(taxReturn: TaxReturn) {
    this._dialogService.confirm('Confirmation', `Êtes-vous sure de vouloir supprimer cette déclaration ?`)
      .subscribe((confirmed) => {
        if (confirmed) {
          this._taxReturnsService.delete(taxReturn.id).subscribe(
            () => this._notif.removeSuccess(),
            () => this._notif.removeError()
          );
        }
      });
  }
}
