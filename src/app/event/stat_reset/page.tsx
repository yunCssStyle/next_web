'use client';
import React, { useEffect, useState } from 'react';
import { PioneerStatPageStyle } from './page.style';
import { useRouter, useSearchParams } from 'next/navigation';
import useHavahStore from '@/store/havahStore';
import QUERY_STATRESET from './_query';
import PaginationProps from '@/components/PaginatioProps';
import TotalAndFilter from '@/components/TotalAndFilter';
import { Button } from '@mui/material';
import Image from 'next/image';
import { BannerStyle } from '@/app/camp/_client/camp.style';
import Loading from '@/components/Loading';
import Lsit from './_client/List';
import EmptyListReset from './_client/Empty_list';
import QUERY_CUSTOM from '@/query';
import { useSession } from 'next-auth/react';

export default function Governance() {
  const router = useRouter();
  const pageParams = useSearchParams();
  const page = pageParams.get('page');
  const pageName = '/event/stat_reset?page=';
  const { refetch } = QUERY_CUSTOM.USER_INFO();
  const { status } = useSession();

  const [pageNumber, setPageNumber] = useState<number>(Number(page) - 1);
  const [onSelect, setonSelect] = useState<number[]>([]);
  const { havahWalletInfo } = useHavahStore();
  const {
    fetchStatus,
    stat_list,
    isStatListLoading,
    stat_list_refetch,
    listError
  } = QUERY_STATRESET.LIST(pageNumber, havahWalletInfo.address, onSelect);

  const _onClickPage = (paged: number) => {
    router.push(`${pageName}${paged}`);
    setPageNumber(Number(paged) - 1);
  };

  const _onSelect = (targetIndex: number) => {
    if (stat_list) {
      const targetId = stat_list?.collectionList[targetIndex].id;
      setonSelect((onSelect) => {
        router.push(`${pageName}1`);
        if (onSelect.includes(targetId)) {
          return onSelect.filter((item) => item !== targetId);
        } else {
          return [...onSelect, targetId];
        }
      });
    }
  };

  useEffect(() => {
    status === 'authenticated' && stat_list_refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSelect]);

  useEffect(() => {
    if (!page || isNaN(Number(page))) {
      router.push(`${pageName}1`);
    } else {
      setPageNumber(Number(page) - 1);
      if (Number(page) - 1 === pageNumber) {
        status === 'authenticated' && stat_list_refetch();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageNumber]);

  useEffect(() => {
    if (
      stat_list?.profileList.totalElements != 0 &&
      stat_list?.profileList.content.length === 0
    ) {
      router.push(`${pageName}1`);
    }
  }, [router, stat_list]);
  if (listError == null) {
    return (
      <PioneerStatPageStyle>
        {!isStatListLoading ? (
          <>
            {stat_list?.profileList.totalElements != 0 && (
              <TotalAndFilter
                className="total__and__filter"
                title="Collection"
                totalCount={stat_list?.profileList.totalElements ?? 0}
                list={stat_list?.collectionList ?? []}
                checkedList={onSelect}
                onSelect={(index) => {
                  _onSelect(index);
                }}
                onRefresh={() => {
                  stat_list_refetch();
                  refetch();
                }}
                isFetching={fetchStatus !== 'idle'}
              />
            )}
            <div className="list_pro">
              <Lsit
                price={stat_list?.price ?? 0}
                content={stat_list?.profileList.content ?? []}
                listRefetch={() => {
                  stat_list_refetch();
                }}
              />
              {fetchStatus !== 'idle' && (
                <div className="loading">
                  <div>
                    <Image
                      src={'/assets/images/loading_papa.png'}
                      alt="loading"
                      width={160}
                      height={160}
                    />
                    <span>Loading...</span>
                  </div>
                </div>
              )}
            </div>

            {stat_list?.profileList.totalElements != 0 &&
              fetchStatus === 'idle' &&
              stat_list?.profileList.totalPages !== undefined &&
              stat_list?.profileList.totalPages > 1 && (
                <PaginationProps
                  totalPage={stat_list?.profileList.totalPages ?? 0}
                  onClick={_onClickPage}
                  currentNumber={pageNumber + 1}
                />
              )}
          </>
        ) : (
          <Loading sessionCheck={false} />
        )}
        {stat_list?.profileList.totalElements != 0 ? (
          <BannerStyle className="banner">
            <div className="content">
              <span className="text">
                Register your NFT as a Pioneer at the Camp
              </span>
              <Button onClick={() => router.push('/camp/pioneer?page=1')}>
                Go to Camp
              </Button>
            </div>
            <Image
              src={'/assets/images/banner_stat_reset.png'}
              alt="banner"
              width={114}
              height={150}
              quality={90}
            />
          </BannerStyle>
        ) : (
          <EmptyListReset />
        )}
      </PioneerStatPageStyle>
    );
  } else {
    return <EmptyListReset />;
  }
}
