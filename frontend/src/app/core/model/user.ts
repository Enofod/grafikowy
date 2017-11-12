import { SimpleGroup } from './simple-group';

export class User {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    roles: string[];
    usingGroups: SimpleGroup[];
    moderatingGroups: SimpleGroup[];
}
