import { create } from 'zustand';

type openModalType =
  | 'otpValid'
  | 'convertAsset'
  | 'converting'
  | 'success'
  | 'successTransactionRequest'
  | 'fail'
  | 'insufficientBalance'
  | 'checkHavahWallet'
  | 'memberWithdrawLimit'
  | 'systemWithdrawLimit'
  | null;

interface ITradingPostStore {
  showTradingPostModal: openModalType;
  setShowTradingPostModal: (modalType: openModalType) => void;
}

const useTradingPostStore = create<ITradingPostStore>((set) => ({
  showTradingPostModal: null,
  setShowTradingPostModal: (modalType) =>
    set(() => ({ showTradingPostModal: modalType }))
}));

export default useTradingPostStore;
