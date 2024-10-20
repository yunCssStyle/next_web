'use client';
import React, { useEffect } from 'react';
import { TooltipWalletStyle } from './layout.style';
import { SVG } from '@/svg';
import { thousandsSeparator, walletAddressShortener } from '@/util/converter';
import useHavah from '@/hook/useHavah';
import useHavahStore from '@/store/havahStore';
import { localStateHandler } from '@/util/localStateHandler';
interface IProps {
  isOpen: boolean;
  onClickClose: (e?: any) => void;
}
export default function WalletTooltip({ isOpen, onClickClose }: IProps) {
  //
  const { setForceDisconnect } = useHavah();
  const { havahWalletInfo, resetHavahInfo, balanceOfMZT } = useHavahStore();
  const [int, dec] = thousandsSeparator(balanceOfMZT, 3, true).split('.') ?? [
    '0',
    null
  ];

  const _onClickDisconnectWallet = (e: any) => {
    resetHavahInfo();
    // setForceDisconnect(true);
    onClickClose(e);
  };

  const _onClickCopyAddress = () => {
    havahWalletInfo.address &&
      navigator.clipboard.writeText(havahWalletInfo.address);
  };

  useEffect(() => {
    if (isOpen && !havahWalletInfo.isHavahConnected) {
      onClickClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [havahWalletInfo.isHavahConnected]);

  return (
    <TooltipWalletStyle isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
      <svg
        className="tail"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="10"
        viewBox="0 0 18 10"
        fill="none"
      >
        <path
          d="M0 10L7.51341 1.65176C8.3079 0.769004 9.69211 0.769006 10.4866 1.65177L18 10H0Z"
          fill="white"
        />
      </svg>
      <div className="token__box">
        <div className="name__signout">
          <span className="name">my wallet</span>
          <span className="signout" onClick={_onClickDisconnectWallet}>
            <SVG.ICON.SIGNOUT_CUSTOM />
          </span>
        </div>

        <div className="mzt">
          <div className="symbol">
            <SVG.ICON.MZT />
          </div>
          <div className="balance">
            <span className="int">{int}</span>
            {dec && <span className="dec">{`.${dec}`}</span>}
          </div>
          <div className="unit">
            <span>MZT</span>
          </div>
        </div>

        <div className="address__box">
          <span className="address">
            {walletAddressShortener(havahWalletInfo.address)}
          </span>
          <div className="copy" onClick={_onClickCopyAddress}>
            <SVG.ICON.COPY />
          </div>
        </div>
      </div>
    </TooltipWalletStyle>
  );
}
