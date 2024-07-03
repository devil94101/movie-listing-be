import * as jwt from 'jsonwebtoken';
import { HttpException, HttpStatus } from '@nestjs/common';
import { JWTPayloadType } from '../types/auth.types';

export async function createJWT(
  payload: JWTPayloadType,
  expiresIn = '100ms',
  refreshToken = false,
) {
  const secret = refreshToken
    ? process.env.REFRESH_JWT_SECRET
    : process.env.JWT_SECRET;
  const token = await jwt.sign(payload, secret, {
    expiresIn,
  });
  return token;
}

export async function compareJWT(token: string, refreshToken = false) {
  const secret = refreshToken
    ? process.env.REFRESH_JWT_SECRET
    : process.env.JWT_SECRET;
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    if (err.expiredAt) {
      return {
        status: 'expired',
        error: true,
      };
    } else {
      throw new HttpException(err.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
