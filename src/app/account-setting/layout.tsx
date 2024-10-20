'use client';
import CommonModal from '@/components/modal/CommonModal';
import React, { useEffect, useState } from 'react';

import LoadingModal from '@/components/modal/LoadingModal';
import ModalBodyConnectWallet from './_client/ModalBody.ConnectWallet';
import ModalBodyVerification from './_client/ModalBody.Verification';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useAccountStore from './_store';
import CommonLoading from '@/components/CommonLoading';
import ModalBodySuccessWallet from './_client/ModalBody.SuccessWallet';
import { scrollLock, scrollRelease } from '@/util/scrollLock';
import { Modal } from '@mui/material';

export default function CampLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const router = useRouter();
  const { modalType, setModalType } = useAccountStore((state) => state);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, status]);

  useEffect(() => {
    if (modalType) {
      scrollLock();
    } else {
      scrollRelease();
    }
  }, [modalType]);

  useEffect(() => {
    setModalType(null);
  }, [setModalType]);

  return (
    <>
      {children}

      <Modal open={!!modalType}>
        <>
          {modalType === 'verification' && (
            <CommonModal
              isOpen
              onClose={() => {
                setModalType(null);
              }}
              hideBackdrop
            >
              <ModalBodyVerification />
            </CommonModal>
          )}

          {modalType === 'verifying' && (
            <LoadingModal
              isOpen
              title="Verifying your wallet..."
              description="Waiting for verification…"
              subDescription="Verify from your HAVAH Wallet."
              hideBackdrop
            />
          )}

          {modalType === 'successVerifyWallet' && (
            <CommonModal
              isOpen
              title="Success!"
              imageName="papa_success"
              buttonText="Close"
              hideBackdrop
              onClickButton={() => setModalType('verification')}
            >
              <ModalBodySuccessWallet />
            </CommonModal>
          )}

          {modalType === 'connectWallet' && (
            <CommonModal
              isOpen
              title="Connect the wallet used for verification"
              imageName="kiki_fail_wallet"
              buttonText="Close"
              hideBackdrop
              onClickButton={() => {
                setModalType(null);
              }}
              onClose={() => {
                setModalType(null);
              }}
            >
              <ModalBodyConnectWallet />
            </CommonModal>
          )}

          {modalType === 'successVerifyActivate' && (
            <CommonModal
              isOpen
              title="Success"
              imageName="papa_success"
              buttonText="Close"
              hideBackdrop
              onClickButton={() => {
                setModalType(null);
              }}
              onClose={() => {
                setModalType(null);
              }}
            >
              2-step verification has been set up successfully.
            </CommonModal>
          )}

          {modalType === 'fail' && (
            <CommonModal
              isOpen
              title="Failed"
              imageName="kiki_fail"
              buttonText="Close"
              hideBackdrop
              onClickButton={() => {
                setModalType(null);
              }}
              onClose={() => {
                setModalType(null);
              }}
            >
              Please try again.
            </CommonModal>
          )}

          {modalType === 'loading' && <CommonLoading hideBackdrop />}
        </>
      </Modal>
    </>
  );
}
