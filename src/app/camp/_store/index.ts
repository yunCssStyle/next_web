import { create } from 'zustand';

type CampModalType =
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
  | 'converting'
  | 'otp-valid'
  | null;

interface IUseCampStore {
  showMiningrightFilter: boolean;
  setShowMiningrightFilter: (show: boolean) => void;

  showPioneerFilter: boolean;
  setShowPioneerFilter: (show: boolean) => void;

  showCampModal: CampModalType;
  setShowCampModal: (show: CampModalType) => void;

  selectIndex: number | null;
  setSelectIndex: (index: number | null) => void;

  onClickOK?: () => void;
  setOnClickOK: (onClick: () => void) => void;
}

const useCampStore = create<IUseCampStore>((set, get) => ({
  showMiningrightFilter: false,
  setShowMiningrightFilter: (show) =>
    set(() => ({ showMiningrightFilter: show })),

  showPioneerFilter: false,
  setShowPioneerFilter: (show) => set(() => ({ showPioneerFilter: show })),

  showCampModal: null,
  setShowCampModal: (show) => set(() => ({ showCampModal: show })),

  selectIndex: 0,
  setSelectIndex: (index) => set(() => ({ selectIndex: index })),
  onClickOK: () => {},
  setOnClickOK: (onClick) => set(() => ({ onClickOK: onClick }))
}));

export default useCampStore;
