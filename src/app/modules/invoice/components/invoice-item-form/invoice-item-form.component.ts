import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Invoice, InvoiceItem } from '@models';
import { UserInvoiceItemsService } from '@core/services/user-invoice-items.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { DestroyObservable } from 'app/common/destroy-observable';
import { takeUntil, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-invoice-item-form',
  templateUrl: './invoice-item-form.component.html',
  styleUrls: ['./invoice-item-form.component.scss']
})
export class InvoiceItemFormComponent extends DestroyObservable implements OnInit {

  @Input()
  invoiceId: number;

  creating$: Observable<boolean>;
  formArray: FormArray;
  itemsToRemove: number[] = [];

  constructor(
    private _invocieItemService: UserInvoiceItemsService,
    private _fb: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.creating$ = this._invocieItemService.creating$;
    this._invocieItemService.loadItems(this.invoiceId).subscribe();
    this._invocieItemService.items$.pipe(takeUntil(this.destroy$)).subscribe(items => {
      this.buildForm(items);
    });
  }

  buildForm(items: InvoiceItem[]) {
    const itemFormGroups = items.map(item => this.buildItemFromGroup(item));
    this.formArray = this._fb.array(itemFormGroups);
    for (const group of this.formArray.controls as FormGroup[]) {
      combineLatest(
        group.controls.quantity.valueChanges.pipe(startWith(group.controls.quantity.value)),
        group.controls.unitPrice.valueChanges.pipe(startWith(group.controls.unitPrice.value))
      ).subscribe(([quantity, unitPrice]) => {
        if (quantity && unitPrice) {
          const totalPrice = quantity * unitPrice;
          group.controls.totalPrice.setValue(totalPrice);
        }
      });
    }
  }

  buildItemFromGroup(item: InvoiceItem) {
    return this._fb.group({
      id: [item.id],
      index: [item.index, Validators.required],
      label: [item.label, Validators.required],
      quantity: [item.quantity, [Validators.required, Validators.min(0)]],
      unitPrice: [item.unitPrice, Validators.required],
      totalPrice: [item.totalPrice, Validators.required],
    });
  }

  itemsToPatch() {
    const itemsPatch = {};
    for (const group of this.formArray.controls as FormGroup[]) {
      const id = group.controls.id.value;
      if (id != null) {
        const attributes = Object.entries(group.controls)
          .filter(([name, control]) => control.dirty)
          .reduce((res, [name, control]) => ({ ...res, [name]: control.value }), {});
        if (Object.values(attributes).length > 0) {
          itemsPatch[id] = attributes;
        }
      }
    }
    return itemsPatch;
  }

  itemsToCreate() {
    const itemsToCreate = [];
    for (const group of this.formArray.controls as FormGroup[]) {
      const id = group.controls.id.value;
      if (id == null) {
        const item = group.value;
        item['invoice'] = { id: this.invoiceId };
        itemsToCreate.push(item);
      }
    }
    return itemsToCreate;
  }

  createItem() {
    const item = {
      index: this.formArray.length, label: 'Nouvelle ligne', quantity: 1, unitPrice: 1, totalPrice: 1, invoice: { id: this.invoiceId }
    };
    const group = this.buildItemFromGroup(item);
    this.formArray.push(group);
  }

  removeItem(index: number) {
    const formGroupItem = this.formArray.controls[index] as FormGroup;
    const id = formGroupItem.controls.id.value;
    if (id != null) {
      this.itemsToRemove.push(Number(id));
    }
    this.formArray.removeAt(index);
  }

  itemRemoved(idRemoved: number) {
    this.itemsToRemove = this.itemsToRemove.filter(id => id !== idRemoved);
  }

  onSaveSuccess() {
    // this.itemsToRemove = [];
  }

}
