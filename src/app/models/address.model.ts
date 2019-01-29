import { APIModel } from './api-model.model';

export interface Address extends APIModel {
    id?: number;
    address1?: string;
    address2?: string;
    address3?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
}
