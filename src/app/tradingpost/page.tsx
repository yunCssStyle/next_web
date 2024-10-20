'use client';

import Banner from '@/app/camp/_client/Banner';
import React from 'react';
import { TradingPostPageStyle } from './page.style';
import ButtonCustom from '@/components/ButtonCustom';
import TokenBox from '@/components/tradingpost/TokenBox';
import useHavahStore from '@/store/havahStore';
import QUERY_CUSTOM from '@/query';
import SwapPlatforms from '@/components/tradingpost/swapPlatforms';
import RefreshButton from '@/components/RefreshButton';
import { apiHelper } from '@/util/apiHelper';
import useHavah from '@/hook/useHavah';
import useTradingPostStore from './_store';

export default function TradingPost() {
  const type = 'tradingpost';

  const { setShowTradingPostModal } = useTradingPostStore();

  const { havahWalletInfo, setBalanceOfMZT } = useHavahStore();
  const { currentWalletChecker } = useHavah();

  const { isFetching, refetch } = QUERY_CUSTOM.USER_INFO();

  const _onClickConvert = async () => {
    apiHelper.getBalanceOfMZT(havahWalletInfo.address).then((res) => {
      setBalanceOfMZT(res);
      refetch();
    });

    const currentWalletCheck = await currentWalletChecker();
    if (!currentWalletCheck) return;

    setShowTradingPostModal('convertAsset');
  };

  const _onClickRefresh = async () => {
    refetch();

    const currentWalletCheck = await currentWalletChecker();
    if (!currentWalletCheck) return;

    if (havahWalletInfo.address) {
      apiHelper.getBalanceOfMZT(havahWalletInfo.address).then((res) => {
        setBalanceOfMZT(res);
      });
    }
  };

  return (
    <TradingPostPageStyle>
      <h1>Trading Post</h1>
      <div className="refresh">
        <RefreshButton isFetching={isFetching} onClick={_onClickRefresh} />
      </div>
      <TokenBox type="gold" />
      <TokenBox type="MZT" />

      <ButtonCustom
        disabled={!havahWalletInfo.isHavahConnected}
        onClick={_onClickConvert}
      >
        Go to Convert
      </ButtonCustom>
      <SwapPlatforms />
      <Banner type={type} />
    </TradingPostPageStyle>
  );
}
