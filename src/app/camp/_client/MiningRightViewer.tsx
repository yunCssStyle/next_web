'use client';
import QUERY_CUSTOM from '@/query';
import React, { useEffect, useState } from 'react';
import { MiningRightViewerStyle } from './camp.style';
import AddButton from './AddButton';
import MiningRightBox from './MiningRightBox';

import useGlobalStore from '@/store/globalStore';
import useHavahStore from '@/store/havahStore';
import useHavah from '@/hook/useHavah';
import { useSession } from 'next-auth/react';
import Pagination from '../../../components/Pagination';
import { useRouter } from 'next/navigation';
import TotalAndFilter2 from '../../../components/TotalAndFilter';
import TotalAndFilter from '../../../components/TotalAndFilter';
import useCampStore from '@/app/camp/_store';

export default function MiningRightViewer() {
  const { data: session } = useSession();
  const {
    setCurrentPageNumber,
    setFilterMiningRight,
    filterMiningRight,
    currentPageNumber,
    resetCurrentModalPageNumber
  } = useGlobalStore((state) => state);

  const { showMiningrightFilter, setShowMiningrightFilter, setShowCampModal } =
    useCampStore((state) => state);

  //filter 정보 제거
  const router = useRouter();

  const { data, isLoading, isFetching, refetch } =
    QUERY_CUSTOM.MINING_RIGHT_LOCK_UP_LIST_PAGE(
      currentPageNumber,
      !!session,
      filterMiningRight
    );

  const { currentWalletChecker } = useHavah();
  const { havahWalletInfo } = useHavahStore();

  //click event
  const _onClickAddButton = async () => {
    const currentWalletCheck = await currentWalletChecker('onlyEmptyAddress');
    if (havahWalletInfo?.isHavahConnected === false || !currentWalletCheck) {
      return setShowCampModal('connectWallet');
    }

    resetCurrentModalPageNumber();
    if (havahWalletInfo?.isHavahConnected) {
      return setShowCampModal('selectMiningRight');
    }
  };

  //end - click event

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const levelList =
    data?.levelList.map((item) => ({ name: `Lv. ${item}`, id: item })) ?? [];

  const _onClickPage = (page: number) => {
    if (filterMiningRight.length === 0) {
      setShowMiningrightFilter(false);
    }

    router.push(`/camp/miningright?page=${page}`);
  };

  const _onRefresh = (isOpen: boolean) => {
    router.push(`/camp/miningright?page=1${isOpen ? '?filter=true' : ''}`);
    refetch();
  };

  const _onSelect = (targetIndex: number) => {
    setCurrentPageNumber(1);
    const targetId = levelList[targetIndex].id;
    if (filterMiningRight.includes(targetId)) {
      const removedCheckList = filterMiningRight.filter(
        (id) => id !== targetId
      );
      setFilterMiningRight(removedCheckList);
    } else {
      const addedCheckList = [...filterMiningRight, targetId];
      setFilterMiningRight(addedCheckList);
    }

    setTimeout(() => {
      router.push(`/camp/miningright?page=1?filter=true`);
      refetch();
    }, 150);
  };

  return (
    <MiningRightViewerStyle>
      <TotalAndFilter
        className="total__and__filter"
        title="Level"
        totalCount={data?.total ?? 0}
        list={levelList}
        checkedList={filterMiningRight}
        onSelect={_onSelect}
        onRefresh={_onRefresh}
        isFetching={isFetching}
        openFilter={showMiningrightFilter}
        setOpenFilter={setShowMiningrightFilter}
      />
      <div className="list__container">
        {data?.mines.map((item, index) => {
          return (
            <MiningRightBox
              className={`box`}
              {...item}
              key={index}
              index={index}
            />
          );
        })}
        <div className="sticky__button">
          <AddButton onClick={_onClickAddButton} />
        </div>
      </div>
      {(data?.size ?? 0) > 1 && (
        <Pagination
          className="pagination"
          totalPage={data?.size ?? 0}
          onClick={_onClickPage}
        />
      )}
    </MiningRightViewerStyle>
  );
}
