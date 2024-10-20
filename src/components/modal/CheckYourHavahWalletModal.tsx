import React from 'react';
import CommonModal from './CommonModal';

interface Props {
  onClickClose: () => void;
}
export default function CheckYourHavahWalletModal({ onClickClose }: Props) {
  return (
    <CommonModal
      isOpen
      title="Check Your Havah Wallet"
      imageName="kiki_fail_wallet"
      buttonText="CLOSE"
      onClickButton={onClickClose}
      onClose={onClickClose}
      hideBackdrop
    >
      <p>Your HAVAH wallet has been altered or disconnected.</p>
      <p>Please check your wallet and try again.</p>
    </CommonModal>
  );
}
