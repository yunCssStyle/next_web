import Axios from '@/axios/axios';
import QUERY_KEYS from '@/query/QUERY_KEYS';
import { accountVerifyInfoType } from '@/query/type';
import { useQuery } from '@tanstack/react-query';

const VERIFY_INFO = () => {
  const governanceListApi = async () => {
    return await Axios.get(`/user-info/verify-info`).then((res) => res.data);
  };

  const { data, isLoading, isFetching, error, refetch } =
    useQuery<accountVerifyInfoType>(
      QUERY_KEYS.ACCOUNT_VERIFY_INFO,
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
    isFetching,
    isLoading,
    error,
    refetch
  };
};

const QUERY_ACCOUNT = { VERIFY_INFO };

export default QUERY_ACCOUNT;
