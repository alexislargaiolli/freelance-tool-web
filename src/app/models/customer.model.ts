import { APIModel } from './api-model.model';
import { Address } from './address.model';

export interface Customer extends APIModel {
    id?: number;
    name?: string;
    firstname?: string;
    lastname?: string;
    facturationAddress?: Address;
    email?: string;
    phone?: string;
    siret?: string;
    user?: {
        id: number
    };
}
