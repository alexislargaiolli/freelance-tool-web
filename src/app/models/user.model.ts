import { UserRole } from './user-role.enum';

export interface User {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    roles: UserRole[];
}
