'use client';
import Axios from '@/axios/axios';
import QUERY_CUSTOM from '@/query';
import useGlobalStore from '@/store/globalStore';
import useHavahStore from '@/store/havahStore';
import { useSession } from 'next-auth/react';

import { useCallback, useEffect } from 'react';
import IconService from 'icon-sdk-js';
import { localStateHandler } from '@/util/localStateHandler';
import useTradingPostStore from '@/app/tradingpost/_store';
import useCampStore from '@/app/camp/_store';

// havah type declare
declare global {
  interface Window {
    havah:
      | {
          accounts: any;
          connect: any;
          sign: any;
          sendTransaction: any;
          on: any;
        }
      | undefined;
  }
}

export default function useHavah() {
  const { status } = useSession();
  const { havahWalletInfo, setHavahInfo, resetHavahInfo, setForceDisconnect } =
    useHavahStore();
  const {
    setShowGlobalModalState,
    filterMiningRight,
    filterPioneer,
    currentPageNumber
  } = useGlobalStore.getState();

  const { setShowCampModal, setSelectIndex, setOnClickOK } =
    useCampStore.getState();

  const { setShowTradingPostModal } = useTradingPostStore();

  const { userInfo } = QUERY_CUSTOM.USER_INFO();
  const { data, refetch: pioneerNFTListRefetch } =
    QUERY_CUSTOM.PIONEER_NFT_LIST();

  const { refetch: miningRightListRefetch } =
    QUERY_CUSTOM.MINING_RIGHT_LOCK_UP_LIST_PAGE(
      currentPageNumber,
      status === 'authenticated',
      filterMiningRight
    );

  const { refetch: pioneerListRefetch } =
    QUERY_CUSTOM.PIONEER_VERIFIED_LIST_PAGE(
      currentPageNumber,
      status === 'authenticated',
      filterPioneer
    );

  const setHavahWalletInfo = useCallback(
    async (res: { address: string; nid: string }) => {
      if (localStateHandler.walletConnect.get() === false) return;

      if (
        res?.nid ===
        IconService.IconHexadecimal.add0xPrefix(
          process.env.NEXT_PUBLIC_HAVAH_NID
        )
      ) {
        const havahInfo = {
          address: res.address,
          nid: res?.nid,
          isHavahConnected: true
        };
        setHavahInfo(havahInfo);
      } else {
        setHavahInfo({
          address: '',
          nid: '',
          isHavahConnected: false
        });
      }
    },
    [setHavahInfo]
  );

  const connectHavahWallet = async () => {
    if (window.havah === undefined) {
      setShowGlobalModalState(true, 'installWallet');
      return;
    }

    await window.havah.connect().then(async (res: any) => {
      // todo: testnet에서는 연결 불가능하다는 모달 오픈
      if (
        res.body?.nid !==
        IconService.IconHexadecimal.add0xPrefix(
          process.env.NEXT_PUBLIC_HAVAH_NID
        )
      ) {
        setShowGlobalModalState(
          true,
          process.env.NEXT_PUBLIC_HAVAH_NID === '100'
            ? 'walletConnectionFailTestnet'
            : 'walletConnectionFailMainnet'
        );
        return;
      }

      if (res.body?.address) {
        return setHavahWalletInfo(res.body);
      }
    });
  };

  const havahIsCheck = useCallback(() => {
    if (window.havah === undefined) {
      return;
    }

    window.havah.accounts().then(async (res: any) => {
      if (res?.address && res?.nid) {
        setHavahWalletInfo(res);
      }
    });
  }, [setHavahWalletInfo]);

  const walletAddressChangeWatcher = useCallback(async () => {
    window.havah?.on('accountsChanged', async (res: any) => {
      if (!res.address) {
        return resetHavahInfo();
      }

      setShowGlobalModalState(false, '');
      setHavahWalletInfo(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetHavahInfo, setHavahInfo]);

  type signPayloadType = {
    originData: {};
    signature: string;
  };
  //signer
  /**
   *
   * @param successFn
   * @param cancelFn
   * @param message -> successFn에 넘겨줄 payload
   * @returns
   */
  const setSign = async (
    successFn: (payload: signPayloadType) => void,
    cancelFn: VoidFunction,
    message: {}
  ) => {
    if (!havahWalletInfo.isHavahConnected) {
      return connectHavahWallet();
    }

    if (window.havah === undefined) {
      setShowGlobalModalState(true, 'installWallet');
      return;
    }

    window.havah
      .sign(JSON.stringify(message))
      .then(
        (res: {
          signData: { signature: string };
          type: 'success' | 'cancel' | 'close';
        }) => {
          switch (res.type) {
            case 'success':
              const payload = {
                originData: message,
                signature: res.signData.signature
              };
              successFn(payload);
              break;
            default:
              cancelFn();
          }
        }
      );
  };

  //! sign modify
  const verifyPioneer = async (checkedList: number[]) => {
    const selectPioneerLockupList = checkedList.map((item) => ({
      tokenId: data![item].tokenId,
      contractAddress: data![item].contractAddress
    }));

    const successFn = async (payload: signPayloadType) => {
      await Axios.post('/camp/convert/verify', payload, { timeout: 30000 })
        .then((res) => {
          if (res.status === 200) {
            setShowCampModal('welcome');
            pioneerListRefetch();
          }
        })
        .catch((err) => {
          setShowCampModal('fail');
        });
    };

    const cancelFn = () => {
      setShowCampModal(null);
      setSelectIndex(null);
      setOnClickOK(() => {});
    };

    if (!data) {
      setShowCampModal(null);
      setSelectIndex(null);
      setOnClickOK(() => {});
      return;
    }

    const message = {
      address: havahWalletInfo?.address,
      selectPioneerLockupList
    };

    setShowCampModal('loadingConvertingToMinewarzVerification');

    setSign(successFn, cancelFn, message);
  };

  //transaction
  const importMiningRights = async (_tokenId: string, _count: string) => {
    const signData = {
      to: process.env.NEXT_PUBLIC_CONTRACT_MINING_RIGHT,
      method: 'burnIn',
      params: {
        _tokenId: _tokenId,
        _amount: _count,
        _memberId: userInfo?.user?.id.toString()
      }
    };

    return window
      .havah!.sendTransaction(signData)
      .then((res: any) => {
        if (res.type === 'success') {
          setShowCampModal('success');
        }

        if (res.type === 'cancel' || res.type === 'close') {
          setShowCampModal(null);
          setSelectIndex(null);
          setOnClickOK(() => {});
        }
        return res.type;
      })
      .catch((error: any) => {
        console.log('error', error);
      });
  };

  const exportMiningRights = async (target: {
    publicKey: string;
    id: number;
    level: number;
  }) => {
    setShowCampModal('loadingConvertingToNFT');

    const successFn = (payload: signPayloadType) => {
      Axios.post('/camp/convert/export', payload)
        .then((res) => {
          miningRightListRefetch();
          setShowCampModal('successTransaction');
        })
        .catch((err) => {
          console.error(err);
          setShowCampModal('fail');
        });
      //api call
    };

    const cancelFn = () => {
      setShowCampModal(null);
      setSelectIndex(null);
      setOnClickOK(() => {});
    };

    const message = {
      publicKey: target.publicKey,
      mineId: target.id,
      address: havahWalletInfo.address
    };

    setSign(successFn, cancelFn, message);
  };

  //transaction
  const covertMZTToGold = async (amount: number) => {
    const data = IconService.IconConverter.fromUtf8(
      JSON.stringify({
        method: process.env.NEXT_PUBLIC_TRANSFER_AND_CALL_METHOD,
        memberId: userInfo?.user?.id
      })
    );
    const signData = {
      to: process.env.NEXT_PUBLIC_CONTRACT_MZT,
      method: 'transferAndCall',
      params: {
        _to: process.env.NEXT_PUBLIC_CONTRACT_GOLD_CENTER,
        _value: IconService.IconConverter.toHex(amount * 10 ** 18),

        _data: data
      }
    };

    return window
      .havah!.sendTransaction(signData)
      .then((res: any) => {
        switch (res.type) {
          case 'success':
            setShowTradingPostModal('success');

            break;
          default:
            setShowTradingPostModal(null);
        }
      })
      .catch((error: any) => {
        setShowTradingPostModal('fail');
      });
  };

  const covertGoldToMZT = async (params: {
    publicKey: string;
    amount: number;
    fee: number;
  }) => {
    const successFn = async (payload: signPayloadType) => {
      Axios.post('/tradingpost/withdraw', payload).then((res) => {
        const result = res.data.result as withdrawCodeType;
        switch (result) {
          case 'OK':
            setShowTradingPostModal('successTransactionRequest');

            break;
          case 'NOT_ENOUGH_PACKING_BALANCE':
            setShowTradingPostModal('insufficientBalance');
            break;
          case 'EXCHANGE_GOLD_TO_MZT_FAILED':
          case 'NOT_FOUND_FEE':
          case 'SERVER_ERROR':
            setShowTradingPostModal('fail');
            break;
          case 'EXCEED_MEMBER_WITHDRAW_LIMIT':
            setShowTradingPostModal('memberWithdrawLimit');
            break;
          case 'EXCEED_SYSTEM_WITHDRAW_LIMIT':
            setShowTradingPostModal('systemWithdrawLimit');
            break;
          default:
            setShowTradingPostModal('fail');
        }
      });
    };

    const cancelFn = () => {
      setShowTradingPostModal(null);
    };

    const message = {
      publicKey: params.publicKey,
      gold: params.amount,
      address: havahWalletInfo.address
    };

    setSign(successFn, cancelFn, message);
  };

  const currentWalletChecker = async (type?: 'onlyEmptyAddress') => {
    //지갑 자동연결 on/off
    //current 주소가 없으면 강제로 연결 끊기, 자동연결 off
    //local storage에 연결된 주소가 없어도 연결 해제

    if (
      !localStateHandler.havahWalletInfo.get() ||
      !localStateHandler.walletConnect.get()
    ) {
      resetHavahInfo();
      return false;
    }

    const current = await window.havah?.accounts();

    if (current?.address && type !== 'onlyEmptyAddress') {
      localStateHandler.walletConnect.set();
      return true;
    }

    if (!current?.address) {
      localStateHandler.walletConnect.reset();

      resetHavahInfo();
      return false;
    }

    return true;
  };
  //! sign modify
  const statResetSign = async (params: {
    collectionId: number;
    tokenId: number;
  }): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const successFn = async (payload: signPayloadType) => {
        try {
          const res = await Axios.post('/event/stat_reset/reset', payload, {
            timeout: 30000
          });
          if (res.status === 200) {
            resolve('success');
          }
        } catch (err: any) {
          console.log('err', err);
          // Specify 'any' as the type of 'err'
          reject(err.client_code);
        }
      };

      const cancelFn = () => {
        console.log('err');
        reject('failed');
      };

      const message = {
        address: havahWalletInfo?.address,
        collectionId: params.collectionId,
        tokenId: params.tokenId
      };

      setSign(successFn, cancelFn, message);
    });
  };

  useEffect(() => {
    walletAddressChangeWatcher();
    // mainnet
    const timeout = setTimeout(() => {
      havahIsCheck();
      clearTimeout(timeout);
    }, 0);
  }, [havahIsCheck, walletAddressChangeWatcher]);

  return {
    connectHavahWallet,
    setForceDisconnect,
    setSign,
    verifyPioneer,
    importMiningRights,
    exportMiningRights,
    covertMZTToGold,
    covertGoldToMZT,
    currentWalletChecker,
    statResetSign
  };
}

type withdrawCodeType =
  | 'OK'
  | 'NOT_ENOUGH_PACKING_BALANCE'
  | 'EXCHANGE_GOLD_TO_MZT_FAILED'
  | 'NOT_FOUND_FEE'
  | 'SERVER_ERROR'
  | 'EXCEED_MEMBER_WITHDRAW_LIMIT'
  | 'EXCEED_SYSTEM_WITHDRAW_LIMIT';
