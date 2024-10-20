'ues client';
import useGovernanceStore from '@/app/governance/_store';
import React, { useEffect } from 'react';

export type LoadingType = {
  scrollTo?: number;
};
export default function ScrollTo(props: LoadingType) {
  const { scrollTo = 0 } = props;

  useEffect(() => {
    document.body.style.overflowX = 'visible';
    window.scrollTo({ top: scrollTo });
    return () => {
      document.body.style.overflowX = 'hidden';
    };
  }, [scrollTo]);

  return <></>;
}
