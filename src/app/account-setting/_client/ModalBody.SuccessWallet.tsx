import React from 'react';
import { ModalBodySuccessStyle } from './style';

export default function ModalBodySuccessWallet() {
  return (
    <ModalBodySuccessStyle>
      <p>Your wallet has been verified!</p>
      <p>Continue with the registration of Google Authenticator.</p>
      <p>
        When re-registering, the wallet change will not be saved unless OTP
        registration is completed.
      </p>
    </ModalBodySuccessStyle>
  );
}
