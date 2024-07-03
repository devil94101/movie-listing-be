import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { SKIP_AUTH_CHECK } from './common/constants';
import { getAuth } from 'firebase-admin/auth';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    if (SKIP_AUTH_CHECK.includes(request.route.path)) {
      return true;
    }

    if (!request?.headers?.authorization) {
      throw new HttpException('No Token Found!', HttpStatus.UNAUTHORIZED);
    }

    try {
      const token: string = request.headers.authorization;
      const userData = await this.validateToken(token);
      request['user'] = {
        id: userData.uid,
        roles: userData.roles,
      };
      return true;
    } catch (err) {
      throw new HttpException(
        'Invalid Token!',
        err.status || HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async validateToken(token: string) {
    try {
      const decodedToken = await getAuth().verifyIdToken(token);
      return decodedToken; // Token is valid
    } catch (error) {
      console.error('Error validating token:', error);
      throw new HttpException('Invalid Token!', HttpStatus.UNAUTHORIZED);
    }
  }
}
