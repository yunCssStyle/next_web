import React from 'react';
import { ModalBodyConnectWalletStyle } from './style';
import QUERY_CUSTOM from '@/query';

export default function ModalBodyConnectWallet() {
  const { userInfo } = QUERY_CUSTOM.USER_INFO();

  return (
    <ModalBodyConnectWalletStyle>
      <p>Change your HAVAH wallet to the following wallet</p>
      <p>in order to re-register 2-Step Verification :</p>
      <p>{userInfo?.user?.address}</p>
    </ModalBodyConnectWalletStyle>
  );
}
