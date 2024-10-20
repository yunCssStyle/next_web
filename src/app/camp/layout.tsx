'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CampLayoutStyle } from './layout.style';
import useGlobalStore from '@/store/globalStore';
import MiningRightSelectModal from '@/app/camp/_client/MiningRightSelectModal';
import { scrollLock, scrollRelease } from '@/util/scrollLock';
import MiningRightInfoModal from '@/app/camp/_client/MiningRightInfoModal';
import PioneerSelectModal from '@/app/camp/_client/PioneerSelectModal';
import PioneerInfoModal from '@/app/camp/_client/PioneerInfoModal';
import LoadingConvertingModal from '@/components/modal/LoadingConvertingModal';
import CommonModalLegacy from '@/components/modal/CommonModal_legacy';
import PageMenuButton from '@/components/PageMenuButton';
import { useSession } from 'next-auth/react';
import TransactionRequestedModal from '@/components/modal/TransactionRequestedModal';
import TransactionSuccessModal from '@/components/modal/TransactionSuccessModal';
import OTPValidModal from '@/components/modal/OTPValidModal';
import useHavah from '@/hook/useHavah';
import useHavahStore from '@/store/havahStore';
import QUERY_CUSTOM from '@/query';
import { Modal } from '@mui/material';
import useCampStore from './_store';

export default function CampLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const {
    campLayoutSelected,
    setSigninRedirectUrl,
    setCurrentPageNumber,
    currentPageNumber,
    filterMiningRight
  } = useGlobalStore((state) => state);

  const {
    showCampModal,
    setShowCampModal,
    selectIndex,
    setSelectIndex,
    setOnClickOK
  } = useCampStore();
  const { exportMiningRights } = useHavah();
  const {} = useHavahStore();

  const { data: session, status } = useSession();

  //check user info
  const index = selectIndex ?? 0;

  const { data } = QUERY_CUSTOM.MINING_RIGHT_LOCK_UP_LIST_PAGE(
    currentPageNumber,
    !!session,
    filterMiningRight
  );
  const selectedData = data?.mines[index];

  useEffect(() => {
    setShowCampModal(null);
    setSelectIndex(null);
    setOnClickOK(() => {});

    if (status === 'unauthenticated') {
      setSigninRedirectUrl('/camp');
      router.push('/sign/signin');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, router, setSigninRedirectUrl]);

  //check modal
  useEffect(() => {
    if (showCampModal) {
      scrollLock();
    } else {
      scrollRelease();
    }
  }, [showCampModal]);

  //click event
  const _onClickMiningRight = () => {
    setCurrentPageNumber(1);
    router.push('/camp/miningright?page=1');
  };

  const _onClickPioneer = () => {
    setCurrentPageNumber(1);
    router.push('/camp/pioneer?page=1');
  };

  const _onClickCallback = async (publicKey: string) => {
    if (!selectedData) return setShowCampModal(null);
    exportMiningRights({
      publicKey,
      id: selectedData.id,
      level: selectedData.level
    });
  };

  const _onClickCloseModal = () => {
    setShowCampModal(null);
    setSelectIndex(null);
    setOnClickOK(() => {});
  };

  return (
    <CampLayoutStyle>
      <h1>Camp</h1>
      <div className="menu__box">
        <PageMenuButton
          text="mining right"
          onClick={_onClickMiningRight}
          selected={campLayoutSelected === 'miningRight'}
        />
        <div className="gap" />
        <PageMenuButton
          text="pioneer"
          subText="profile card"
          onClick={_onClickPioneer}
          selected={campLayoutSelected === 'pioneer'}
        />
      </div>
      {children}

      <Modal open={!!showCampModal}>
        <>
          {showCampModal === 'selectMiningRight' && <MiningRightSelectModal />}
          {showCampModal === 'infoMiningRight' && <MiningRightInfoModal />}
          {showCampModal === 'selectPioneer' && <PioneerSelectModal />}
          {showCampModal === 'infoPioneer' && <PioneerInfoModal />}
          {showCampModal === 'loadingConvertingToNFT' && (
            <LoadingConvertingModal
              title="Converting Mining Right to NFT..."
              comment="Awaiting confirmation..."
              subComment="  Confirm this transaction in your HAVAH Wallet."
            />
            // <LoadingConvertingModal type="toNft" />
          )}
          {showCampModal === 'loadingConvertingToMinewarz' && (
            <LoadingConvertingModal
              title="Moving to the world of MINE WARZ..."
              comment="Waiting for verification..."
              subComment="Verify from your HAVAH Wallet."
            />
          )}
          {showCampModal === 'loadingConvertingToMinewarzVerification' && (
            <LoadingConvertingModal
              title="Converting..."
              comment="Waiting for verification..."
              subComment="Verify from your HAVAH Wallet."
            />
          )}

          {showCampModal === 'connectWallet' && (
            <CommonModalLegacy type="connectWallet" />
          )}
          {showCampModal === 'installWallet' && (
            <CommonModalLegacy type="installWallet" />
          )}
          {showCampModal === 'alreadyUsedSocialAccount' && (
            <CommonModalLegacy type="alreadyUsedSocialAccount" />
          )}
          {showCampModal === 'success' && (
            <TransactionSuccessModal
              myHistoryUrl="/history/miningright?page=1"
              onClose={_onClickCloseModal}
            />
          )}
          {showCampModal === 'successTransaction' && (
            <TransactionRequestedModal
              myHistoryUrl="/history/miningright?page=1"
              onClose={_onClickCloseModal}
            />
          )}
          {showCampModal === 'fail' && <CommonModalLegacy type="fail" />}
          {showCampModal === 'alreadyEquippedNFT' && (
            <CommonModalLegacy type="alreadyEquippedNFT" />
          )}
          {showCampModal === 'welcome' && <CommonModalLegacy type="welcome" />}
          {showCampModal === 'conversionConfirmation' && (
            <CommonModalLegacy type="conversionConfirmation" usePage="camp" />
          )}
          {showCampModal === 'checkHavahWallet' && (
            <CommonModalLegacy type="checkHavahWallet" usePage="camp" />
          )}
          {showCampModal === 'converting' && (
            <LoadingConvertingModal
              title="Converting..."
              comment="Awaiting confirmation..."
              subComment="Confirm this transaction in your HAVAH Wallet."
            />
          )}
          {showCampModal === 'otp-valid' && (
            <OTPValidModal
              callback={_onClickCallback}
              showConvertingCallback={() => setShowCampModal('converting')}
              onClose={_onClickCloseModal}
              showFailedCallback={() => setShowCampModal('fail')}
            />
          )}
        </>
      </Modal>
    </CampLayoutStyle>
  );
}
