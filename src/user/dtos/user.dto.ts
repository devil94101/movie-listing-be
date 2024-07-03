import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class EditUserDto {
  @ApiProperty({
    description: 'User Role',
    default: '',
    required: false,
  })
  @IsString()
  role?: string;

  @ApiProperty({
    description: 'User Contact',
    default: '',
    required: false,
  })
  @IsString()
  mobile?: string;

  @ApiProperty({
    description: 'User name',
    default: '',
    required: false,
  })
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'User Status',
    default: '',
    required: false,
  })
  @Transform(({ value }) => {
    console.log(value);
    return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
  })
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    description: 'Employee Id',
    default: '',
    required: false,
  })
  @IsNumber()
  empId?: number;

  @ApiProperty({
    description: 'Employee Email',
    default: '',
    required: false,
  })
  @IsEmail()
  email?: string;

}
