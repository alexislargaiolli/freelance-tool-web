import { APIModel } from './api-model.model';

export interface InvoiceItem extends APIModel {
    index?: number;
    label?: string;
    quantity?: number;
    unitPrice?: number;
    totalPrice?: number;
    invoiceId?: number;
}
