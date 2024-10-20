'use client';

import Slogan from '@/components/brand/Slogan/Slogan';
import InGame from '@/components/brand/ingame/InGame';
import GameFeature from '@/components/brand/game-feature/GameFeature';
import { BrandPageStyle } from './page.style';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import MiningRightPfpStats from '@/components/brand/miningRightPfpStats';
import { scrollLock, scrollRelease } from '@/util/scrollLock';
import MiningRightPfpStatsReset from '@/components/brand/miningRightPfpStatsReset';

export default function Home() {
  const { status } = useSession();
  const [showPioneerStatModal, setShowPioneerStatModal] = useState(false);

  useEffect(() => {
    if (opener && status === 'authenticated') {
      try {
        const parents: string = window?.opener?.location?.href ?? '';
        if (
          parents === process.env.NEXT_PUBLIC_DOMAIN + '/sign/signin' ||
          parents === process.env.NEXT_PUBLIC_DOMAIN + '/sign/signup'
        ) {
          setTimeout(() => {
            window.close();
          }, 200);
        }
      } catch {}
    }
  }, [status]);

  useEffect(() => {
    if (showPioneerStatModal) {
      scrollLock();
    } else {
      scrollRelease();
    }
  }, [showPioneerStatModal]);

  return (
    <BrandPageStyle>
      <Slogan />
      <InGame />
      <GameFeature />
      <div className="sticky_btns">
        <div>
          <MiningRightPfpStatsReset />
          <MiningRightPfpStats
            showModal={showPioneerStatModal}
            setShowModal={setShowPioneerStatModal}
          />
          {/* <MiningRightOnSale /> */}
        </div>
      </div>
    </BrandPageStyle>
  );
}
