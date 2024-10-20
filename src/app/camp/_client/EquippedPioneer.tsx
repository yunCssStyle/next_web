import React from 'react';
import { EquippedPioneerStyle } from './camp.style';
import { SVG } from '@/svg';
import Image from 'next/image';
import { pioneerVerifiedDataType } from '@/query/type';
import useGlobalStore from '@/store/globalStore';
import COLOR from '@/constants/COLOR';
import useCampStore from '../_store';

export default function EquippedPioneer(props: pioneerVerifiedDataType) {
  const { collectionName, tokenId, url, type } = props;
  const { setShowCampModal, setSelectIndex } = useCampStore.getState();
  const _onClickEquipped = () => {
    setShowCampModal('infoPioneer');
    setSelectIndex(null);
  };

  return (
    <EquippedPioneerStyle onClick={_onClickEquipped}>
      <div className="img__box">
        {type === 'MOVIE' && <video src={url} width={264} height={264} muted />}
        {type === 'IMAGE' && (
          <Image
            src={url}
            alt="nft"
            width={264}
            height={264}
            style={{
              objectFit: 'contain',
              backgroundColor: COLOR['WHITE__#FFFFFF']
            }}
            priority
          />
        )}

        <div className="label">
          <SVG.ICON.MZP />
          <span>Equipped</span>
        </div>
      </div>
      <div className="name__id">
        <div className="collection__name">{collectionName}</div>
        <div className="token__id">#{tokenId}</div>
      </div>
    </EquippedPioneerStyle>
  );
}
