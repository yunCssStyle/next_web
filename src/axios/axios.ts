import useGlobalStore from '@/store/globalStore';
import useHavahStore from '@/store/havahStore';
import { flightSlackMessage } from '@/util/flightSlackMessage';
import { localStateHandler } from '@/util/localStateHandler';
import { SIGNOUT } from '@/util/signout';
import axios from 'axios';

const Axios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_DOMAIN}/api`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  withCredentials: true,
  timeout: 10000
});

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    flightSlackMessage(
      `--- Axios Response Error --- || ${JSON.stringify(error)}`
    );
    if (error.response.status === 412 || error.response.status === 400) {
      const clientCode = error.response.data?.client_code as ClientCodeType;
      const errorDescription = error.response.data?.description;

      switch (clientCode) {
        case 'WALLET_ALREADY_REGISTERED':
          useHavahStore.getState().resetHavahInfo();
          useGlobalStore
            .getState()
            .setShowGlobalModalState(true, 'alreadyLinkedWallet');
          break;

        case 'DORMANCY_MEMBER':
        case 'WITHDRAWAL_MEMBER':
        case 'MULTI_LOGIN':
          SIGNOUT(clientCode);
          break;

        case 'BLOCK_MEMBER':
          localStateHandler.errorDescription.set(errorDescription);
          SIGNOUT(clientCode);
          break;

        case 'MAINTENANCE':
          localStateHandler.errorDescription.set(errorDescription);
          SIGNOUT(clientCode);
          break;

        case 'EMPTY_SESSION':
        case 'EMPTY_REDIS':
        case 'UNKNOWN':
          SIGNOUT();
          break;

        default:
          break;
      }
    }

    return Promise.reject(error.response.data);
  }
);

export default Axios;

export type ClientCodeType =
  | 'WALLET_ALREADY_REGISTERED'
  | 'DORMANCY_MEMBER'
  | 'WITHDRAWAL_MEMBER'
  | 'BLOCK_MEMBER'
  | 'MAINTENANCE'
  | 'MULTI_LOGIN'
  | 'EMPTY_SESSION'
  | 'EMPTY_REDIS'
  | 'UNKNOWN';
