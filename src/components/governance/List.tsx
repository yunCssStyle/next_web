'use client';
import React from 'react';
import { GovernanceLsitStyle } from './governance.style';
import { voteOptionsType } from '@/query/type';
import { useRouter } from 'next/navigation';
import Turnout from './Turnout';
import useGovernanceStore from '@/app/governance/_store';

type GovernanceLsitProps = {
  page: number;
  id: number;
  index: number;
  subject: string;
  status: string;
  startDate: string;
  endDate: string;
  voteOptions: voteOptionsType[];
};

export default function GovernanceLsit(props: GovernanceLsitProps) {
  const { page, id, subject, status, startDate, endDate, voteOptions, index } =
    props;
  const formattedStatus =
    status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  const router = useRouter();
  const { setBackPageId, setBackScrollTo } = useGovernanceStore(
    (state) => state
  );

  const _onClickBox = () => {
    router.push(`/governance/detail?page=${id}`);
    setBackPageId(page);
    setBackScrollTo(window.scrollY);
  };

  return (
    <GovernanceLsitStyle
      onClick={_onClickBox}
      className={`${index !== 0 ? 'line' : ''}`}
    >
      <div className="info">
        <div>
          <span className="index">{id}</span>
          <span className="title">{subject}</span>
        </div>
        <span className={`label ${status.toLowerCase()}`}>
          {formattedStatus}
        </span>
      </div>
      <Turnout voteOptions={voteOptions} />
      <div className="governance_data">
        {startDate}~{endDate}
      </div>
    </GovernanceLsitStyle>
  );
}
