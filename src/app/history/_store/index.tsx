import { create } from 'zustand';

interface IUseHistoryStore {
  isFetchingConverter: boolean;
  setIsFetchingConverter: (isFetching: boolean) => void;
  isFetchingMiningRight: boolean;
  setIsFetchingMiningRight: (isFetching: boolean) => void;

  setInitState: () => void;
}

const useHistoryStore = create<IUseHistoryStore>((set, get) => ({
  isFetchingConverter: false,
  setIsFetchingConverter: (isFetching: boolean) =>
    set({ isFetchingConverter: isFetching }),

  isFetchingMiningRight: false,
  setIsFetchingMiningRight: (isFetching: boolean) =>
    set({ isFetchingMiningRight: isFetching }),

  setInitState: () => {
    set({ isFetchingConverter: false, isFetchingMiningRight: false });
  }
}));

export default useHistoryStore;
