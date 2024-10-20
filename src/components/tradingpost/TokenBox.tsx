import React, { useState } from 'react';
import { TokenBoxStyle } from './style';
import { SVG } from '@/svg';
import QUERY_CUSTOM from '@/query';
import useHavahStore from '@/store/havahStore';
import { thousandsSeparator } from '@/util/converter';

interface Props {
  type: 'gold' | 'MZT';
}
export default function TokenBox({ type }: Props) {
  const { userInfo } = QUERY_CUSTOM.USER_INFO();
  const { havahWalletInfo, balanceOfMZT } = useHavahStore();

  const TokenType: {
    [key in Props['type']]: {
      symbolImg: JSX.Element;
      symbolText: string;
      amount: number;
    };
  } = {
    gold: {
      symbolImg: <SVG.ICON.GOLD />,
      symbolText: 'Gold',
      amount: userInfo?.user?.gold ?? 0
    },
    MZT: {
      symbolImg: <SVG.ICON.MZT />,
      symbolText: 'MZT',
      amount: balanceOfMZT ?? 0
    }
  };

  if (!havahWalletInfo.isHavahConnected && type === 'MZT')
    return (
      <TokenBoxStyle disabled>
        <div className="symbol">
          <span className="icon">
            <SVG.ICON.MZT_DISABLED />
          </span>
          <span className="text">MZT</span>
        </div>
        <div className="amount">Connect your wallet</div>
      </TokenBoxStyle>
    );

  return (
    <TokenBoxStyle>
      <div className="symbol">
        <span className="icon">{TokenType[type].symbolImg}</span>
        <span className="text">{TokenType[type].symbolText}</span>
      </div>
      <div className="amount">
        {thousandsSeparator(TokenType[type].amount, 6, true)}
      </div>
    </TokenBoxStyle>
  );
}
