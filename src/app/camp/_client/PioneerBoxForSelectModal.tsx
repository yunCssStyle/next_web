'use client';
import React, { useEffect, useState } from 'react';
import { PioneerBoxStyle } from './camp.style';
import { pioneerNftListType } from '@/query/type';
import { SVG } from '@/svg';
import Image from 'next/image';
import COLOR from '@/constants/COLOR';
import { getNFTUriType } from '@/util/getNFTUriType';

type PioneerBoxProps = pioneerNftListType[0];

export type mediaType = {
  uri: string;
  type?: 'video' | 'image';
};
export default function PioneerBoxForSelectModal(props: PioneerBoxProps) {
  const { collectionName, tokenId, imageUri, scanAddress } = props;
  const [media, setMedia] = useState<mediaType>({ uri: '' });

  const _onClickShortcut = (e: any) => {
    e.stopPropagation();
    window.open(scanAddress, '_blank');
  };

  useEffect(() => {
    // 서버 부하를 줄이기 위해 미디어 타입을 front에서 확인 한다.
    getNFTUriType(imageUri)
      .then((res) => {
        setMedia(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [imageUri]);

  return (
    <PioneerBoxStyle>
      <div className="img__container">
        {media.type === 'video' && <video src={media.uri} muted />}
        {media.type === 'image' && (
          <Image
            src={media.uri}
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
        <div className="tokenId">
          <span>#{tokenId}</span>
          <span className="shortcut" onClick={_onClickShortcut}>
            {SVG.ICON.SHORTCUT_CUSTOM(COLOR['GRAY4__#B1B1B1'])}
          </span>
        </div>
      </div>
    </PioneerBoxStyle>
  );
}
