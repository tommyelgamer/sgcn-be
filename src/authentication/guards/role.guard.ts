import { ERoleName } from '../../enum/role.enum';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { RequestWithUser } from '../dto/request-with-user.dto';
import JwtAuthenticationGuard from './jwt-authentication.guard';

const RoleGuard = (...role: ERoleName[]): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthenticationGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;

      return role.some((role) => user.role === role);
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
