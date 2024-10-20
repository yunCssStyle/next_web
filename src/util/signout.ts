import Axios, { ClientCodeType } from '@/axios/axios';
import { signOut } from 'next-auth/react';
import { flightSlackMessage } from './flightSlackMessage';

export const SIGNOUT = async (type?: ClientCodeType) => {
  let callbackUrl = '/';
  switch (type) {
    case 'MULTI_LOGIN':
      callbackUrl = `/?MULTI_LOGIN`;
      break;
    case 'DORMANCY_MEMBER':
      callbackUrl = `/?DORMANCY_MEMBER`;
      break;
    case 'WITHDRAWAL_MEMBER':
      callbackUrl = `/?WITHDRAWAL_MEMBER`;
      break;
    case 'BLOCK_MEMBER':
      callbackUrl = `/?BLOCK_MEMBER`;
      break;
    case 'MAINTENANCE':
      callbackUrl = `/maintenance`;
      break;

    default:
      break;
  }

  Axios.delete('/auth/redis_delete').catch(() => {
    flightSlackMessage('SIGNOUT redis_delete_error');
  });

  signOut({ callbackUrl });
};
