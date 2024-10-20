'use client';

import useGlobalStore from '@/store/globalStore';
import useHavahStore from '@/store/havahStore';

/**
 * 지갑 설치 및 연결 여부 체크 후 모달 또는 콜백 실행
 * @param callback
 */

export const walletChecker = (callback: () => void) => {
  if (window.havah === undefined) {
    return useGlobalStore
      .getState()
      .setShowGlobalModalState(true, 'installWallet');
  }

  if (!useHavahStore.getState().havahWalletInfo.isHavahConnected) {
    return useGlobalStore
      .getState()
      .setShowGlobalModalState(true, 'connectWallet');
  }

  return callback();
};
