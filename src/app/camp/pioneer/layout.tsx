'use client';
import React, { useEffect, useState } from 'react';
import { PioneerLayoutStyle } from './layout.style';
import Banner from '@/app/camp/_client/Banner';
import useGlobalStore from '@/store/globalStore';
import { useSession } from 'next-auth/react';
import useHavahStore from '@/store/havahStore';
import useHavah from '@/hook/useHavah';
import QUERY_CUSTOM from '@/query';
import { useRouter } from 'next/navigation';
import { LINK } from '@/constants/link';
import RefreshButton from '@/components/RefreshButton';
import Loading from '@/components/Loading';
import EmptyList from '@/components/EmptyList';
import MarketAndAddButtons from '@/app/camp/_client/marketAndAddButtons';
import { stat } from 'fs';
import useCampStore from '../_store';

interface IConvertHistoryLayout {
  children?: React.ReactNode;
}
export default function ConvertHistory({ children }: IConvertHistoryLayout) {
  const type = 'pioneer';
  const [existData, setExistData] = useState(false);
  const { status } = useSession();
  const router = useRouter();
  const { havahWalletInfo } = useHavahStore();
  const { currentWalletChecker } = useHavah();

  const {
    currentPageNumber,
    setCampLayoutSelected,
    filterPioneer,
    setFilterPioneer,
    resetCurrentModalPageNumber
  } = useGlobalStore();

  const { setShowCampModal } = useCampStore.getState();

  const { setShowPioneerFilter } = useCampStore((state) => state);

  const { data, isLoading, isFetching, refetch, remove } =
    QUERY_CUSTOM.PIONEER_VERIFIED_LIST_PAGE(
      currentPageNumber,
      status === 'authenticated',
      filterPioneer
    );

  const { refetch: pioneerNFTListRefetch } = QUERY_CUSTOM.PIONEER_NFT_LIST();

  useEffect(() => {
    setCampLayoutSelected('pioneer');
    router.push('/camp/pioneer?page=1');
  }, [router, setCampLayoutSelected]);

  const _onClickAdd = async () => {
    const currentWalletCheck = await currentWalletChecker('onlyEmptyAddress');

    if (havahWalletInfo?.isHavahConnected === false || !currentWalletCheck) {
      return setShowCampModal('connectWallet');
    }

    resetCurrentModalPageNumber();
    if (havahWalletInfo?.isHavahConnected) {
      pioneerNFTListRefetch();
      return setShowCampModal('selectPioneer');
    }
  };

  const _refresh = () => {
    currentPageNumber === 1 && refetch();
  };

  useEffect(() => {
    if (data?.pioneers?.length ?? 0 > 0) {
      setExistData(true);
    } else {
      setExistData(false);
    }
  }, [data]);

  useEffect(() => {
    return () => {
      remove();
      setFilterPioneer([]);
      setShowPioneerFilter(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isEmpty = !(data?.pioneers?.length ?? 0 > 0);

  return (
    <PioneerLayoutStyle>
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
    </PioneerLayoutStyle>
  );
}
