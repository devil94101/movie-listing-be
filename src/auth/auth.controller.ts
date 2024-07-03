import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LoginDto, SignupEmailDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Roles } from '../roles.decorator';
import { ROLES } from '../common/constants';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags("Auth Controller")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: SignupEmailDto) {
    try {
      const response = await this.authService.signupUser(
        body
      );
      return response;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post('login')
  async login(@Body() body: LoginDto) {
    try {
      const response = await this.authService.signInUsingToken(body.authToken);
      return response;
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
