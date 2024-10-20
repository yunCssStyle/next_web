'use client';
import React from 'react';
import { MiningRightBoxStyle } from './camp.style';
import Image from 'next/image';
import { SVG } from '@/svg';
import { miningRightNftListType } from '@/query/type';
import COLOR from '@/constants/COLOR';

type MiningRightBoxProps = miningRightNftListType[0] & {
  className?: string;
  disabled?: boolean;
};

export default function MiningRightBoxForSelectModal(
  props: MiningRightBoxProps
) {
  const { tokenId, className, scanAddress, disabled } = props;

  const _onClickShortcut = (e: any) => {
    e.stopPropagation();
    window.open(scanAddress, '_blank');
  };

  return (
    <MiningRightBoxStyle className={className}>
      <Image
        src={`/assets/images/mining_right_lv${tokenId}.png`}
        alt="mining_right_lv1"
        width={88}
        height={88}
      />
      <div className={`info ${disabled ? 'disabled' : ''}`}>
        <div className="name">Mining Right Lv.{tokenId}</div>
        <div className="token__id">
          <span>
            <Image
              src="/assets/images/icon_infinity.png"
              alt="ethereum"
              width={24}
              height={24}
            />
          </span>

          {/* <div className="shortcut" onClick={_onClickShortcut}>
            {SVG.ICON.SHORTCUT_CUSTOM(COLOR['GRAY4__#B1B1B1'])}
          </div> */}
        </div>
      </div>
    </MiningRightBoxStyle>
  );
}
