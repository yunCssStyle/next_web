'use client';
import React, { useEffect, useState } from 'react';
import { GovernancePageStyle } from './page.style';
import GovernanceLsit from '@/components/governance/List';
import { useRouter, useSearchParams } from 'next/navigation';
import QUERY_GOVERNANCE from './_query';
import Banner from '@/app/camp/_client/Banner';
import Loading from '@/components/Loading';
import PaginationProps from '@/components/PaginatioProps';
import ScrollTo from '@/components/ScrollTo';
import useGovernanceStore from './_store';

export default function Governance() {
  const router = useRouter();
  const pageParams = useSearchParams();
  const page = pageParams.get('page');

  const [pageNumber, setPageNumber] = useState(0);
  const { data, isLoading, refetch } = QUERY_GOVERNANCE.LIST(pageNumber);
  const { backScrollTo } = useGovernanceStore((state) => state);

  const _onClickPage = (page: number) => {
    router.push(`/governance?page=${page}`);
    setPageNumber((pages) => Number(page) - 1);
    refetch();
  };

  useEffect(() => {
    if (!page) {
      router.push('/governance?page=1');
    } else {
      setPageNumber((pages) => Number(page) - 1);
      if (Number(page) - 1 === pageNumber) {
        refetch();
      }
    }
  }, [page, router, pageNumber, refetch, data]);
  return (
    <GovernancePageStyle>
      <ScrollTo scrollTo={backScrollTo} />
      <h1>Governance</h1>
      <div className="description">
        You can vote on each proposal with your voting rights.
        <br />
        Your Voting Power is equivalent to the total MP(Mining Power) of the
        Mining Rights you hold within the game.
      </div>
      <div className="alarm">The date and time are displayed in UTC.</div>
      <div className="list_box">
        <h2>Proposals</h2>
        {isLoading && <Loading sessionCheck={false} />}
        {data &&
          data.voteList.content.map((item, index) => {
            return (
              <GovernanceLsit
                page={Number(page ?? 0)}
                id={item.id}
                subject={item.subject}
                status={item.status}
                startDate={item.startDateTime}
                endDate={item.endDateTime}
                voteOptions={item.voteOptions}
                key={index}
                index={index}
              />
            );
          })}
      </div>
      {data && data?.voteList.totalPages > 1 && (
        <PaginationProps
          totalPage={data?.voteList.totalPages ?? 0}
          onClick={_onClickPage}
          currentNumber={pageNumber + 1}
        />
      )}
      <div className="banner">
        <Banner type={'governance'} />
      </div>
    </GovernancePageStyle>
  );
}
