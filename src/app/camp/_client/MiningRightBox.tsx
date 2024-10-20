'use client';
import React from 'react';
import { MiningRightBoxStyle } from './camp.style';
import Image from 'next/image';
import { SVG } from '@/svg';
import useGlobalStore from '@/store/globalStore';
import { miningRightType } from '@/query/type';
import useCampStore from '../_store';

type MiningRightBoxProps = miningRightType & {
  index: number;

  isClickable?: boolean;
  className?: string;
};

export default function MiningRightBox(props: MiningRightBoxProps) {
  const { id, active = false, level, index, className } = props;

  const { setShowCampModal, setSelectIndex } = useCampStore.getState();

  const _onClickMiningRightBox = () => {
    if (active) {
      return setShowCampModal('alreadyEquippedNFT');
    }
    setShowCampModal('infoMiningRight');
    setSelectIndex(index);
  };

  return (
    <MiningRightBoxStyle
      className={className}
      isActive={active}
      onClick={_onClickMiningRightBox}
    >
      <div className="img__box">
        <Image
          src={`/assets/images/mining_right_lv${level}.png`}
          alt="mining_right_lv1"
          width={88}
          height={88}
        />
      </div>
      <div className="info">
        <div className="name">Mining Right Lv.{level}</div>
        <div className="token__id">
          <span>
            <Image
              src="/assets/images/icon_infinity.png"
              alt="ethereum"
              width={24}
              height={24}
            />
          </span>
        </div>
      </div>
      <div className="label">
        {active ? (
          <>
            <SVG.ICON.PICKAXE />
            <span>Active</span>
          </>
        ) : (
          <span>Non-NFT</span>
        )}
      </div>
    </MiningRightBoxStyle>
  );
}
