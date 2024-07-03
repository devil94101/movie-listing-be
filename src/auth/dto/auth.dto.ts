import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class SignupEmailDto {
  @ApiProperty({
    description: 'User Role',
    default: '',
    required: true,
  })
  @IsString()
  role: string;

  @ApiProperty({
    description: 'User Email',
    default: '',
    required: true,
  })
  @IsString()
  email: string;

  token: string;

}

export class LoginDto {
  @ApiProperty({
    description: 'Auth token',
    default: '',
    required: true,
  })
  @IsString()
  authToken: string;
}
