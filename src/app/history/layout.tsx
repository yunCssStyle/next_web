'use client';

import { useRouter } from 'next/navigation';
import { CampLayoutStyle } from './layout.style';
import useGlobalStore from '@/store/globalStore';
import PageMenuButton from '@/components/PageMenuButton';
import { useSession } from 'next-auth/react';
import { use, useEffect } from 'react';
import useHistoryStore from './_store';
import { set } from 'lodash';

export default function HistoryLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const router = useRouter();
  const {
    historyLayoutSelected,
    setHistoryLayoutSelected,
    resetCurrentPageNumber,
    setSigninRedirectUrl
  } = useGlobalStore((state) => state);

  const { setInitState } = useHistoryStore();

  //click event
  const _onClickConvertHistory = () => {
    router.push('/history/convert?page=1');
    resetCurrentPageNumber();
    setHistoryLayoutSelected('convertHistory');
  };

  const _onClickMiningRight = () => {
    router.push('/history/miningright?page=1');
    resetCurrentPageNumber();
    setHistoryLayoutSelected('miningRight');
  };

  useEffect(() => {
    // if (status === 'authenticated') {
    //   router.push('/history/convert?page=1');
    // }
    if (status === 'unauthenticated') {
      setSigninRedirectUrl('/history/convert?page=1');
      router.push('/sign/signin');
    }
  }, [status, router, setSigninRedirectUrl]);

  useEffect(() => {
    setInitState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CampLayoutStyle>
      <h1>My History</h1>
      <div className="menu__box">
        <PageMenuButton
          text="Convert History"
          onClick={_onClickConvertHistory}
          selected={historyLayoutSelected === 'convertHistory'}
        />
        <div className="gap" />
        <PageMenuButton
          text="Mining Right"
          onClick={_onClickMiningRight}
          selected={historyLayoutSelected === 'miningRight'}
        />
      </div>
      {children}
    </CampLayoutStyle>
  );
}
