import React, { useEffect, useState } from 'react';
import ButtonCustom from '../ButtonCustom';
import { SVG } from '@/svg';
import InputBlock from '../../app/tradingpost/_clinet/TradingPostMailValidModal.InputBlock';
import Axios from '@/axios/axios';
import useHavahStore from '@/store/havahStore';
import { TradingPostMailValidModalStyle } from '../../app/tradingpost/_clinet/style';
import CommonModal from '@/components/modal/CommonModal';
import COLOR from '@/constants/COLOR';
import CommonLoading from '@/components/CommonLoading';
import { CONSTANTS } from '@/constants/CONSTANTS';

type hasErrorType = {
  hasError: boolean;
  message: 'Already sent. Try again in a minute.' | 'Incorrect code.' | null;
};

interface OTPValidModalProps {
  callback: (publicKey: string) => void;
  showConvertingCallback: () => void;
  showFailedCallback: () => void;
  onClose: () => void;
}

export default function OTPValidModal({
  callback,
  showConvertingCallback,
  showFailedCallback,

  onClose
}: OTPValidModalProps) {
  const [codeArr, setCodeArr] = useState<string[]>(['', '', '', '', '', '']);
  const [thisModalState, setThisModalState] = useState({
    canSendValidCode: true,
    hasSentValidCode: false,
    isConfirmButtonDisabledForce: false
  });
  const [hasError, setHasError] = useState<hasErrorType>({
    hasError: false,
    message: null
  });

  const [isLoading, setIsLoading] = useState(false);

  const { havahWalletInfo } = useHavahStore();

  const _onClickConfirm = async () => {
    // otp-valid
    if (havahWalletInfo.address === '') {
      return showFailedCallback();
    }

    const timeout = setTimeout(() => {
      setIsLoading(true);
    }, CONSTANTS.LOADING_DELAY_TIME);

    const otpCode = codeArr.join('');

    Axios.get('tradingpost/otp-verify', {
      params: { otpCode }
    })
      .then((res) => {
        // if otp-valid
        showConvertingCallback && showConvertingCallback();
        const publicKey = res.data.publicKey;
        callback(publicKey);
      })
      .catch((err) => {
        clearTimeout(timeout);
        setIsLoading(false);

        setHasError({
          hasError: true,
          message: 'Incorrect code.'
        });
      });
  };

  const _onChangeCode = (code: string[]) => {
    setHasError({
      hasError: false,
      message: null
    });
    setCodeArr(code);
    setThisModalState({
      ...thisModalState,
      isConfirmButtonDisabledForce: false
    });
  };

  useEffect(() => {
    if (havahWalletInfo.address === '') {
      showFailedCallback();
    }
  }, [havahWalletInfo, showFailedCallback]);

  return (
    <CommonModal
      isOpen
      onClose={onClose}
      bgColor={COLOR['GRAY8__#FAFAFA']}
      hideBackdrop
    >
      <TradingPostMailValidModalStyle>
        <h2>Security Verification</h2>
        <div className="notification">
          <p>Check your Google Authenticator app and enter the code.</p>
        </div>
        <div className="code__input">
          {codeArr.map((item, index) => (
            <InputBlock
              key={index}
              item={item}
              index={index}
              codeArr={codeArr}
              onChange={_onChangeCode}
            />
          ))}
        </div>

        <div className="information__list">
          <div className="information">
            <div className="dot" />
            <p>
              You&apos;ll get MZT at this wallet address.{' '}
              <strong>({havahWalletInfo.address})</strong>
            </p>
          </div>
          <div className="information">
            <div className="dot" />
            <p>
              If you lose access to your authentication device, you can
              re-register the Google Authenticator app in your Account Settings.
            </p>
          </div>
        </div>
        <div className="button">
          {hasError.hasError && (
            <div className="error">
              <>
                <SVG.ICON.ERROR />
                <span>{hasError.message}</span>
              </>
            </div>
          )}
          <ButtonCustom
            onClick={_onClickConfirm}
            disabled={
              codeArr.join('').length < 6 ||
              thisModalState.isConfirmButtonDisabledForce ||
              hasError.hasError ||
              isLoading
            }
          >
            Confirm
          </ButtonCustom>
        </div>
      </TradingPostMailValidModalStyle>
      {isLoading && <CommonLoading />}
    </CommonModal>
  );
}
