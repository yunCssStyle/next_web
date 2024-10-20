'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { CampLayoutStyle } from './layout.style';
import useGlobalStore from '@/store/globalStore';
import { useSession } from 'next-auth/react';
import useHavahStore from '@/store/havahStore';
import ConnectWallet from '@/components/connectWallet';

export default function CampLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pageParams = useSearchParams();
  const page = pageParams.get('page');
  const pageName = '/event/stat_reset?page=';

  const { setSigninRedirectUrl } = useGlobalStore((state) => state);

  const { status } = useSession();
  const { havahWalletInfo } = useHavahStore();
  useEffect(() => {
    if (status === 'unauthenticated') {
      setSigninRedirectUrl(`${pageName}${page}`);
      router.push('/sign/signin');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, router, setSigninRedirectUrl]);

  return (
    <CampLayoutStyle>
      <h1>Initialize Your Pioneer&apos;s Stats</h1>
      <ul className="description">
        <li>
          The list shows only the unequipped Pioneers with rolled stats that are
          present in the connected wallet.
        </li>
        <li>This event may end at any time without prior notice. </li>
        <li>
          In the future event, the reset price may change depending on the
          values of MZ and Gold.
        </li>
      </ul>
      {havahWalletInfo.isHavahConnected ? (
        children
      ) : (
        <ConnectWallet refreshButton={true} refreshUrl={`${pageName}${page}`} />
      )}
    </CampLayoutStyle>
  );
}
