import { create } from 'zustand';

// ! --------------------- Global Store Type ---------------------
export type statResetModalType = 'connectWallet' | '';

export type campModalType =
  | 'selectMiningRight'
  | 'infoMiningRight'
  | 'selectPioneer'
  | 'infoPioneer'
  | 'loadingConvertingToNFT'
  | 'loadingConvertingToMinewarz'
  | 'loadingConvertingToMinewarzVerification'
  | 'connectWallet'
  | 'installWallet'
  | 'alreadyUsedSocialAccount'
  | 'success'
  | 'successTransaction'
  | 'fail'
  | 'alreadyEquippedNFT'
  | 'welcome'
  | 'conversionConfirmation'
  | 'checkHavahWallet'
  | 'otp-valid'
  | '';

export type GlobalModalType =
  | 'connectWallet'
  | 'installWallet'
  | 'alreadyLinkedWallet'
  | 'alreadyUsedSocialAccount'
  | 'walletConnectionFailTestnet'
  | 'walletConnectionFailMainnet'
  | 'multipleLoginModal'
  | 'deletedAccount'
  | 'blockedAccount'
  | '';

export type signinRedirectUrlType =
  | '/'
  | '/camp'
  | '/tradingpost'
  | '/history'
  | string;

interface IUseGlobalStore {
  //positionY
  positionY: number;
  setPositionY: (positionY?: number) => void;
  resetPositionY: () => void;

  //account disabled
  onClickAccountDisabled: boolean;
  setOnClickAccountDisabled: (param: boolean) => void;

  //camp layout selected
  campLayoutSelected: 'pioneer' | 'miningRight' | '';
  setCampLayoutSelected: (selected: 'pioneer' | 'miningRight') => void;

  //camp layout selected
  historyLayoutSelected: 'convertHistory' | 'miningRight' | '';
  setHistoryLayoutSelected: (
    selected: 'convertHistory' | 'miningRight'
  ) => void;

  //Global Modal state
  showGlobalModalState: {
    show: boolean;
    type: GlobalModalType;
    selectIndex?: number | null;
    onClickOK?: () => void;
  };
  setShowGlobalModalState: (
    show: boolean,
    type: GlobalModalType,
    selectIndex?: number | null,
    onClickOK?: () => void
  ) => void;
  resetShowGlobalModalState: () => void;

  //Camp Modal state
  // showCampModalState: {
  //   show: boolean;
  //   type: campModalType;
  //   selectIndex?: number;
  //   onClickOK?: () => void;
  // };
  // setShowCampModalState: (
  //   show: boolean,
  //   type: campModalType,
  //   selectIndex?: number,
  //   onClickOK?: () => void
  // ) => void;
  // resetShowCampModalState: () => void;

  //sign layout selected
  signLayoutSelected: 'signin' | 'signup';
  setSignLayoutSelected: (selected: 'signin' | 'signup') => void;

  //history pagination
  currentPageNumber: number;
  setCurrentPageNumber: (currentPageNumber: number) => void;
  resetCurrentPageNumber: () => void;

  currentModalPageNumber: number;
  setCurrentModalPageNumber: (currentModalPageNumber: number) => void;
  resetCurrentModalPageNumber: () => void;

  //_convertToMZT
  convertToMZT: { amount: number; fee: number };
  setConvertToMZT: (param: { amount: number; fee: number }) => void;

  //filterMiningRight
  filterMiningRight: number[];
  setFilterMiningRight: (param: number[]) => void;

  //filterPioneer
  filterPioneer: number[];
  setFilterPioneer: (param: number[]) => void;

  //signin redirect url
  signinRedirectUrl: signinRedirectUrlType;
  setSigninRedirectUrl: (param: signinRedirectUrlType) => void;
}

//! --------------------- Initial State ---------------------
//Camp Modal initial state
// const showCampModalInitialState: IUseGlobalStore['showCampModalState'] = {
//   show: false,
//   type: '',
//   selectIndex: 0
// };

//! --------------------- Global Store ---------------------

const useGlobalStore = create<IUseGlobalStore>((set, get) => ({
  // positionY
  positionY: 0,

  setPositionY: (positionY) =>
    set(() => {
      return { positionY: positionY === 0 ? positionY : window.scrollY };
    }),

  resetPositionY: () => set(() => ({ positionY: 0 })),

  // account disabled
  onClickAccountDisabled: false,
  setOnClickAccountDisabled: (param) =>
    set(() => ({ onClickAccountDisabled: param })),

  // camp layout selected
  campLayoutSelected: '',
  setCampLayoutSelected: (selected: 'pioneer' | 'miningRight') =>
    set(() => ({ campLayoutSelected: selected })),

  // history layout selected
  historyLayoutSelected: '',
  setHistoryLayoutSelected: (selected: 'convertHistory' | 'miningRight') =>
    set(() => ({ historyLayoutSelected: selected })),

  //Global Modal state
  showGlobalModalState: {
    show: false,
    type: ''
  },
  setShowGlobalModalState: (show, type, index, onClickOK) =>
    set(() => ({
      showGlobalModalState: {
        show,
        type,
        index,
        onClickOK: onClickOK ? onClickOK : () => {}
      }
    })),
  resetShowGlobalModalState: () =>
    set(() => ({
      showGlobalModalState: { show: false, type: '', onClickOK: undefined }
    })),

  // camp page Modal state
  // showCampModalState: showCampModalInitialState,

  // setShowCampModalState: (
  //   show: boolean,
  //   type: campModalType,
  //   selectIndex?: number,
  //   onClickOK?: () => void
  // ) =>
  //   set(() => ({ showCampModalState: { show, type, selectIndex, onClickOK } })),

  // resetShowCampModalState: () =>
  //   set(() => ({ showCampModalState: showCampModalInitialState })),

  //sign layout selected
  signLayoutSelected: 'signin',
  setSignLayoutSelected: (selected: 'signin' | 'signup') =>
    set(() => ({ signLayoutSelected: selected })),

  // pagination
  currentPageNumber: 1,
  setCurrentPageNumber: (currentPageNumber) =>
    set(() => ({
      currentPageNumber:
        currentPageNumber === 0 ? currentPageNumber : currentPageNumber
    })),
  resetCurrentPageNumber: () => set(() => ({ currentPageNumber: 1 })),

  // modal pagination
  currentModalPageNumber: 1,
  setCurrentModalPageNumber: (currentModalPageNumber) =>
    set(() => ({
      currentModalPageNumber:
        currentModalPageNumber === 0
          ? currentModalPageNumber
          : currentModalPageNumber
    })),
  resetCurrentModalPageNumber: () => set(() => ({ currentModalPageNumber: 1 })),

  //_convertToMZT
  convertToMZT: { amount: 0, fee: 0 },
  setConvertToMZT: (convertToMZT) =>
    set(() => {
      return { convertToMZT: convertToMZT };
    }),

  //filterMiningRight
  filterMiningRight: [],
  setFilterMiningRight: (filterMiningRight) =>
    set(() => {
      return { filterMiningRight: filterMiningRight };
    }),

  //filterPioneer
  filterPioneer: [],
  setFilterPioneer: (filterPioneer) =>
    set(() => {
      return { filterPioneer: filterPioneer };
    }),

  // signin redirect url
  signinRedirectUrl: process.env.NEXT_PUBLIC_DOMAIN + '/',
  setSigninRedirectUrl: (signinRedirectUrl) =>
    set(() => {
      return {
        signinRedirectUrl: process.env.NEXT_PUBLIC_DOMAIN + signinRedirectUrl
      };
    })

  // ---------------------
}));

export default useGlobalStore;
