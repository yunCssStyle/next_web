'use client';
import useCampStore from '@/app/camp/_store';
import useTradingPostStore from '@/app/tradingpost/_store';
import Axios from '@/axios/axios';
import useHavah from '@/hook/useHavah';
import useGlobalStore from '@/store/globalStore';
import useHavahStore from '@/store/havahStore';
import _ from 'lodash';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

export default function HavahValid() {
  const { data: session } = useSession();
  const { havahWalletInfo, resetHavahInfo } = useHavahStore();
  const { setShowGlobalModalState, resetShowGlobalModalState } =
    useGlobalStore();

  const { setShowCampModal, setSelectIndex, setOnClickOK } = useCampStore();
  const { setShowTradingPostModal } = useTradingPostStore();

  //debounce
  const [ableApiCall, setAbleApiCall] = useState(true);
  const { setForceDisconnect } = useHavah();

  const havahValidCall = () => {
    Axios.post('/wallet/valid', {
      address: havahWalletInfo.address
    })
      .then((valid) => {
        if (valid.data === false) {
          setShowGlobalModalState(
            true,
            'alreadyLinkedWallet',
            undefined,
            () => {
              resetShowGlobalModalState();
              //camp reset
              setShowCampModal(null);
              setSelectIndex(null);
              setOnClickOK(() => {});
              //tradingpost reset
              setShowTradingPostModal(null);
            }
          );

          const timeout = setTimeout(() => {
            resetHavahInfo();
            setForceDisconnect(true);
            clearTimeout(timeout);
          }, 100);
        }
      })
      .catch((err) => {
        resetHavahInfo();
      });
  };

  useEffect(() => {
    if (session) {
      if (ableApiCall && havahWalletInfo.address !== '') {
        setAbleApiCall(false);
        havahValidCall();
      }

      const timeout = setTimeout(() => {
        setAbleApiCall(true);
        clearTimeout(timeout);
      }, 700);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [havahWalletInfo.address, havahWalletInfo.nid, session]);
  return <></>;
}
