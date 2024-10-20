'use client';
import ModalLayout from '@/components/modal/ModalLayout';
import React from 'react';
import styled from '@emotion/styled';
import COLOR from '@/constants/COLOR';
import DetailModalTotalAndSearch from './DetailModal.TotalAndSearch';
import DetailModalList from './DetailModal.List';

interface DetailModalProps {
  voteId: number;
  isOpen: boolean;
  onClose: () => void;
}
export default function DetailModal({
  voteId,
  isOpen,
  onClose
}: DetailModalProps) {
  //선택한 투표아이디 governance store에 저장
  return (
    <ModalLayout
      title="View Voting Detail"
      isOpen={isOpen}
      onClose={onClose}
      bgColor={COLOR['GRAY8__#FAFAFA']}
    >
      <InnerStyle>
        <DetailModalTotalAndSearch voteId={voteId} />
        <DetailModalList voteId={voteId} />
      </InnerStyle>
    </ModalLayout>
  );
}

const InnerStyle = styled.div`
  width: 100%;
`;
