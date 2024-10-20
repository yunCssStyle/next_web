'use client';

import React, { useEffect } from 'react';
import { PioneerViewerStyle } from './camp.style';
import QUERY_CUSTOM from '@/query';
import PioneerBox from './PioneerBox';
import AddButton from './AddButton';
import EquippedPioneer from './EquippedPioneer';
import useGlobalStore from '@/store/globalStore';
import useHavahStore from '@/store/havahStore';
import useHavah from '@/hook/useHavah';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Pagination from '../../../components/Pagination';
import TotalAndFilter from '../../../components/TotalAndFilter';
import useCampStore from '@/app/camp/_store';

export default function PioneerViewer() {
  const { data: session } = useSession();
  const {
    filterPioneer,
    setFilterPioneer,
    currentPageNumber,
    setCurrentPageNumber,
    resetCurrentModalPageNumber
  } = useGlobalStore((state) => state);

  const { setShowCampModal } = useCampStore.getState();
  const { showPioneerFilter, setShowPioneerFilter } = useCampStore(
    (state) => state
  );

  const router = useRouter();

  const { data, isFetching, refetch } = QUERY_CUSTOM.PIONEER_VERIFIED_LIST_PAGE(
    currentPageNumber,
    !!session,
    filterPioneer
  );

  const { refetch: pioneerNFTListRefetch } = QUERY_CUSTOM.PIONEER_NFT_LIST();

  const { currentWalletChecker } = useHavah();
  const { havahWalletInfo } = useHavahStore();

  const _onClickAddButton = async () => {
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const levelList = data?.collectionList ?? [];

  const _onClickPage = (page: number) => {
    if (filterPioneer.length === 0) {
      setShowPioneerFilter(false);
    }
    router.push(`/camp/pioneer?page=${page}`);
  };

  const _onRefresh = (isOpen: boolean) => {
    router.push(`/camp/pioneer?page=1${isOpen ? '?filter=true' : ''}`);
    refetch();
  };

  const _onSelect = (targetIndex: number) => {
    setCurrentPageNumber(1);
    const targetId = levelList[targetIndex].id;
    if (filterPioneer.includes(targetId)) {
      const removedCheckList = filterPioneer.filter((id) => id !== targetId);
      setFilterPioneer(removedCheckList);
    } else {
      const addedCheckList = [...filterPioneer, targetId];
      setFilterPioneer(addedCheckList);
    }

    setTimeout(() => {
      router.push(`/camp/pioneer?page=1?filter=true`);
      refetch();
    }, 150);
  };
  return (
    <PioneerViewerStyle>
      <>
        {data?.equippedPioneer && (
          <EquippedPioneer {...data?.equippedPioneer} />
        )}

        <TotalAndFilter
          className="total__and__filter"
          title="Collection"
          totalCount={data?.equippedPioneer ? data?.total + 1 : data!.total}
          list={levelList}
          checkedList={filterPioneer}
          onSelect={_onSelect}
          onRefresh={_onRefresh}
          isFetching={isFetching}
          openFilter={showPioneerFilter}
          setOpenFilter={setShowPioneerFilter}
        />
        <div className="list__container">
          {data?.pioneers.map((item, index) => {
            return (
              <PioneerBox
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
      </>
    </PioneerViewerStyle>
  );
}
