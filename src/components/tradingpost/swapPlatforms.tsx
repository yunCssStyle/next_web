import React from 'react';
import { SwapPlatformsStyle } from './style';
import Image from 'next/image';
import { SVG } from '@/svg';
import COLOR from '@/constants/COLOR';
import { Button } from '@mui/material';
import { LINK } from '@/constants/link';

export default function SwapPlatforms() {
  return (
    <SwapPlatformsStyle>
      <h5>swap platforms</h5>
      {platforms.map((platform, index) => (
        <Button
          key={index}
          onClick={() => window.open(platform.link, '_blank')}
        >
          <div className="info__box">
            <Image src={platform.symbol} alt="symbol" width={30} height={30} />
            <div className="name__comments">
              <span className="name">{platform.name}</span>
              <span className="comments">{platform.comments}</span>
            </div>
          </div>
          {SVG.ICON.SHORTCUT_CUSTOM(COLOR['GRAY2__#565656'])}
        </Button>
      ))}
      <span className="notification">
        <span className="dot" /> These platforms are not serviced by MINE WARZ.
      </span>
    </SwapPlatformsStyle>
  );
}

const platforms = [
  {
    symbol: '/assets/images/icon_SWFT.png',
    name: 'SWFT',
    comments: 'Swap your token to HVH',
    link: LINK.SWFT
  },
  {
    symbol: '/assets/images/icon_HAVAHswap.png',
    name: 'HAVAHswap',
    comments: 'Swap HVH to MZT',
    link: LINK.HAVAH_SWAP
  }
];
