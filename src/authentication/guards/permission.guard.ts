import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { RequestWithUser } from '../dto/request-with-user.dto';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import EPermission from '../../enum/permission/permission.type';
import { rolePermission } from '../../enum/role.enum';

const PermissionGuard = (permission: EPermission): Type<CanActivate> => {
  class PermissionGuardMixin extends JwtAuthenticationGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;

      return rolePermission[user.role].some(
        (permissionInRole) => permission === permissionInRole,
      );
    }
  }

  return mixin(PermissionGuardMixin);
};

export default PermissionGuard;
