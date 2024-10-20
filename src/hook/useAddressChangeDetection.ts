import useHavahStore from '@/store/havahStore';
import { localStateHandler } from '@/util/localStateHandler';
import { useEffect, useState } from 'react';

export const useAddressChangeDetection = () => {
  const [initWalletAddress, setInitWalletAddress] = useState<{
    address: string;
    nid: string;
    isHavahConnected: boolean;
  }>();
  const { havahWalletInfo, resetHavahInfo } = useHavahStore();

  useEffect(() => {
    setInitWalletAddress(havahWalletInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isWalletAddressChange =
    havahWalletInfo?.address !== initWalletAddress?.address ||
    havahWalletInfo?.nid !== initWalletAddress?.nid;

  const isWalletAddressChanged = async () => {
    const currentAddress = await window.havah?.accounts();
    if (!currentAddress.address) {
      resetHavahInfo();
      // localStateHandler.walletConnect.reset();
      return true;
    }
    return isWalletAddressChange;
  };

  return { isWalletAddressChanged };
};
