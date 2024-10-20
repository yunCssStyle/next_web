export type userInfoType = {
  user: {
    id: number;
    email: string;
    nickname: string;
    gold: number;
    newsletter: boolean;
    otpEnable: boolean;
    address: string;
  };
};

export type pioneerVerifiedDataType = {
  id: number;
  equipped: boolean;
  stat: {
    luck: number;
    silverTongue: number;
    stamina: number;
    intuition: number;
  };
  statBonus: {
    luck: number;
    silverTongue: number;
    stamina: number;
    intuition: number;
  };
  legendStatBonus: number;
  url: string;
  originUrl: string;
  type: 'IMAGE' | 'MOVIE';
  tokenId: number;
  collectionId: string;
  collectionName: string;
};

export type pioneerVerifiedListType = {
  collectionList: [
    {
      id: number;
      name: string;
    }
  ];
  equippedPioneer: pioneerVerifiedDataType | null;
  pioneers: pioneerVerifiedDataType[];
  nextPage: number;
  hasMore: boolean;
  total: number;
  size: number;
};

export type pioneerNftListType = {
  amount: number;
  collectionName: string;
  collectionSymbol: string;
  contractAddress: string;
  imageUri: string;
  name: string;
  scanAddress: string;
  tokenId: number;
  tokenUri: string;
}[];

export type miningRightType = {
  id: number;
  level: number;
  active: boolean;
  miningPower: number;
  energy: number;
};
export type miningRightLockUpListType = {
  levelList: number[];
  mines: miningRightType[];
  nextPage: number;
  hasMore: boolean;
  total: number;
  size: number;
};

export type miningRightNftListType = {
  contractAddress: string;
  collectionName: string;
  collectionSymbol: string;
  tokenId: number;
  amount: number;
  name: string;
  imageUri: string;
  tokenUri: string;
  type: 'IMAGE' | 'MOVIE';
  scanAddress: string;
}[];

export type historyType = {
  list: [
    {
      no: number;
      date: string;
      action?: 'CONVERT_TO_NFT' | 'RETURN_RIGHTS';
      from?: { token: 'gold' | 'mzt'; amount: number };
      to?: { token: 'gold' | 'mzt'; amount: number };
      status: 'PROCESSING' | 'SUCCESS' | 'FAILED';
      address: string;
    }
  ];
  currentPageNumber: number;
  totalPage: number;
};

export type historyConvertsType = {
  nextPage: number | null;
  hasMore: true;
  size: number;
  converts: {
    no: number;
    address: string;
    fromAmount: number;
    toAmount: number;
    txAddress: string;
    status: 'PROCESSING' | 'SUCCESS' | 'FAILED';
    type: 'GOLD' | 'MZT';
    time: string;
    url: string;
  }[];
};

export type historyMinesType = {
  nextPage: number | null;
  hasMore: boolean;
  size: number;
  mines: {
    no: number;
    address: string;
    txAddress: string;
    status: 'PROCESSING' | 'SUCCESS' | 'FAILED';
    type: 'CONVERT' | 'RETURN';
    time: string;
    url: string;
  }[];
};

export type tradingPostRuleType = {
  minimumMZT: number;
  minimumGold: number;
  goldToMzt: number;
  mztToGold: number;
  conversionRate: number;
};

export type isWrongType = {
  isWrong: boolean;
  type: 'multiLogin' | 'timeout' | 'unknown';
};

export type collectionListType = {
  collectionList: collectionType[];
};
export type collectionType = { id: number; name: string };

export type profileStatType = {
  data: {
    id: number;
    equipped: boolean;
    stat?: {
      luck: number;
      silverTongue: number;
      stamina: number;
      intuition: number;
    } | null;
    statBonus?: {
      luck: number;
      silverTongue: number;
      stamina: number;
      intuition: number;
    } | null;
    legendStatBonus: number;
    url: string;
    originUrl: string;
    type: 'IMAGE' | 'MOVIE';
    name: string;
    tokenId: number;
    collectionId: number;
    collectionName: string;
  };
  scanAddress: string;
};

type sortTyp = {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
};

type pageableTyp = {
  sort: sortTyp;
  pageNumber: number;
  offset: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
};

export type voteOptionsType = {
  id?: number;
  rate: number;
  optionPower: number;
  type: 'AGREE' | 'DISAGREE' | 'ABSTAIN' | 'ABSENCE';
};

export type statResetListType = {
  price: number;
  collectionList: collectionType[];
  profileList: {
    content: pioneerVerifiedDataType[];
    pageable: pageableTyp;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: sortTyp;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
  };
};

export type voteListType = {
  voteList: {
    content: VoteObjType[];
    pageable: pageableTyp;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: sortTyp;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
  };
};

type VoteObjType = {
  id: number;
  subject: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  status: 'ACTIVE' | 'UPCOMING' | 'PASSED' | 'FAILED' | 'EXECUTED';
  snapshotDateTime: string;
  voted?: string;
  proposer: string;
  totalPower: number;
  votedRate: number;
  voteOptions: voteOptionsType[];
};

export type voteDetailType = {
  enabled: boolean;
  myPower: number;
  mySelect?: number;
  vote: VoteObjType;
};

export type VoteType = 'AGREE' | 'DISAGREE' | 'ABSTAIN';

export type governanceDetailModalType = {
  totalPower: number;
  voteResult?: {
    content: [
      {
        nickname: string;
        address: string[];
        power: number;
        voteOption: VoteType;
      }
    ];
    pageable: {
      sort: {
        empty: boolean;
        unsorted: boolean;
        sorted: boolean;
      };
      pageNumber: number;
      offset: number;
      pageSize: number;
      paged: boolean;
      unpaged: boolean;
    };
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: sortTyp;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
  };
  votedPower: number;
  votedRate: number;
};

export type accountVerifyInfoType = {
  secretKey: string;
  qrCode: string;
  address: string;
};
