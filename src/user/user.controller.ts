import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Req } from '@nestjs/common';
import { ROLES } from 'src/common/constants';
import { Roles } from 'src/roles.decorator';
import { UserService } from './user.service';
import { EditUserDto } from './dtos/user.dto';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService){}

  @Get('getAll')
  @Roles([ROLES.ADMIN])
  async getAllUsers() {
    try{
      const response = await this.userService.getAllUsers()
      return response;
    }
    catch(err){
      throw new HttpException(
        err.message,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getUserDetails(@Param('id') id: string ) {
    try{
      const response = await this.userService.getUserById(id)
      return response;
    }
    catch(err){
      throw new HttpException(
        err.message,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @Roles([ROLES.ADMIN])
  async updateUserDetails(@Body() body: EditUserDto, @Param('id') id: string ) {
    try{
      const response = await this.userService.editUserById(id,body)
      return response;
    }
    catch(err){
      throw new HttpException(
        err.message,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('admin-create')
  async AdminCreate(@Body() body: {token:string}){
    try{
      const response = await this.userService.AddAdmin(body.token)
      return response;
    }
    catch(err){
      throw new HttpException(
        err.message,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
}
