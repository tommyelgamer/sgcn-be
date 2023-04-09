import { SetMetadata } from '@nestjs/common';
import { ERoleName } from 'src/enum/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ERoleName[]) => SetMetadata(ROLES_KEY, roles);
