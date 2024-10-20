import React, { use, useEffect } from 'react';
import { HistoryViewerStyle } from './history.style';
import QUERY_CUSTOM from '@/query';
import HistoryMiningRightBox from './HistoryMiningRightBox';
import { useRouter } from 'next/navigation';
import { historyMinesType } from '@/query/type';
import useGlobalStore from '@/store/globalStore';
import EmptyList from '../EmptyList';

export default function MiningRightHistoryViewer() {
  // no, time, from, to, status, address []
  const { currentPageNumber } = useGlobalStore();

  const { data, isLoading, isFetching, refetch, error } =
    QUERY_CUSTOM.HISTORY.MINING_RIGHT(currentPageNumber);

  const router = useRouter();
  useEffect(() => {
    if (!isLoading) {
      if ((data?.size ?? 0) < currentPageNumber) {
        router.push('/history/miningright?page=1');
      }
    }
  }, [currentPageNumber, data?.size, isLoading, router]);

  return (
    <HistoryViewerStyle>
      {data?.mines.length ?? 0 > 0 ? (
        data?.mines.map((item: historyMinesType['mines'][0], index: number) => (
          <HistoryMiningRightBox className="item" key={index} info={item} />
        ))
      ) : (
        <EmptyList type="history" />
      )}
    </HistoryViewerStyle>
  );
}
