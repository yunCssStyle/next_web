import React from 'react';
import { LoadingConvertingModalStyle } from './modal.style';
import Image from 'next/image';

interface LoadingConvertingModalProps {
  title?: string;
  type?: 'toNft' | 'toMinewarz' | 'converting';
  commentType?: 'confirmation' | 'verification';
}

//legacy Modal LoadingModal로 대체가능
export default function LoadingConvertingModal(
  props: LoadingConvertingModalProps
) {
  const { title, type, commentType = 'confirmation' } = props;

  const generateTitle = (type: LoadingConvertingModalProps['type']) => {
    switch (type) {
      case 'toNft':
        return <p className="text">Converting Mining Right to NFT...</p>;
      case 'toMinewarz':
        return <p className="text">Moving to the world of MINE WARZ...</p>;
      case 'converting':
        return <p className="text">Converting...</p>;
      default:
        return null;
    }
  };

  const generateComment = (
    commentType: LoadingConvertingModalProps['commentType']
  ) => {
    switch (commentType) {
      case 'confirmation':
        return (
          <>
            <span>Awaiting confirmation...</span>
            <p className="notification">
              Confirm this transaction in your HAVAH Wallet.
            </p>
          </>
        );
      case 'verification':
        return (
          <>
            <span>Waiting for verification...</span>
            <p className="notification">Verify from your HAVAH Wallet.</p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <LoadingConvertingModalStyle>
      <div className="modal">
        {title ? <p className="text">{title}</p> : generateTitle(type)}

        <Image
          src="/assets/images/loading_papa.png"
          alt="loading"
          width="160"
          height="160"
        />

        {generateComment(commentType)}
      </div>
    </LoadingConvertingModalStyle>
  );
}
