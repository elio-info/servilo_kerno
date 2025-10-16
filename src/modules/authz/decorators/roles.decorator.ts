import { SetMetadata } from '@nestjs/common';
import { ApplicationRole } from '../enums/application-role';

export const Roles = (...roles: ApplicationRole[]) =>
  SetMetadata('roles', roles);
