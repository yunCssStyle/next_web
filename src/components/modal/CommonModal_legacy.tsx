'use client';
import React, { use } from 'react';
import { CommonModalLegacyStyle } from './modal.style';
import ButtonCustom from '../ButtonCustom';
import Image from 'next/image';
import { SVG } from '@/svg';
import useGlobalStore from '@/store/globalStore';
import useHavah from '@/hook/useHavah';
import { useRouter } from 'next/navigation';
import COLOR from '@/constants/COLOR';
import { scrollRelease } from '@/util/scrollLock';
import { LINK } from '@/constants/link';
import { localStateHandler } from '@/util/localStateHandler';
import { divide } from 'lodash';
import useTradingPostStore from '@/app/tradingpost/_store';
import useCampStore from '@/app/camp/_store';

interface CommonModalProps {
  type:
    | 'connectWallet'
    | 'installWallet'
    | 'alreadyUsedSocialAccount'
    | 'walletConnectionFailTestnet'
    | 'walletConnectionFailMainnet'
    | 'alreadyLinkedWallet'
    | 'success'
    | 'success_history_shortcut'
    | 'fail'
    | 'alreadyEquippedNFT'
    | 'welcome'
    | 'insufficientBalance'
    | 'multipleLoginModal'
    | 'conversionConfirmation'
    | 'deletedAccount'
    | 'blockedAccount'
    | 'checkHavahWallet';
  usePage?: 'global' | 'camp' | 'tradingpost';
  shortcut?: string;
}

export default function CommonModalLegacy({
  type,
  usePage = 'camp',
  shortcut = '/'
}: CommonModalProps) {
  const { connectHavahWallet, currentWalletChecker } = useHavah();
  const router = useRouter();

  const {
    showGlobalModalState,
    resetShowGlobalModalState
    // resetShowCampModalState,
    // showCampModalState
  } = useGlobalStore((state) => state);

  const { setShowCampModal, setSelectIndex, setOnClickOK, onClickOK } =
    useCampStore();
  const { setShowTradingPostModal } = useTradingPostStore();

  const _onClickClose = () => {
    switch (usePage) {
      case 'global':
        resetShowGlobalModalState();
        if (type === 'installWallet') {
          window.location.reload();
        }
        break;
      case 'camp':
        setShowCampModal(null);
        setSelectIndex(null);
        setOnClickOK(() => {});
        break;
      case 'tradingpost':
        setShowTradingPostModal(null);
        break;
    }

    switch (type) {
      case 'multipleLoginModal':
      case 'blockedAccount':
      case 'deletedAccount':
        scrollRelease();
        router.push('/');
        break;
      case 'alreadyLinkedWallet':
        showGlobalModalState.onClickOK && showGlobalModalState.onClickOK();
      default:
        break;
    }
  };

  const _onClickButton = async () => {
    switch (type) {
      case 'connectWallet':
        await currentWalletChecker();
        localStateHandler.walletConnect.set();
        connectHavahWallet();
        _onClickClose();
        break;

      case 'installWallet':
        window.open(
          'https://chrome.google.com/webstore/detail/havah-wallet/cnncmdhjacpkmjmkcafchppbnpnhdmon',
          '_blank'
        );
        break;
      case 'multipleLoginModal':
        scrollRelease();
        _onClickClose();
        router.push('/');

        break;
      case 'conversionConfirmation':
        onClickOK && onClickOK();
        break;
      case 'blockedAccount':
      case 'deletedAccount':
        window.open(LINK.ZENDESK, '_blank');
        break;
      default:
        _onClickClose();
        break;
    }
  };

  const errorDescription = JSON.parse(
    localStateHandler.errorDescription.get() ?? '{}'
  );

  return (
    <CommonModalLegacyStyle>
      <div className="modal">
        <div className="inner__container">
          <p
            className="title"
            dangerouslySetInnerHTML={{
              __html:
                type === 'blockedAccount' && errorDescription?.eternal
                  ? 'Permanently Blocked'
                  : modalType[type].title
            }}
          />
          {modalType[type].description && (
            <>
              <p
                className="description"
                dangerouslySetInnerHTML={{
                  __html: modalType[type]?.description ?? ''
                }}
              />
              {type === 'blockedAccount' && !errorDescription?.eternal && (
                <div className="blocked__until">
                  <span>Blocked Until: {errorDescription.endDateTime}</span>
                </div>
              )}
              {type === 'success_history_shortcut' && (
                // <>
                <p className="description">
                  Track the status of your transaction from your{' '}
                  <span
                    className="link"
                    onClick={() => {
                      _onClickClose();
                      router.push(shortcut);
                    }}
                  >
                    My History{' '}
                    {SVG.ICON.SHORTCUT_CUSTOM(COLOR['ORANGE__#FF570E'])}
                  </span>{' '}
                  page.
                  <br />
                  <span className="notification">
                    It may take a few seconds for the latest transaction record
                    to appear.
                    <br />
                    Please refresh the page if results are not shown.
                  </span>
                </p>
              )}
            </>
          )}
          <Image
            src={modalType[type].imgUrl}
            alt="modal image"
            width="160"
            height="160"
            quality={100}
          />
          <ButtonCustom onClick={_onClickButton}>
            {modalType[type].button}
          </ButtonCustom>
        </div>
      </div>
      {type === 'success_history_shortcut' ? (
        <> </>
      ) : (
        <div className="close" onClick={_onClickClose}>
          <SVG.ICON.CLOSE />
        </div>
      )}
    </CommonModalLegacyStyle>
  );
}

