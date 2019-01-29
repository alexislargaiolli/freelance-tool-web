import { UserRole } from './user-role.enum';
import { APIModel } from './api-model.model';

export interface User extends APIModel {
    id: number;
    firstname?: string;
    lastname?: string;
    username?: string;
    email?: string;
    roles?: UserRole[];
}
