import { Address } from './address.model';
import { User } from './user.model';
import { APIModel } from './api-model.model';

export interface Company extends APIModel {
    id?: number;
    name?: string;
    phone?: string;
    email?: string;
    siret?: string;
    facturationAddress?: Address;
    boss?: User;
}
