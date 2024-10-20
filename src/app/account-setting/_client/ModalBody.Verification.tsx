import React, { useState } from 'react';
import { ModalBodyVerificationStyle } from './style';
import ButtonCustom from '@/components/ButtonCustom';
import { converter } from '@/util/converter';
import { SVG } from '@/svg';
import Image from 'next/image';
import InputBlock from './ModalBody.InputBlock';
import QUERY_ACCOUNT from '../_query';
import { copyToClipboard, installWallet } from '@/util/etc';
import useHavahStore from '@/store/havahStore';
import useHavah from '@/hook/useHavah';
import { localStateHandler } from '@/util/localStateHandler';
import Axios from '@/axios/axios';
import useAccountStore from '../_store';
import QUERY_CUSTOM from '@/query';
import CommonLoading from '@/components/CommonLoading';
import { CONSTANTS } from '@/constants/CONSTANTS';

export default function ModalBodyVerification() {
  const [codeArr, setCodeArr] = useState<string[]>(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [showEntryCode, setShowEntryCode] = useState(false);
  const { data } = QUERY_ACCOUNT.VERIFY_INFO();
  const { refetch: userInfoRefetch } = QUERY_CUSTOM.USER_INFO();

  const [showWalletError, setShowWalletError] = useState(false);
  const [showCodeError, setShowCodeError] = useState<
    'address' | 'code' | 'invalidCode' | null
  >(null);
  const { currentWalletChecker, connectHavahWallet, setSign } = useHavah();
  const { havahWalletInfo } = useHavahStore((state) => state);

  const { setModalType, verifiedAddress, setVerifiedAddress } = useAccountStore(
    (state) => state
  );

  0;

  const _onChangeCode = (code: string[]) => {
    setCodeArr(code.slice(0, codeArr.length));
    if (showCodeError === 'code' || showCodeError === 'invalidCode')
      setShowCodeError(null);
  };

  const _resetAddress = () => {
    Axios.post('/user-info/wallet-verify-delete').then((res) => {
      setVerifiedAddress('');
    });
  };

  const _onVerifyWallet = async () => {
    // check wallet
    if (window.havah === undefined) {
      return installWallet();
    }
    // connect wallet
    if (!havahWalletInfo.isHavahConnected) {
      await currentWalletChecker();
      localStateHandler.walletConnect.set();
      return await connectHavahWallet();
    }

    // verify wallet
    setModalType('verifying');

    const successFn = (payload: any) => {
      Axios.post('/user-info/wallet-verify', payload)
        .then((res) => {
          setVerifiedAddress(havahWalletInfo.address);
          setModalType('successVerifyWallet');
          if (showCodeError === 'address') setShowCodeError(null);
        })
        .catch((err) => {
          setModalType('fail');
        });
    };

    const cancelFn = () => {
      setModalType('verification');
    };

    const message = { address: havahWalletInfo.address };

    setSign(successFn, cancelFn, message);
  };

  const _onVerifyCode = () => {
    !verifiedAddress && setShowWalletError(true);

    codeArr.includes('') && setShowCodeError('code');

    if (!verifiedAddress || codeArr.includes('')) return;

    //
    const payload = {
      otpCode: codeArr.join(''),
      address: verifiedAddress
    };

    const timeout = setTimeout(() => {
      setIsLoading(true);
    }, CONSTANTS.LOADING_DELAY_TIME);

    Axios.post('/user-info/otp-verify', payload)
      .then((res) => {
        //loading 중... 완료시 전체 모닫이 닫힘
        userInfoRefetch()
          .then(() => {
            setModalType('successVerifyActivate');
          })
          .catch((err) => {
            setModalType('fail');
          });
      })
      .catch((err: any) => {
        console.log(err);
        if (err.client_code === 'OTP_INVALID') {
          setShowCodeError('invalidCode');
        } else {
          setModalType('fail');
        }
        clearTimeout(timeout);
        setIsLoading(false);
      });
  };

  return (
    <ModalBodyVerificationStyle>
      <h2>Set up 2-Step Verification</h2>
      <h2>(Google Authenticator)</h2>

      <p className="notification">
        Re-registering can be done using the same step.
      </p>

      {/* 1 */}
      <div className="box">
        <h3>
          <SVG.ICON.NUM1 />
          <span>Verify your wallet</span>
        </h3>
        <ul>
          <li>
            Please verify using the same wallet that will be used to verify
            Google Authenticator&apos;s re-registration.
          </li>
        </ul>
        <p>
          <SVG.ICON.EXCLAMATION2 />
          <span>
            If you lose the wallet, you will not be able to re-register Google
            Authenticator!
          </span>
        </p>
        {verifiedAddress && (
          <div className="address">
            <span>{converter.walletAddressShortener(verifiedAddress, 6)}</span>
            <div onClick={() => copyToClipboard(verifiedAddress)}>
              <SVG.ICON.COPY2 />
            </div>
            <div onClick={_resetAddress}>
              <SVG.ICON.CLOSE3 />
            </div>
          </div>
        )}
        {showWalletError && (
          <div className="show__error">Please verify your wallet.</div>
        )}
        <ButtonCustom disabled={!!verifiedAddress} onClick={_onVerifyWallet}>
          {window.havah === undefined
            ? 'Install HAVAH Wallet'
            : useHavahStore.getState().havahWalletInfo.isHavahConnected
            ? 'Verify Wallet'
            : 'Connect HAVAH Wallet'}
        </ButtonCustom>
      </div>

      {/* 2 */}
      <div className="box">
        <h3>
          <SVG.ICON.NUM2 />
          <span>Download Google Authenticator</span>
        </h3>
        <div>
          <Image
            src="/assets/images/brand_googleplay.png"
            alt="appstore"
            width={121}
            height={36}
            onClick={() => {
              window.open(
                'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl',
                '_blank'
              );
            }}
          />
          <Image
            src="/assets/images/brand_appstore.png"
            alt="appstore"
            width={108}
            height={36}
            onClick={() => {
              window.open(
                'https://apps.apple.com/kr/app/google-authenticator/id388497605',
                '_blank'
              );
            }}
          />
        </div>
      </div>

      {/* 3 */}
      <div className="box">
        <h3>
          <SVG.ICON.NUM3 />
          <span>Scan the Barcode</span>
        </h3>
        <div>
          <Image
            src={data?.qrCode ?? ''}
            alt="qr code"
            width={111}
            height={111}
          />
          <div className="explanation">
            <p>1) Open the Google OTP app</p>
            <p>2) Tap the “+” icon</p>
            <p>
              3) Scan the image to the left, using your phone&apos;s camera.
            </p>
          </div>
        </div>
        <h4 onClick={() => setShowEntryCode(!showEntryCode)}>
          See Manual Entry Code
        </h4>
        {showEntryCode && <span className="code">{data?.secretKey}</span>}
      </div>

      {/* 4 */}
      <div className="box">
        <h3>
          <SVG.ICON.NUM4 />
          <span>Enter Verification Code</span>
        </h3>
        <p>Enter the 6-digit verification code generated by the app.</p>
        {showCodeError === 'code' && (
          <div className="show__error">Please enter the passcode.</div>
        )}
        {showCodeError === 'invalidCode' && (
          <div className="show__error">
            The passcode doesn’t match or has expired.
          </div>
        )}
        <div className="code__input">
          {codeArr.map((item, index) => (
            <InputBlock
              key={index}
              item={item}
              index={index}
              codeArr={codeArr}
              onChange={_onChangeCode}
              className={
                showCodeError === 'code' || showCodeError === 'invalidCode'
                  ? 'error'
                  : ''
              }
            />
          ))}
        </div>
      </div>

      <ButtonCustom onClick={_onVerifyCode} disabled={isLoading}>
        Verify and Activate
      </ButtonCustom>
      {isLoading && (
        //  isLoadingDelay &&
        <CommonLoading />
      )}
    </ModalBodyVerificationStyle>
  );
}