const modalType: {
  [key in CommonModalProps['type']]: {
    title: string;
    description?: string;
    imgUrl: string;
    button: string;
  };
} = {
  connectWallet: {
    title: 'Please connect HAVAH Wallet',
    description:
      'No HAVAH Wallet connected. <br/>Please connect your HAVAH Wallet.',

    imgUrl: '/assets/images/common_modal_img1.png',
    button: 'Connect HAVAH Wallet'
  },
  installWallet: {
    title: 'Please install HAVAH Wallet',
    description:
      'HAVAH Wallet not installed. Please install using the link below.',
    imgUrl: '/assets/images/common_modal_img2.png',
    button: 'Install HAVAH Wallet'
  },
  alreadyUsedSocialAccount: {
    title: 'Social media account already in use',
    description:
      'Google account already in use. Please log in using your Google account.',
    imgUrl: '/assets/images/common_modal_img3.png',
    button: 'OK'
  },
  fail: {
    title: 'Failed',
    description: 'Something went wrong.<br/>Please go back and try again.',
    imgUrl: '/assets/images/common_modal_img4.png',
    button: 'Close'
  },
  walletConnectionFailTestnet: {
    title: 'HAVAH Wallet connection failed',
    description: 'Change the network into the HAVAH Mainnet.',
    imgUrl: '/assets/images/common_modal_img4.png',
    button: 'Close'
  },
  walletConnectionFailMainnet: {
    title: 'HAVAH Wallet connection failed',
    description: 'Change the network into the HAVAH Testnet.',
    imgUrl: '/assets/images/common_modal_img4.png',
    button: 'Close'
  },
  alreadyLinkedWallet: {
    title: 'Already Linked HAVAH Wallet',
    description:
      'The HAVAH wallet has already been linked to another account.<br/>Try with another HAVAH wallet.',
    imgUrl: '/assets/images/common_modal_img3.png',
    button: 'OK'
  },
  success: {
    title: 'Success',
    description: 'Transaction confirmed.',
    imgUrl: '/assets/images/common_modal_img5.png',
    button: 'OK'
  },
  success_history_shortcut: {
    title: 'Success',
    description: 'Transaction confirmed.',
    imgUrl: '/assets/images/common_modal_img5.png',
    button: 'OK'
  },
  alreadyEquippedNFT: {
    title: 'Mining Right is active!',
    description: 'Deactivate the selected Mining Right from the app.',
    imgUrl: '/assets/images/common_modal_img6.png',
    button: 'Close'
  },
  welcome: {
    title: 'Welcome to the world of MINE WARZ!',
    imgUrl: '/assets/images/common_modal_img7.png',
    button: 'Close'
  },
  insufficientBalance: {
    title: 'Failed',
    description: 'Failed to confirm transaction.</br>(Insufficient balance)',
    imgUrl: '/assets/images/common_modal_img4.png',
    button: 'Close'
  },
  multipleLoginModal: {
    title: 'Multiple Logins Detected',
    description:
      'Multiple logins have been detected.<br/>You have been logged out from this page.',
    imgUrl: '/assets/images/common_modal_img3.png',
    button: 'OK'
  },
  conversionConfirmation: {
    title: 'Are you sure?',
    description:
      'Converting your highest level Mining Right will change your Mining Right settings.<br/>If you continue, your Mining Right settings will be initialized.',
    imgUrl: '/assets/images/common_modal_img3.png',
    button: 'OK'
  },
  blockedAccount: {
    title: 'Blocked Account',
    description:
      'Your account has been blocked.<br/>Please contact our support team for further assistance.',
    imgUrl: '/assets/images/common_modal_img8.png',
    button: 'Contact Support'
  },
  deletedAccount: {
    title: 'Deleted Account',
    description:
      'Your account has been deleted.<br/>Please contact our support team for further assistance.',
    imgUrl: '/assets/images/camp_empty_kiki.png',
    button: 'Contact Support'
  },
  checkHavahWallet: {
    title: 'Check your HAVAH Wallet',
    description:
      'Your HAVAH wallet has been altered or disconnected.<br/>Please check your wallet and try again.',
    imgUrl: '/assets/images/common_modal_img9.png',
    button: 'CLOSE'
  }
};
