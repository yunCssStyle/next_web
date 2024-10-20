'use client';
import React from 'react';
import { BannerStyle } from './camp.style';
import { Button } from '@mui/material';
import Image from 'next/image';
import { LINK } from '@/constants/link';

interface BannerProps {
  type: 'pioneer' | 'miningright' | 'tradingpost' | 'governance';
}
export default function Banner({ type }: BannerProps) {
  return (
    <BannerStyle>
      <div className="content">
        <span
          className="text"
          dangerouslySetInnerHTML={{ __html: BannerTypes[type].text }}
        />
        <Button
          onClick={() => window.open(BannerTypes[type].guideUrl, '_blank')}
        >
          Go to Guide
        </Button>
      </div>
      <Image
        src={BannerTypes[type].imgUrl}
        alt="banner"
        width={150}
        height={184}
        quality={90}
      />
    </BannerStyle>
  );
}

const BannerTypes: {
  [key in BannerProps['type']]: {
    text: string;
    imgUrl: string;
    guideUrl: string;
  };
} = {
  pioneer: {
    text: '<span>Looking to register </span><span>your NFT as a Pioneer</span>',
    imgUrl: '/assets/images/banner_papa.png',
    guideUrl: LINK.GUIDE_PIONEER
  },
  miningright: {
    text: '<span>Looking to </span><span>strike riches</span><span> in MINE WARZ!?</span>',
    imgUrl: '/assets/images/banner_kiki.png',
    guideUrl: LINK.GUIDE_MINING_RIGHT
  },
  tradingpost: {
    text: 'Press the guide button for token conversion details.',
    imgUrl: '/assets/images/banner_tradingpost.png',
    guideUrl: LINK.GUIDE_TRADING_POST
  },
  governance: {
    text: 'Learn more about MINE WARZ governance and voting.',
    imgUrl: '/assets/images/banner_governance.png',
    guideUrl: LINK.GUIDE_GOVERNANCE
  }
};
