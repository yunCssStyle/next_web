'use client';

import { TradingPostLayoutStyle } from './layout.style';
import useGlobalStore from '@/store/globalStore';
import OTPValidModal from '@/components/modal/OTPValidModal';
import TradingPostConvertModal from '@/app/tradingpost/_clinet/TradingPostConvertModal';
import LoadingConvertingModal from '@/components/modal/LoadingConvertingModal';
import { useEffect } from 'react';
import { scrollLock, scrollRelease } from '@/util/scrollLock';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useTradingPostStore from './_store';

import TransactionRequestedModal from '../../components/modal/TransactionRequestedModal';
import CheckYourHavahWalletModal from '@/components/modal/CheckYourHavahWalletModal';
import TransactionSuccessModal from '@/components/modal/TransactionSuccessModal';
import CommonModal from '@/components/modal/CommonModal';
import { Modal } from '@mui/material';
import useHavah from '@/hook/useHavah';

export default function TradingPostLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { setSigninRedirectUrl, convertToMZT } = useGlobalStore();

  const { showTradingPostModal, setShowTradingPostModal } =
    useTradingPostStore();
  const router = useRouter();
  const { status } = useSession();

  const { covertGoldToMZT } = useHavah();

  const showTradingPostModalCloser = () => {
    setShowTradingPostModal(null);
  };

  useEffect(() => {
    setShowTradingPostModal(null);
    if (status === 'unauthenticated') {
      setSigninRedirectUrl('/tradingpost');
      router.push('/sign/signin');
    }
  }, [status, router, setSigninRedirectUrl, setShowTradingPostModal]);

  useEffect(() => {
    if (showTradingPostModal) {
      scrollLock();
    } else {
      scrollRelease();
    }
  }, [showTradingPostModal]);

  const otpValidCallback = (publicKey: string) => {
    covertGoldToMZT({ publicKey, ...convertToMZT });
  };

  //todo legacy 제거 -> commonModal 로 수정
  return (
    <TradingPostLayoutStyle>
      {children}

      <Modal open={!!showTradingPostModal}>
        <>
          {showTradingPostModal === 'convertAsset' && (
            <TradingPostConvertModal />
          )}

          {showTradingPostModal === 'otpValid' && (
            <OTPValidModal
              callback={otpValidCallback}
              onClose={() => setShowTradingPostModal(null)}
              showConvertingCallback={() =>
                setShowTradingPostModal('converting')
              }
              showFailedCallback={() => setShowTradingPostModal('fail')}
            />
          )}

          {showTradingPostModal === 'converting' && (
            <LoadingConvertingModal
              title="Converting..."
              comment="Awaiting confirmation..."
              subComment="Confirm this transaction in your HAVAH Wallet."
            />
          )}

          {showTradingPostModal === 'checkHavahWallet' && (
            <CheckYourHavahWalletModal
              onClickClose={showTradingPostModalCloser}
            />
          )}

          {showTradingPostModal === 'successTransactionRequest' && (
            <TransactionRequestedModal
              myHistoryUrl="/history/convert?page=1"
              onClose={showTradingPostModalCloser}
            />
          )}

          {showTradingPostModal === 'success' && (
            <TransactionSuccessModal
              onClose={showTradingPostModalCloser}
              myHistoryUrl="/history/convert?page=1"
            />
          )}

          {showTradingPostModal === 'fail' && (
            <CommonModal
              isOpen
              title="Failed"
              imageName="kiki_fail"
              buttonText="Close"
              onClose={showTradingPostModalCloser}
              onClickButton={showTradingPostModalCloser}
              hideBackdrop
            >
              <p>Something went wrong.</p>
              <p>Please go back and try again.</p>
            </CommonModal>
          )}

          {showTradingPostModal === 'insufficientBalance' && (
            <CommonModal
              isOpen
              title="Failed"
              imageName="kiki_fail"
              buttonText="Close"
              onClose={showTradingPostModalCloser}
              onClickButton={showTradingPostModalCloser}
              hideBackdrop
            >
              <p>Failed to confirm transaction.</p>
              <p>(Insufficient balance)</p>
            </CommonModal>
          )}

          {showTradingPostModal === 'memberWithdrawLimit' && (
            <CommonModal
              isOpen
              title="Failed"
              buttonText="Close"
              imageName="kiki_fail"
              onClose={showTradingPostModalCloser}
              onClickButton={showTradingPostModalCloser}
            >
              <p>
                You have attempted to convert an <span>amount exceeding</span>
              </p>
              <p>today’s Gold to MZT conversion limit.</p>
            </CommonModal>
          )}

          {showTradingPostModal === 'systemWithdrawLimit' && (
            <CommonModal
              isOpen
              title="Failed"
              buttonText="Close"
              imageName="kiki_fail"
              onClose={showTradingPostModalCloser}
              onClickButton={showTradingPostModalCloser}
            >
              <p>
                You have attempted to convert an <span>amount exceeding</span>
              </p>
              <p>
                the overall limit of the pool for Gold to{' '}
                <span>MZT conversion today.</span>
              </p>
            </CommonModal>
          )}
        </>
      </Modal>
    </TradingPostLayoutStyle>
  );
}
