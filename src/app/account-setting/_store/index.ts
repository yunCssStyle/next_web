import { create } from 'zustand';

export type openModalType =
  | 'verification'
  | 'verifying'
  | 'successVerifyWallet'
  | 'connectWallet'
  | 'loading'
  | 'successVerifyActivate'
  | 'fail'
  | null;
interface IAccountStore {
  modalType: openModalType;
  setModalType: (modalType: openModalType) => void;

  verifiedAddress: string;
  setVerifiedAddress: (address: string) => void;
}

const useAccountStore = create<IAccountStore>((set, get) => ({
  modalType: null,
  setModalType: (modalType: openModalType) => set({ modalType }),

  verifiedAddress: '',
  setVerifiedAddress: (verifiedAddress: string) =>
    set({ verifiedAddress: verifiedAddress })
}));

export default useAccountStore;
