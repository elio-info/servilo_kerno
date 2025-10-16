import { Role } from './role';

export interface User {
  id: number | string;
  email: string;
  roles: Role[];
}
