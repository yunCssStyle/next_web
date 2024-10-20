'use client';
import useGlobalStore from '@/store/globalStore';
import React, { useEffect } from 'react';
import RefreshButton from '@/components/RefreshButton';
import { ConvertHistoryLayoutStyle } from './layout.style';
import Pagination from '@/components/Pagination';
import { useRouter } from 'next/navigation';
import QUERY_CUSTOM from '@/query';
import Loading from '@/components/Loading';
import EmptyList from '@/components/EmptyList';
import useHistoryStore from '../_store';

interface IConvertHistoryLayout {
  children?: React.ReactNode;
}
export default function ConvertHistory({ children }: IConvertHistoryLayout) {
  const { isFetchingConverter, setIsFetchingConverter } = useHistoryStore();
  const { currentPageNumber, setCurrentPageNumber, setHistoryLayoutSelected } =
    useGlobalStore();
  const { data, isLoading, isFetching, refetch } =
    QUERY_CUSTOM.HISTORY.CONVERT(currentPageNumber);

  const router = useRouter();

  useEffect(() => {
    setHistoryLayoutSelected('convertHistory');
    router.push('/history/convert?page=1');
  }, [router, setHistoryLayoutSelected]);

  const _onClickRefresh = () => {
    // 데이터 업데이트 요청 api call 이때  isFetchingConverter true
    // refresh
    // 1데이터가 로딩이 끝낫고

    setIsFetchingConverter(true);
    refetch();
    setTimeout(() => {
      setIsFetchingConverter(false);
    }, 1000);
  };

  const _onClickPage = (page: number) => {
    setCurrentPageNumber(page);
    router.push(`/history/convert?page=${page}`);
  };

  return (
    <ConvertHistoryLayoutStyle>
      <RefreshButton
        className="refresh"
        isFetching={isLoading || isFetchingConverter || isFetching}
        onClick={_onClickRefresh}
      />
      {isLoading || isFetchingConverter || isFetching ? (
        <Loading />
      ) : data?.converts.length === 0 ? (
        <EmptyList type="history" />
      ) : (
        <>
          {/* test_code */}
          {children}
          <Pagination totalPage={data?.size ?? 0} onClick={_onClickPage} />
        </>
      )}
    </ConvertHistoryLayoutStyle>
  );
}
