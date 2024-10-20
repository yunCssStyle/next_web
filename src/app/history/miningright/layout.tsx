'use client';
import useGlobalStore from '@/store/globalStore';
import React, { useEffect } from 'react';
import RefreshButton from '@/components/RefreshButton';
import { MiningRightHistoryLayoutStyle } from './layout.style';
import { useRouter } from 'next/navigation';
import Pagination from '@/components/Pagination';
import QUERY_CUSTOM from '@/query';
import Loading from '@/components/Loading';
import EmptyList from '@/components/EmptyList';
import useHistoryStore from '../_store';

interface IConvertHistoryLayout {
  children?: React.ReactNode;
}
export default function ConvertHistory({ children }: IConvertHistoryLayout) {
  const { isFetchingMiningRight, setIsFetchingMiningRight } = useHistoryStore();
  const { currentPageNumber, setCurrentPageNumber, setHistoryLayoutSelected } =
    useGlobalStore();
  const { data, isLoading, refetch, isFetching } =
    QUERY_CUSTOM.HISTORY.MINING_RIGHT(currentPageNumber);

  const router = useRouter();

  useEffect(() => {
    setHistoryLayoutSelected('miningRight');
    router.push('/history/miningright?page=1');
  }, [router, setHistoryLayoutSelected]);

  const _onClickRefresh = () => {
    // 데이터 업데이트 요청 api call 이때  isFetching true
    // refresh
    // 1데이터가 로딩이 끝낫고

    setIsFetchingMiningRight(true);
    refetch();
    setTimeout(() => {
      setIsFetchingMiningRight(false);
    }, 1000);
  };

  const _onClickPage = (page: number) => {
    setCurrentPageNumber(page);
    router.push(`/history/miningright?page=${page}`);
  };

  return (
    <MiningRightHistoryLayoutStyle>
      <RefreshButton
        className="refresh"
        isFetching={isFetching}
        onClick={_onClickRefresh}
      />
      {isLoading || isFetchingMiningRight || isFetching ? (
        <Loading />
      ) : data?.mines.length === 0 ? (
        <EmptyList type="history" />
      ) : (
        <>
          {children}
          <Pagination totalPage={data?.size ?? 0} onClick={_onClickPage} />
        </>
      )}
    </MiningRightHistoryLayoutStyle>
  );
}
