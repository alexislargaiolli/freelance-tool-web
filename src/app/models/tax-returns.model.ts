import { APIModel } from './api-model.model';
import { TaxReturnType } from './enums';
import { Invoice } from './invoice.model';

export interface TaxReturn extends APIModel {
    id?: number;
    date?: Date;
    periodStartDate?: Date;
    periodEndDate?: Date;
    type?: TaxReturnType;
    amount?: number;
    taxAmount?: number;
    invoices?: Invoice[];
}
