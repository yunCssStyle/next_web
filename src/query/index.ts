'use client';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import QUERY_KEYS from './QUERY_KEYS';
import {
  miningRightLockUpListType,
  miningRightNftListType,
  pioneerVerifiedListType,
  pioneerNftListType,
  userInfoType,
  historyConvertsType,
  historyMinesType,
  tradingPostRuleType,
  isWrongType,
  collectionListType
} from './type';
import Axios from '@/axios/axios';
import useHavahStore from '@/store/havahStore';
import { SIGNOUT } from '@/util/signout';

const blockAutoRefetch = {
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
  staleTime: Infinity,
  cacheTime: Infinity,
  retry: false
};

const autoRefetch5min = {
  refetchOnWindowFocus: true,
  refetchOnReconnect: true,
  refetchOnMount: true,
  staleTime: 1000 * 60 * 5,
  cacheTime: 1000 * 60 * 5,
  retry: false
};

const PIONEER_VERIFIED_LIST_INFINITY = (collectionIds?: number[]) => {
  const pioneerListApi = async (page: number, collectionIds: string) => {
    return await Axios.get('/camp/list/pioneer', {
      params: { collectionIds, page }
    }).then((res) => res.data);
  };

  const startPage = 0;
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    isFetching,
    refetch
  } = useInfiniteQuery<pioneerVerifiedListType>(
    QUERY_KEYS.PIONEER_VERIFIED_LIST_INFINITY,
    ({ pageParam = startPage }) =>
      pioneerListApi(
        pageParam,
        JSON.stringify(collectionIds) ?? JSON.stringify([])
      ),
    {
      getNextPageParam: (lastPage, allPosts) => {
        return lastPage.nextPage ? allPosts.length : undefined;
      },
      ...blockAutoRefetch
    }
  );

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    refetch,
    isFetching
  };
};

const PIONEER_NFT_LIST = () => {
  const { havahWalletInfo } = useHavahStore();

  const pioneerNFTListApi = async () => {
    return await Axios.post('/camp/list/pioneer-nft', {
      walletAddress: havahWalletInfo?.address
    }).then((res) => res.data);
  };

  const { isLoading, isFetching, data, refetch } = useQuery<pioneerNftListType>(
    QUERY_KEYS.PIONEER_NFT_LIST,
    pioneerNFTListApi,
    { ...blockAutoRefetch, enabled: false }
  );

  return {
    isLoading,
    isFetching,
    data,
    refetch
  };
};

const PIONEER_VERIFIED_LIST_PAGE = (
  page: number,
  isSession: boolean = false,
  collectionIds?: number[]
) => {
  const pioneerListApi = async (page: number, collectionIds: string) => {
    return await Axios.get('/camp/list/pioneer', {
      params: { collectionIds, page }
    }).then((res) => res.data);
  };
  const isCampLocation =
    (typeof window !== 'undefined' && window?.location.href.includes('camp')) ??
    false;

  const { data, isLoading, isFetching, refetch, remove } =
    useQuery<pioneerVerifiedListType>(
      QUERY_KEYS.PIONEER_VERIFIED_LIST_PAGE(page),
      () =>
        pioneerListApi(
          page,
          JSON.stringify(collectionIds) ?? JSON.stringify([])
        ),
      {
        // ...blockAutoRefetch,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: isSession && isCampLocation
      }
    );

  return {
    data,
    isLoading,
    isFetching,
    refetch,
    remove
  };
};
const MINING_RIGHT_LOCK_UP_LIST_PAGE = (
  page: number,
  isSession: boolean = false,
  levels?: number[]
) => {
  const miningRightLockupListApi = async (page: number, levels: string) => {
    return await Axios.get('/camp/list/miningright', {
      params: { levels, page }
    }).then((res) => res.data);
  };

  const isCampLocation =
    (typeof window !== 'undefined' &&
      window?.location.href.includes('miningright')) ??
    false;

  const { data, isLoading, isFetching, refetch, remove } =
    useQuery<miningRightLockUpListType>(
      QUERY_KEYS.MINING_RIGHT_LOCK_UP_LIST_PAGE(page),
      () =>
        miningRightLockupListApi(
          page,
          JSON.stringify(levels) ?? JSON.stringify([])
        ),
      {
        // ...blockAutoRefetch,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: isSession && isCampLocation
      }
    );

  return {
    data,
    isLoading,
    isFetching,
    refetch,
    remove
  };
};

const MINING_RIGHT_LOCK_UP_LIST_INFINITY = (
  levels?: number[],
  isSession: boolean = false
) => {
  const miningRightLockupListApi = async (page: number, levels: string) => {
    return await Axios.get('/camp/list/miningright', {
      params: { levels, page }
    }).then((res) => res.data);
  };

  const startPage = 0;
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    isFetching,
    refetch
  } = useInfiniteQuery<miningRightLockUpListType>(
    QUERY_KEYS.MINING_RIGHT_LOCK_UP_LIST_INFINITY,
    ({ pageParam = startPage }) =>
      miningRightLockupListApi(
        pageParam,
        JSON.stringify(levels) ?? JSON.stringify([])
      ),
    {
      getNextPageParam: (lastPage, allPosts) => {
        return lastPage.nextPage ? allPosts.length : undefined;
      },
      ...blockAutoRefetch,
      enabled: isSession
    }
  );

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    refetch,
    isFetching
  };
};

