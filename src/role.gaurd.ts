import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const roles: string[] | undefined = this.reflector?.get(
        Roles,
        context.getHandler(),
      );
      if (!roles) {
        return true;
      }
      const request = context.switchToHttp().getRequest();
      const userRole: string[] = request?.user?.roles || [];
      console.log(roles,userRole,request.user)
      for (const i of userRole) {
        if (roles.includes(i)) {
          return true;
        }
      }
      throw new HttpException(
        'User Not allowed to access this route',
        HttpStatus.UNAUTHORIZED,
      );
    } catch (err) {
      throw new HttpException(err.message, err.status || 500);
    }
  }
}
