import { localStateHandler } from '@/util/localStateHandler';
import { create } from 'zustand';

interface state {
  havahWalletInfo: {
    address: string;
    nid: string;
    isHavahConnected: boolean;
  };
  balanceOfMZT: number;

  isForceDisconnect: boolean;

  setHavahInfo: (havahWalletInfo: state['havahWalletInfo']) => void;
  setBalanceOfMZT: (balanceOfMZT: number) => void;

  resetHavahInfo: () => void;
  setForceDisconnect: (state: boolean) => void;
}

//Camp Modal initial state

const initialState: state['havahWalletInfo'] = {
  address: '',
  nid: '',
  isHavahConnected: false
};

const useHavahStore = create<state>((set, get) => ({
  havahWalletInfo: initialState,
  isForceDisconnect: true, //todo 이거 redis로 ? localstate
  balanceOfMZT: 0,

  setHavahInfo(state) {
    // if (get().isForceDisconnect) return;
    localStateHandler.havahWalletInfo.set(state);

    set(() => ({ havahWalletInfo: state }));
  },

  resetHavahInfo() {
    localStateHandler.havahWalletInfo.reset();
    localStateHandler.walletConnect.reset();
    set(() => ({ havahWalletInfo: initialState }));
  },

  setForceDisconnect(state: boolean) {
    set(() => ({
      isForceDisconnect: state
    }));
  },

  setBalanceOfMZT(state: number) {
    set(() => ({
      balanceOfMZT: state
    }));
  }
}));

export default useHavahStore;
