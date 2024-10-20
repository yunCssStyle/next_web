// localstateHandler.ts

// import { LocalState } from '../types';

export const localStateHandler = {
  havahWalletInfo: {
    set: (havahWalletInfo: any) => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(
          'havahWalletInfo',
          JSON.stringify(havahWalletInfo)
        );
      }
    },
    reset: () => {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('havahWalletInfo');
      }
    },
    get: () => {
      if (typeof window !== 'undefined') {
        return JSON.parse(
          window.localStorage.getItem('havahWalletInfo') ?? 'null'
        );
      }
      return null;
    }
  },

  walletConnect: {
    set: () => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('walletConnect', JSON.stringify(true));
      }
    },
    reset: () => {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('walletConnect');
      }
    },
    get: () => {
      if (typeof window !== 'undefined') {
        return JSON.parse(
          window.localStorage.getItem('walletConnect') ?? 'false'
        );
      }
      return false;
    }
  },

  errorDescription: {
    set: (description: string) => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(
          'errorDescription',
          JSON.stringify(description)
        );
      }
    },
    reset: () => {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('errorDescription');
      }
    },
    get: () => {
      if (typeof window !== 'undefined') {
        return JSON.parse(
          window.localStorage.getItem('errorDescription') ?? 'null'
        );
      }
      return null;
    }
  }
};
