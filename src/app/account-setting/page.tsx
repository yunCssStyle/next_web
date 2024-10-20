'use client';
import React, { useState } from 'react';
import { AccountSettingPageStyle } from './page.style';
import DisabledBox from '@/app/account-setting/_client/DisabledBox';
import QUERY_CUSTOM from '@/query';
import Toggle from '@/components/Toggle';
import Axios from '@/axios/axios';
import { SVG } from '@/svg';
import ButtonCustom from '@/components/ButtonCustom';
import { walletChecker } from '@/util/walletChecker';
import useHavahStore from '@/store/havahStore';
import useHavah from '@/hook/useHavah';
import QUERY_ACCOUNT from './_query';
import { CONSTANTS } from '@/constants/CONSTANTS';
import useAccountStore from './_store';

export default function AccountSetting() {
  const {
    userInfo,
    isLoading: isLoadingUserInfo,
    isFetching: isFetchingUserInfo
  } = QUERY_CUSTOM.USER_INFO();

  const { havahWalletInfo } = useHavahStore((state) => state);
  const { setSign } = useHavah();
  const [isAbleToggle, setIsAbleToggle] = useState(true);

  const { setModalType, setVerifiedAddress } = useAccountStore(
    (state) => state
  );
  const { refetch } = QUERY_ACCOUNT.VERIFY_INFO();

  const _onToggle = async (isOn: boolean) => {
    if (!isAbleToggle || isFetchingUserInfo) return;

    setIsAbleToggle(false);
    await Axios.post('/user-info/change', { newsletter: isOn })
      .then((res) => {
        if (res.status === 200) {
          setIsAbleToggle(true);
        }
      })
      .catch((err) => {
        setIsAbleToggle(true);
      });
  };

  const isHideAppleAccount = () => {
    if (userInfo?.user?.email.split('@')[1] === 'privaterelay.appleid.com') {
      return true;
    }
    return false;
  };

  const _onClickVerification = () => {
    setVerifiedAddress('');

    // 2차 인증이 되어있는 경우 sign 필요
    if (userInfo?.user?.otpEnable) {
      // 재인증인 경우
      //sign 으로 수정
      //todo loading 모달 필요
      const successFn = (payload: any) => {
        const timeout = setTimeout(() => {
          setModalType('loading');
        }, CONSTANTS.LOADING_DELAY_TIME);

        Axios.post('/user-info/wallet-verify-re-step', payload)
          .then((res) => {
            setVerifiedAddress(havahWalletInfo.address);
            refetch().then(() => {
              clearTimeout(timeout);
              setModalType('verification');
            });
          })
          .catch((err) => {
            clearTimeout(timeout);
            if (err.client_code === 'WALLET_NOT_MATCH') {
              setModalType('connectWallet');
            } else {
              setModalType('fail');
            }
          });
      };

      const cancelFn = () => {
        setModalType(null);
      };

      const message = { address: havahWalletInfo.address };
      // const message = { address: 'havahWalletInfo.address' };

      const callback = () => {
        setSign(successFn, cancelFn, message);
      };

      return walletChecker(callback);
    }

    refetch().then(() => {
      setModalType('verification');
    });
  };

  return (
    <AccountSettingPageStyle>
      <h2>Account Settings</h2>
      <div className="inner__container">
        <h4>
          Email Address
          {isHideAppleAccount() && (
            <span className="notification">
              * Email hidden due to Hide My Email setting.
            </span>
          )}
        </h4>
        <DisabledBox className="disabled__box">
          {userInfo?.user?.email}
        </DisabledBox>

        <h4>Display Name</h4>
        <div className="notification">
          <p>* Nickname can only be set in the MINE WARZ app.</p>
        </div>
        <DisabledBox className="disabled__box">
          {userInfo?.user?.nickname ? userInfo?.user?.nickname : ''}
        </DisabledBox>

        <h4>2-Step Verification (Google Authenticator)</h4>
        <DisabledBox className="disabled__box">
          {userInfo?.user?.otpEnable ? (
            <>
              <SVG.ICON.LOCK />
              Active
            </>
          ) : (
            <>
              <SVG.ICON.UNLOCK />
              Inactive
            </>
          )}
        </DisabledBox>
        <ButtonCustom
          disabled={isLoadingUserInfo || isFetchingUserInfo}
          onClick={_onClickVerification}
        >
          {userInfo?.user?.otpEnable
            ? 'Re-register 2-Step Verification'
            : 'Set up 2-Step Verification'}
        </ButtonCustom>
      </div>
      <div className="agree__newsletter">
        <p>Agree to receive newsletters and promotional materials</p>
        <Toggle onToggle={_onToggle} isOn={userInfo?.user?.newsletter} />
      </div>
      <p className="notification__newsletters">
        I agree to receive newsletters and promotional materials about MINE
        WARZ.
      </p>
    </AccountSettingPageStyle>
  );
}
