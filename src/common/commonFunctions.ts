import { HttpException, HttpStatus } from '@nestjs/common';
import { getAuth } from 'firebase-admin/auth';

export const validEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validNumber = (number: string, length = 10) => {
  const value = new RegExp('^[0-9]{' + length + '}$');
  return value.test(number);
};

export const removeDuplicates = (arr: any) => {
  const obj = {};
  const ret_arr = [];
  for (let i = 0; i < arr.length; i++) {
    obj[arr[i]] = true;
  }
  for (const key in obj) {
    ret_arr.push(key);
  }
  return ret_arr;
};

export async function verifyGoogleToken(token: string) {
  try {
    const tokenRes = await getAuth().verifyIdToken(token);
    return tokenRes;
  } catch (error) {
    console.log(error)
    throw new HttpException('Invalid Token!', HttpStatus.UNAUTHORIZED);
  }
}
