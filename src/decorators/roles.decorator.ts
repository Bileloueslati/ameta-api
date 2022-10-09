import { SetMetadata } from '@nestjs/common';

export enum Role {
  User = 'ROLE_ADMIN',
  Admin = 'ROLE_ADMIN',
  SuperAdmin = 'ROLE_SUPERADMIN',
}

export const ROLES_KEY = 'roles';

export const HasRoles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
