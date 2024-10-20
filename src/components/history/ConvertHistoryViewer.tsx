import React, { useEffect } from 'react';
import { HistoryViewerStyle } from './history.style';
import QUERY_CUSTOM from '@/query';
import HistoryConvertBox from './HistoryConvertBox';
import { useRouter } from 'next/navigation';
import { historyConvertsType } from '@/query/type';
import EmptyList from '../EmptyList';
import useGlobalStore from '@/store/globalStore';

export default function ConvertHistoryViewer() {
  // no, time, from, to, status, address []
  const { currentPageNumber } = useGlobalStore();

  const { data, isLoading, isFetching, refetch, error } =
    QUERY_CUSTOM.HISTORY.CONVERT(currentPageNumber);

  const router = useRouter();
  useEffect(() => {
    if (!isLoading) {
      if ((data?.size ?? 0) < currentPageNumber) {
        router.push('/history/convert?page=1');
      }
    }
  }, [currentPageNumber, data?.size, isLoading, router]);

  return (
    <HistoryViewerStyle>
      {data?.converts.length ?? 0 > 0 ? (
        data?.converts.map(
          (item: historyConvertsType['converts'][0], index: number) => (
            <HistoryConvertBox className="item" key={index} info={item} />
          )
        )
      ) : (
        <EmptyList type="history" />
      )}
    </HistoryViewerStyle>
  );
}
