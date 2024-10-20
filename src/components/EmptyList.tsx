import Image from 'next/image';
import React from 'react';
import { EmptyListStyle } from './modal/modal.style';

type EmptyListType =
  | 'history'
  | 'camp'
  | 'addSelectModal'
  | 'voteDetailModal'
  | 'voteDetailModal_noVotesCast'
  | 'wallet';
export type EmptyListProps = {
  type: EmptyListType;
};
export default function EmptyList(props: EmptyListProps) {
  const { type } = props;

  const generateTextForType = (type: EmptyListType) => {
    switch (type) {
      case 'history':
        return <span>No Record Found</span>;
      case 'camp':
        return (
          <>
            <span>Camp is empty.</span>
            <p>
              Purchase necessary items <span>from the market</span> or add NFTs
              stashed <span>in your wallet!</span>
            </p>
          </>
        );
      case 'addSelectModal':
        return <span>No NFTs</span>;
      case 'voteDetailModal':
        return (
          <>
            <span>No results found.</span>
            <p>Please check the address and try again.</p>
          </>
        );
      case 'voteDetailModal_noVotesCast':
        return (
          <>
            <span>No voting done yet!</span>
          </>
        );
      case 'wallet':
        return (
          <>
            <span>
              There are no NFTs in this wallet that can be initialized.
            </span>
            <p style={{ maxWidth: '100%' }}>
              Please try a different wallet or purchase new NFTs and claim them
              as Pioneers.
            </p>
          </>
        );

      default:
        return;
    }
  };

  return (
    <EmptyListStyle {...props}>
      <Image
        src="/assets/images/camp_empty_kiki.png"
        alt=""
        width={160}
        height={160}
      />
      {generateTextForType(type)}
    </EmptyListStyle>
  );
}
