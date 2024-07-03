import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { verifyGoogleToken } from '../common/commonFunctions';
import { UsersCollection } from '../common/collections';
import { addById, getData, getDataById } from '../common/dbHelpers';
import { SignupEmailDto } from './dto/auth.dto';
import { auth } from 'firebase-admin';
import { ROLES } from 'src/common/constants';
@Injectable()
export class AuthService {

  async signupUser(data: SignupEmailDto) {
    try {
      const userRoles = [data.role];
      // const res = await auth().createUser({
      //   email: data.email,
      // });

      auth().setCustomUserClaims(data.token, {
        roles: userRoles,
      });

      return {
        msg: 'User Login Successfully!',
      };
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async signInUsingToken(accessToken) {
    try {
      const tokenRes = await verifyGoogleToken(accessToken);
      if (!tokenRes.uid) {
        throw new HttpException('Invalid Token', HttpStatus.BAD_REQUEST);
      }
      if(!tokenRes.roles) {
        auth().setCustomUserClaims(tokenRes.uid, {
          roles: 'user',
        });
      }
      // try {
      //   const userDetails = await getDataById(UsersCollection, tokenRes.uid);
      //   return userDetails
      // } catch (err) {
      //   this.signupUser({
      //     email: tokenRes.email,
      //     role: 'user',
      //     token: tokenRes.uid
      //   });
      return {
        msg: "User Ctreated successfully!"
      }
      // }
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
