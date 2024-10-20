'use client';
import React, { useEffect, useState } from 'react';
import { MiningRightLayoutStyle } from './layout.style';
import Banner from '@/app/camp/_client/Banner';
import { useRouter } from 'next/navigation';
import useGlobalStore from '@/store/globalStore';
import QUERY_CUSTOM from '@/query';
import { useSession } from 'next-auth/react';
import EmptyList from '@/components/EmptyList';
import { LINK } from '@/constants/link';
import Loading from '@/components/Loading';
import useHavahStore from '@/store/havahStore';
import useHavah from '@/hook/useHavah';
import RefreshButton from '@/components/RefreshButton';
import MarketAndAddButtons from '@/app/camp/_client/marketAndAddButtons';
import { stat } from 'fs';
import useCampStore from '../_store';
import { set } from 'lodash';

interface IConvertHistoryLayout {
  children?: React.ReactNode;
}
export default function ConvertHistory({ children }: IConvertHistoryLayout) {
  const type = 'miningright';
  const [existData, setExistData] = useState(false);
  const { status } = useSession();
  const router = useRouter();
  const { havahWalletInfo } = useHavahStore();
  const { currentWalletChecker } = useHavah();

  const {
    currentPageNumber,
    setCampLayoutSelected,
    filterMiningRight,
    setFilterMiningRight,
    resetCurrentModalPageNumber
  } = useGlobalStore((state) => state);

  const { setShowCampModal } = useCampStore.getState();

  const { setShowMiningrightFilter } = useCampStore((state) => state);

  const { data, isLoading, isFetching, refetch, remove } =
    QUERY_CUSTOM.MINING_RIGHT_LOCK_UP_LIST_PAGE(
      currentPageNumber,
      status === 'authenticated',
      filterMiningRight
    );

  useEffect(() => {
    setCampLayoutSelected('miningRight');
    router.push('/camp/miningright?page=1');
  }, [router, setCampLayoutSelected]);

  const _onClickAdd = async () => {
    const currentWalletCheck = await currentWalletChecker('onlyEmptyAddress');
    if (havahWalletInfo?.isHavahConnected === false || !currentWalletCheck) {
      return setShowCampModal('connectWallet');
    }

    resetCurrentModalPageNumber();
    if (havahWalletInfo?.isHavahConnected) {
      return setShowCampModal('selectMiningRight');
    }
  };

  const _refresh = () => {
    currentPageNumber === 1 && refetch();
  };

  useEffect(() => {
    if (data?.mines?.length ?? 0 > 0) {
      setExistData(true);
    } else {
      setExistData(false);
    }
  }, [data]);

  useEffect(() => {
    return () => {
      remove();
      setFilterMiningRight([]);
      setShowMiningrightFilter(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isEmpty = !(data?.mines?.length ?? 0 > 0);

  return (
    <MiningRightLayoutStyle>
      {/* fetching, empty */}
      {isEmpty && (
        <div className="refresh__box">
          {isLoading === false && (
            <RefreshButton isFetching={isFetching} onClick={_refresh} />
          )}
        </div>
      )}

      {/* data empty and (loading or fetching) */}
      {!existData && (isLoading || isFetching) ? (
        <Loading />
      ) : isEmpty === false ? (
        children
      ) : (
        <EmptyList type="camp" />
      )}

      {(isEmpty || isLoading) && (
        <MarketAndAddButtons type={type} onClickAdd={_onClickAdd} />
      )}
      <Banner type={type} />
    </MiningRightLayoutStyle>
  );
}
