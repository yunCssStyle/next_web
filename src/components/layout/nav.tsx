'use client';
import { use, useEffect, useState } from 'react';
import { SVG } from '@/svg';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import TooltipAccount from '@/components/layout/TooltipAccount';
import { NavStyle } from './layout.style';
import HamburgerMenu from './hamburgerMenu';
import Dim from '../Dim';
import WalletTooltip from './WalletTooltip';
import { scrollLock, scrollRelease } from '@/util/scrollLock';
import useHavah from '@/hook/useHavah';
import QUERY_CUSTOM from '@/query';
import ModalCustom from '../ModalCustom';
import useGlobalStore, { GlobalModalType } from '@/store/globalStore';
import CommonModalLegacy from '../modal/CommonModal_legacy';
import { apiHelper } from '@/util/apiHelper';
import useHavahStore from '@/store/havahStore';
import { useSession } from 'next-auth/react';
import { localStateHandler } from '@/util/localStateHandler';
import { windowCloser } from '@/util/windowCloser';
import { ClientCodeType } from '@/axios/axios';

// NAV
export default function Nav() {
  const { status } = useSession();
  const { userInfo, isFetching, refetch } = QUERY_CUSTOM.USER_INFO(
    status === 'authenticated'
  );
  const { connectHavahWallet, currentWalletChecker } = useHavah();
  const { havahWalletInfo, resetHavahInfo } = useHavahStore();
  const [ableFetchMZT, setAbleFetchMZT] = useState<NodeJS.Timeout | null>(null);
  const [showItem, setShowItem] = useState({
    hiddenMenu: false,
    account: false,
    wallet: false
  });
  const router = useRouter();

  // console.log('!!!', userInfo);
  const {
    showGlobalModalState,
    setShowGlobalModalState,
    setSigninRedirectUrl,
    onClickAccountDisabled,
    setOnClickAccountDisabled
  } = useGlobalStore();
  const { setBalanceOfMZT } = useHavahStore.getState();
  // menu action

  const pathname = usePathname();

  const _onClickLogo = () => {
    scrollRelease();
    _onClickShowItemAllFalse();
    setSigninRedirectUrl('/');
    router.push('/');
  };

  const _onClickHamburgerMenu = (e: any) => {
    e.stopPropagation();
    showItem.hiddenMenu ? scrollRelease() : scrollLock();
    setShowItem((state) => ({
      hiddenMenu: !state.hiddenMenu,
      account: false,
      wallet: false
    }));
  };

  const _onClickAccount = (e: any) => {
    e.stopPropagation();

    if (status === 'unauthenticated') {
      setShowItem(() => ({
        hiddenMenu: false,
        account: false,
        wallet: false
      }));
      scrollRelease();
      return router.push('/sign/signin');
    }
    //user info 가 있을때만
    if (status === 'authenticated') {
      setShowItem((state) => ({
        hiddenMenu: false,
        account: !state.account,
        wallet: false
      }));
      showItem.account ? scrollRelease() : scrollLock();
    }

    //refetch debounce
    if (!isFetching && !showItem.account && !onClickAccountDisabled) {
      setOnClickAccountDisabled(true);
      setTimeout(() => {
        setOnClickAccountDisabled(false);
      }, 3000);
      refetch();
    }
  };

  const _onClickWallet = async (e: any) => {
    e.stopPropagation();

    // When a non-connected wallet is selected
    const current = await window.havah?.accounts();
    if (havahWalletInfo.isHavahConnected && current?.address) {
      showItem.wallet ? scrollRelease() : scrollLock();

      //wallet open
      if (!showItem.wallet && ableFetchMZT === null) {
        setAbleFetchMZT(() =>
          setTimeout(() => {
            setAbleFetchMZT(null);
          }, 3000)
        );
        apiHelper
          .getBalanceOfMZT(havahWalletInfo.address)
          .then((balanceOfMZT) => {
            setBalanceOfMZT(balanceOfMZT);
          });
      }

      return setShowItem((state) => ({
        hiddenMenu: false,
        account: false,
        wallet: !state.wallet
      }));
    }

    await currentWalletChecker();
    localStateHandler.walletConnect.set();
    await connectHavahWallet();
  };

  const _onClickShowItemAllFalse = (e?: any) => {
    e && e.stopPropagation();
    setShowItem({
      hiddenMenu: false,
      account: false,
      wallet: false
    });
    scrollRelease();
  };

  // end menu action

  //component props

  const hamburgerMenuProps = {
    isOpen: showItem.hiddenMenu,
    onClickClose: _onClickShowItemAllFalse
  };

  // end component props

  useEffect(() => {
    if (userInfo && havahWalletInfo.address) {
      const getBalanceOfMZT = async () => {
        const balanceOfMZT = await apiHelper.getBalanceOfMZT(
          havahWalletInfo.address
        );
        setBalanceOfMZT(balanceOfMZT);
      };
      getBalanceOfMZT();
    }
  }, [havahWalletInfo.address, router, setBalanceOfMZT, userInfo]);

  useEffect(() => {
    let href = '';
    if (typeof window !== 'undefined') {
      href = window.location.href;
    }
    const clientCode: ClientCodeType | undefined = href.split(
      '?'
    )[1] as ClientCodeType;
    switch (clientCode) {
      case 'MULTI_LOGIN':
        setShowGlobalModalState(true, 'multipleLoginModal');
        scrollLock();
        break;
      // case 'DORMANCY_MEMBER':
      //   setShowGlobalModalState(true, 'deletedAccount');
      //   scrollLock();
      //   break;
      case 'WITHDRAWAL_MEMBER':
        setShowGlobalModalState(true, 'deletedAccount');
        scrollLock();
        break;
      case 'BLOCK_MEMBER':
        setShowGlobalModalState(true, 'blockedAccount');
        scrollLock();
        break;
      default:
        break;
    }
  }, [setShowGlobalModalState]);

  useEffect(() => {
    // popup close
    windowCloser();
    //

    setOnClickAccountDisabled(false);

    currentWalletChecker('onlyEmptyAddress');
    window.addEventListener('focus', async () => {
      const currentWalletAddress = await window.havah?.accounts();
      if (!currentWalletAddress?.address) {
        resetHavahInfo();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <NavStyle onClick={_onClickShowItemAllFalse}>
        <div className="hamburger__menu">
          <div className="hamburger__button" onClick={_onClickHamburgerMenu}>
            <SVG.ICON.HAMBURGER />
          </div>
        </div>
        <Image
          className="minewarz__logo"
          src={'/assets/images/nav_logo.png'}
          alt="logo"
          onClick={_onClickLogo}
          width={70}
          height={40}
          priority
        />
        <div className="wallet__account">
          {status === 'authenticated' && (
            <div
              className={`wallet ${
                havahWalletInfo.isHavahConnected ? 'connect' : ''
              }`}
              onClick={_onClickWallet}
            >
              {havahWalletInfo.isHavahConnected ? (
                <SVG.ICON.WALLET_CHECKED />
              ) : (
                <SVG.ICON.WALLET />
              )}
            </div>
          )}
          <div className={`account`} onClick={_onClickAccount}>
            <SVG.ICON.ACCOUNT />
          </div>
        </div>

        {/* modal */}
        <WalletTooltip
          isOpen={showItem.wallet}
          onClickClose={_onClickShowItemAllFalse}
        />
        <TooltipAccount
          isOpen={showItem.account}
          onClickClose={_onClickShowItemAllFalse}
        />
        <HamburgerMenu {...hamburgerMenuProps} />
      </NavStyle>
      {(showItem.account || showItem.wallet) && (
        <Dim onClick={_onClickShowItemAllFalse} />
      )}
      <ModalCustom isOpen={showGlobalModalState.show}>
        <>{modalType[showGlobalModalState.type]}</>
      </ModalCustom>
    </>
  );
}

const modalType: {
  [key in GlobalModalType]: JSX.Element;
} = {
  connectWallet: <CommonModalLegacy type="connectWallet" usePage="global" />,
  installWallet: <CommonModalLegacy type="installWallet" usePage="global" />,
  alreadyLinkedWallet: (
    <CommonModalLegacy type="alreadyLinkedWallet" usePage="global" />
  ),
  alreadyUsedSocialAccount: (
    <CommonModalLegacy type="alreadyUsedSocialAccount" usePage="global" />
  ),
  walletConnectionFailTestnet: (
    <CommonModalLegacy type="walletConnectionFailTestnet" usePage="global" />
  ),
  walletConnectionFailMainnet: (
    <CommonModalLegacy type="walletConnectionFailMainnet" usePage="global" />
  ),
  multipleLoginModal: (
    <CommonModalLegacy type="multipleLoginModal" usePage="global" />
  ),
  deletedAccount: <CommonModalLegacy type="deletedAccount" usePage="global" />,
  blockedAccount: <CommonModalLegacy type="blockedAccount" usePage="global" />,

  '': <div />
};
