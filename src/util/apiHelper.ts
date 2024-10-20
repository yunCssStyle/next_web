import Axios from '@/axios/axios';

export const apiHelper = {
  getBalanceOfMZT: async (address: string) => {
    return await Axios.get('/balanceOfMZT', {
      params: { _owner: address }
    }).then((res) => {
      return res.data;
    });
  }
};
