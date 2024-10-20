'use client';
import React from 'react';
import { PioneerBoxStyle } from './camp.style';
import useGlobalStore from '@/store/globalStore';
import { pioneerVerifiedDataType } from '@/query/type';
import Image from 'next/image';
import COLOR from '@/constants/COLOR';
import { cdnUrl, videoUrlConverter } from '@/util/converter';
import { setWith } from 'lodash';
import { SVG } from '@/svg';
import useCampStore from '../_store';

type PioneerBoxProps = pioneerVerifiedDataType & {
  isClickable?: boolean;
  index: number;
  className?: string;
};

export default function PioneerBox(props: PioneerBoxProps) {
  const { collectionName, tokenId, type, url, index, className, equipped } =
    props;

  const { setShowCampModal, setSelectIndex } = useCampStore.getState();
  const _onClickBox = () => {
    setShowCampModal('infoPioneer');
    setSelectIndex(index);
  };

  return (
    <PioneerBoxStyle className={className} onClick={_onClickBox}>
      <div className="img__container">
        {type === 'MOVIE' && <video src={videoUrlConverter(url)} muted />}{' '}
        {type === 'IMAGE' && (
          <Image
            src={url}
            alt="nft"
            width={88}
            height={88}
            style={{
              objectFit: 'contain',
              backgroundColor: COLOR['WHITE__#FFFFFF']
            }}
          />
        )}
      </div>
      <div className="content">
        <div className="name">{collectionName}</div>
        <div className="tokenId">#{tokenId}</div>
      </div>
      {equipped && (
        <div className="label">
          <SVG.ICON.MZP18 />
          <span>Equipped</span>
        </div>
      )}
    </PioneerBoxStyle>
  );
}
