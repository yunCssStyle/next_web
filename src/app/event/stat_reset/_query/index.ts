import { useQuery } from '@tanstack/react-query';
import Axios from '@/axios/axios';
import QUERY_KEYS from '@/query/QUERY_KEYS';
import { statResetListType } from '@/query/type';

const LIST = (
  pageNumber: number,
  address: string,
  collectionId?: Array<number>
) => {
  const statResetListApi = async () => {
    return await Axios.post(`/event/stat_reset/list`, {
      page: pageNumber,
      address: address,
      collectionId: collectionId
    }).then((res) => res.data);
  };

  const {
    fetchStatus,
    data: stat_list,
    isLoading: isStatListLoading,
    error: listError,
    refetch: stat_list_refetch
  } = useQuery<statResetListType>(QUERY_KEYS.STATRESET_LIST, statResetListApi, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
    enabled: false
  });

  return {
    fetchStatus,
    stat_list,
    isStatListLoading,
    listError,
    stat_list_refetch
  };
};

const QUERY_STATRESET = {
  LIST
};

export default QUERY_STATRESET;
