import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useGovernanceStore from '../_store';
import { SVG } from '@/svg';
import COLOR from '@/constants/COLOR';
import QUERY_GOVERNANCE from '@/app/governance/_query';
import _ from 'lodash';

export default function DetailModalTotalAndSearch({
  voteId
}: {
  voteId: number;
}) {
  const {
    modalInputValue,
    setModalInputValue,
    setSearchInputValue,
    searchInputValue
  } = useGovernanceStore((state) => state);
  const [tempVoteInfo, setTempVoteInfo] = useState({
    votedPower: 0,
    totalPower: 0,
    votedRate: 0
  });
  const { data, refetch, remove } = QUERY_GOVERNANCE.DETAIL_MODAL_LIST_INFINITY(
    voteId,
    searchInputValue
  );

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalInputValue(e.target.value);
  };

  const _onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!modalInputValue) return;

    if (e.key === 'Enter') {
      setSearchInputValue(modalInputValue);
      remove();
      setTimeout(() => {
        refetch();
      }, 100);
    }
  };

  const _onClick = () => {
    if (!searchInputValue) {
      if (!modalInputValue) return;

      setSearchInputValue(modalInputValue);
      remove();
      setTimeout(() => {
        refetch();
      }, 100);
      return;
    }
    setModalInputValue('');
    setSearchInputValue('');

    remove();
    setTimeout(() => {
      refetch();
    }, 100);
  };

  useEffect(() => {
    //초기화
    setModalInputValue('');
    setSearchInputValue('');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTempVoteInfo({
      votedPower: data?.pages[0].votedPower ?? tempVoteInfo.votedPower,
      totalPower: data?.pages[0].totalPower ?? tempVoteInfo.totalPower,
      votedRate: data?.pages[0].votedRate ?? tempVoteInfo.votedRate
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <TotalSearchStyle>
      <div className="total">
        <strong>{data?.pages[0].votedPower ?? tempVoteInfo.votedPower}</strong>
        &nbsp;
        <span>/ {data?.pages[0].totalPower ?? tempVoteInfo.totalPower}</span>
        &nbsp;
        <span className="ratio">
          ({_.round(data?.pages[0].votedRate ?? tempVoteInfo.votedRate, 1)}%)
        </span>
      </div>
      <div className="gap" />
      <div className="input__box">
        <input
          type="text"
          placeholder="Enter the full wallet address"
          value={modalInputValue}
          onChange={_onChange}
          onKeyUp={_onSearch}
        />
        <span
          className={`svg__box ${!searchInputValue ? '' : 'cancel'}`}
          onClick={_onClick}
        >
          {!searchInputValue ? <SVG.ICON.SEARCH /> : <SVG.ICON.X_MARK />}
        </span>
      </div>
    </TotalSearchStyle>
  );
}

const TotalSearchStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  .total {
    padding-right: 12px;
    margin-bottom: 12px;
    flex-grow: 0.44;
    .ratio {
      color: ${COLOR['GRAY3__#929292']};
    }
  }

  .input__box {
    position: relative;
    /* width: 100%; */
    /* max-width: 453px; */
    margin-bottom: 12px;
    flex-grow: 1;

    input {
      width: 100%;
      padding: 0 42px 0 16px;
      height: 60px;
      border-radius: 8px;
      border: 1px solid ${COLOR['GRAY6__#E7E7E7']};
      background: ${COLOR['WHITE__#FFFFFF']};
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;

      :focus {
        outline: none;
      }
      ::-webkit-input-placeholder {
        color: ${COLOR['GRAY4__#B1B1B1']};
      }
    }
    .svg__box {
      display: block;
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      width: 24px;
      height: 24px;

      cursor: pointer;

      svg {
        width: 24px;
        height: 24px;
      }
    }
  }
`;
