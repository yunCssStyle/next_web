import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import Axios from '@/axios/axios';
import QUERY_KEYS from '@/query/QUERY_KEYS';
import {
  governanceDetailModalType,
  voteDetailType,
  voteListType
} from '@/query/type';

const blockAutoRefetch = {
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
  staleTime: Infinity,
  cacheTime: Infinity,
  retry: false
};

const LIST = (pageNumber: number) => {
  const governanceListApi = async () => {
    return await Axios.get(`/governance/list?page=${pageNumber}`).then(
      (res) => res.data
    );
  };

  const { data, isLoading, error, refetch } = useQuery<voteListType>(
    QUERY_KEYS.GOVERNANCE_LIST,
    governanceListApi,
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      retry: false,
      enabled: false
    }
  );

  return {
    data,
    isLoading,
    error,
    refetch
  };
};

const DETAIL = (pageId: number) => {
  const governanceDetailApi = async () => {
    return await Axios.post('/governance/detail', {
      pageId: pageId
    }).then((res) => res.data);
  };

  const {
    fetchStatus,
    data: votesDetail,
    isLoading,
    error,
    isRefetching,
    refetch: refetchDetail
  } = useQuery<voteDetailType>(
    QUERY_KEYS.GOVERNANCE_DETAIL,
    governanceDetailApi,
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      retry: false,
      enabled: false
    }
  );

  return {
    fetchStatus,
    votesDetail,
    isLoading,
    error,
    refetchDetail,
    isRefetching
  };
};

const DETAIL_MODAL_LIST_INFINITY = (id: number, address?: string) => {
  const startPage = 1;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    isFetching,
    refetch,
    remove
  } = useInfiniteQuery<governanceDetailModalType>(
    QUERY_KEYS.GOVERNANCE_DETAIL_MODAL_LIST_INFINITY,
    ({ pageParam = startPage }) =>
      Axios.get('/governance/detail-modal-list', {
        params: {
          id,
          page: pageParam,
          address: !!address ? address : undefined
        }
      }).then((res) => {
        return res.data;
      }),
    {
      getNextPageParam: (lastLoadedPage, allPage) => {
        //로드된 마지마페이지를 기준으로 다음 페이지 호출
        if (lastLoadedPage.voteResult?.last ?? true) return undefined;

        //api에서 페이지 -1로 전달해서 호출하기 때문에 +2
        return (lastLoadedPage.voteResult?.pageable.pageNumber ?? 0) + 2;
      },
      ...blockAutoRefetch,
      enabled: false
    }
  );

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    refetch,
    isFetching,
    remove
  };
};

const QUERY_GOVERNANCE = {
  LIST,
  DETAIL,
  DETAIL_MODAL_LIST_INFINITY
};

export default QUERY_GOVERNANCE;
