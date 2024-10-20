'use client';
import ModalLayout from '@/components/modal/ModalLayout';
import React from 'react';
import styled from '@emotion/styled';
import COLOR from '@/constants/COLOR';

import ButtonCustom from '../../../components/ButtonCustom';
import { css } from '@emotion/react';
import Image from 'next/image';
import Axios from '@/axios/axios';
import { voteOptionsType } from '@/query/type';
import QUERY_GOVERNANCE from '../_query';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  optionId?: number;
  voteId: number;
  type: voteOptionsType['type'];
  successCallback?: () => void;
  errorCallback?: (clientCode: string) => void;
}

const voteType = {
  AGREE: '/assets/images/governance_agree_kiki.png',
  DISAGREE: '/assets/images/governance_disagree_kiki.png',
  ABSTAIN: '/assets/images/governance_abstain_kiki.png',
  ABSENCE: '/assets/images/governance_abstain_kiki.png'
} as const;
export default function VoteConfirmModal({
  isOpen,
  onClose,
  optionId = 0,
  voteId,
  type,
  successCallback,
  errorCallback
}: DetailModalProps) {
  const { refetchDetail } = QUERY_GOVERNANCE.DETAIL(voteId);

  const _onClickVote = () => {
    Axios.post('/governance/vote', {
      voteId: Number(voteId),
      voteOptionId: optionId
    })
      .then((res) => {
        successCallback && successCallback();
      })
      .catch((err) => {
        errorCallback && errorCallback(err.client_code);
      });
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      bgColor={COLOR['GRAY8__#FAFAFA']}
    >
      <InnerStyle type={type}>
        <h2>
          Vote for{' '}
          <span className="highlight">{type?.toLocaleLowerCase()}</span>
        </h2>
        <div className="comments">
          <p>Cast votes cannot be changed or reversed.</p>
          <p>Please cast your vote carefully.</p>
        </div>
        <Image src={voteType[type]} alt="vote" width={160} height={160} />

        <ButtonCustom onClick={_onClickVote}>Vote</ButtonCustom>
      </InnerStyle>
    </ModalLayout>
  );
}

const InnerStyle = styled.div<{ type?: voteOptionsType['type'] }>`
  width: 100%;
  h2 {
    font-size: 24px;
    font-weight: 700;
    line-height: 140%;
    margin-bottom: 8px;
    text-align: center;
    .highlight {
      text-transform: capitalize;
      ${({ type }) => {
        switch (type) {
          case 'AGREE':
            return css`
              color: ${COLOR['TRUE__#16C71D']};
            `;
          case 'DISAGREE':
            return css`
              color: ${COLOR['ERROR__#EC1A26']};
            `;
          case 'ABSTAIN':
            return css`
              color: ${COLOR['GRAY3__#929292']};
            `;
          default:
            return css`
              color: ${COLOR['BLACK__#000000']};
            `;
        }
      }}
    }
  }
  .comments {
    p {
      width: 100%;
      color: ${COLOR['GRAY2__#565656']};
      text-align: center;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;
    }
  }
  img {
    margin: 40px auto;
  }
`;