const MINING_RIGHT_NFT_LIST = () => {
  const { havahWalletInfo } = useHavahStore();

  const miningRightNFTListApi = async () => {
    return await Axios.get('/camp/list/miningright-nft', {
      params: { address: havahWalletInfo?.address }
    }).then((res) => res.data);
  };

  const { isLoading, isFetching, data, refetch, error } =
    useQuery<miningRightNftListType>(
      QUERY_KEYS.MINING_RIGHT_NFT_LIST,
      miningRightNFTListApi,
      {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: true,
        retry: false
      }
    );

  return {
    isLoading,
    isFetching,
    data,
    refetch,
    error
  };
};

const USER_INFO = (isSession: boolean = false) => {
  const userInfoAPI = async () => {
    return await Axios.get('/user-info')
      .then((res) => res.data)
      .catch(async (err) => {
        if (err.client_message === 'Bad Request') {
          SIGNOUT();
        }

        return null;
      });
  };

  const { isLoading, isFetching, data, refetch, error, isSuccess, remove } =
    useQuery(QUERY_KEYS.USER_INFO, userInfoAPI, {
      refetchOnWindowFocus: true,
      refetchOnReconnect: false,
      refetchOnMount: false,
      // staleTime: Infinity,
      // cacheTime: Infinity,
      retry: false,
      enabled: isSession
    });
  return {
    userInfo: data as userInfoType,
    isLoading,
    isFetching,
    refetch,
    error,
    isSuccess,
    remove
  };
};

const HISTORY = {
  CONVERT: (currentPageNumber: number) => {
    const api = async () => {
      return await Axios.get(`/history/convert?page=${currentPageNumber}`).then(
        (res) => res.data
      );
    };

    const { data, isLoading, isFetching, refetch, error } =
      useQuery<historyConvertsType>(
        QUERY_KEYS.HISTORY_CONVERT_PAGE(currentPageNumber),
        api,
        {
          ...blockAutoRefetch
        }
      );
    return {
      data,
      isLoading,
      isFetching,
      refetch,
      error
    };
  },
  MINING_RIGHT: (currentPageNumber: number) => {
    const api = async () => {
      return await Axios.get(
        `/history/miningright?page=${currentPageNumber}`
      ).then((res) => res.data);
    };

    const { data, isLoading, isFetching, refetch, error } =
      useQuery<historyMinesType>(
        QUERY_KEYS.HISTORY_MINING_RIGHT_PAGE(currentPageNumber),
        api,
        {
          ...blockAutoRefetch
        }
      );
    return {
      data,
      isLoading,
      isFetching,
      refetch,
      error
    };
  }
};

const TRADING_POST_RULES = () => {
  const api = async () => {
    return await Axios.get('/tradingpost/rule').then((res) => res.data);
  };

  const { data, isLoading, isFetching, refetch, error } =
    useQuery<tradingPostRuleType>(
      QUERY_KEYS.TRADING_POST_RULE,
      api,
      blockAutoRefetch
    );
  return {
    data,
    isLoading,
    isFetching,
    refetch,
    error
  };
};

const IS_WRONG = (isSession: boolean) => {
  const api = async () => {
    return await Axios.get('/isWrong').then((res) => res.data);
  };

  const { data, isLoading, isFetching, refetch, error } = useQuery<isWrongType>(
    QUERY_KEYS.IS_WRONG,
    api,
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      cacheTime: 1000,
      staleTime: 1000,
      enabled: isSession
    }
  );

  return {
    isWrong: data,
    isWrongRefetch: refetch
  };
};

const SERVER_TIME = () => {
  const api = async () => {
    return await Axios.get('/server-utc').then((res) => res.data);
  };

  const { data, isLoading, isFetching, refetch, error } = useQuery<number>(
    QUERY_KEYS.SERVER_TIME,
    api,
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      cacheTime: 1000,
      staleTime: 1000
    }
  );

  return {
    serverTime: data ?? 0,
    severTimeRefetch: refetch
  };
};

const COLLECTION_LIST = () => {
  const controllerListApi = async () => {
    return await Axios.get('/profile/controller').then((res) => res.data);
  };

  const {
    data: collectionListData,
    isLoading: isCollectionListLoading,
    error: isCollectionListError
  } = useQuery<collectionListType>(
    QUERY_KEYS.COLLECTION_LIST,
    controllerListApi,
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
      retry: false
    }
  );

  return {
    isCollectionListLoading,
    collectionListData,
    isCollectionListError
  };
};

const QUERY_CUSTOM = {
  PIONEER_VERIFIED_LIST_PAGE,
  PIONEER_VERIFIED_LIST_INFINITY,
  PIONEER_NFT_LIST,
  MINING_RIGHT_LOCK_UP_LIST_PAGE,
  MINING_RIGHT_LOCK_UP_LIST_INFINITY,
  MINING_RIGHT_NFT_LIST,
  USER_INFO,
  HISTORY,
  TRADING_POST_RULES,
  IS_WRONG,
  SERVER_TIME,
  COLLECTION_LIST
};

export default QUERY_CUSTOM;
