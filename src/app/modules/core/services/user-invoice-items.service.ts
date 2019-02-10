import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InvoiceItem } from '@models';
import { APIModelRepository } from './api-model.repository';

@Injectable({
  providedIn: 'root'
})
export class UserInvoiceItemsService extends APIModelRepository<InvoiceItem> {

  constructor(protected _httpClient: HttpClient) {
    super(_httpClient, '/invoices/:invoiceId/invoiceItems');
  }

  loadItems(invoiceId: number) {
    const url = this.generateUrl(invoiceId);
    return super.load(url);
  }

  createItem(invoiceId: number, item: InvoiceItem) {
    const url = this.generateUrl(invoiceId);
    return super.create(item, url);
  }

  patchItem(invoiceId: number, invoiceItemId: number, attributes: { [name: string]: any }) {
    const url = this.generateUrl(invoiceId, invoiceItemId);
    return super.patch(invoiceItemId, attributes, url);
  }

  deleteItem(invoiceId: number, invoiceItemId: number) {
    const url = this.generateUrl(invoiceId, invoiceItemId);
    console.log(invoiceItemId);
    return super.delete(invoiceItemId, url);
  }

  private generateUrl(invoiceId?: number, itemId?: number): string {
    let url = this._url.replace(':invoiceId', `${invoiceId}`);
    if (itemId) {
      url += `/${itemId}`;
    }
    return url;
  }

}
