import { create } from 'zustand';

interface IUseGovernanceStore {
  showDetailInfoModal: boolean;
  setShowDetailInfoModal: (show: boolean) => void;

  modalInputValue: string;
  setModalInputValue: (value: string) => void;

  searchInputValue: string;
  setSearchInputValue: (value: string) => void;

  selectVoteId: number;
  setSelectVoteId: (id: number) => void;

  backPageId: number;
  setBackPageId: (pageNum: number) => void;

  backScrollTo: number;
  setBackScrollTo: (scrollTo: number) => void;
}

const useGovernanceStore = create<IUseGovernanceStore>((set, get) => ({
  showDetailInfoModal: false,
  setShowDetailInfoModal: (show) => set(() => ({ showDetailInfoModal: show })),

  modalInputValue: '',
  setModalInputValue: (value) => set(() => ({ modalInputValue: value })),

  searchInputValue: '',
  setSearchInputValue: (value) => set(() => ({ searchInputValue: value })),

  selectVoteId: 1,
  setSelectVoteId: (id) => set(() => ({ selectVoteId: id })),

  backPageId: 1,
  setBackPageId: (pageNum) => set(() => ({ backPageId: pageNum })),

  backScrollTo: 0,
  setBackScrollTo: (scrollTo) => set(() => ({ backScrollTo: scrollTo }))
}));

export default useGovernanceStore;
