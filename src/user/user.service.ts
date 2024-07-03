import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersCollection } from 'src/common/collections';
import { getData, getDataById, updateById } from 'src/common/dbHelpers';
import { EditUserDto } from './dtos/user.dto';
import { auth } from 'firebase-admin';
import { ROLES } from 'src/common/constants';
import { verifyGoogleToken } from 'src/common/commonFunctions';

@Injectable()
export class UserService {
  async getAllUsers() {
    try {
      const data = await getData(UsersCollection);
      console.log(data);
      return {
        data,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getUserById(id: string) {
    try {
      const data = await getDataById(UsersCollection, id);
      return {
        data,
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async editUserById(id: string, userData: EditUserDto) {
    try {
      await updateById(UsersCollection, id, { ...userData });
      return {
        msg: 'Updated Successfully!',
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async AddAdmin(token: string) {
    try {
      const tokenRes = await verifyGoogleToken(token);
      if (!tokenRes.uid) {
        throw new HttpException('Invalid Token', HttpStatus.BAD_REQUEST);
      }
      auth().setCustomUserClaims(tokenRes.uid, {
        roles: [ROLES.ADMIN],
      });
      return 'User Added!';
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
