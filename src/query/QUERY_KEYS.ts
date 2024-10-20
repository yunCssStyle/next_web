const QUERY_KEYS = {
  // 사용
  PIONEER_VERIFIED_LIST_INFINITY: ['camp-pioneer-data-infinity'],
  PIONEER_VERIFIED_LIST_PAGE: (currentPageNumber: number) => [
    ...QUERY_KEYS.PIONEER_VERIFIED_LIST_INFINITY,
    currentPageNumber
  ],
  PIONEER_NFT_LIST: ['camp-pioneer-nft-data'],
  MINING_RIGHT_LOCK_UP_LIST_INFINITY: ['camp-mining-right-data-infinity'],
  MINING_RIGHT_LOCK_UP_LIST_PAGE: (currentPageNumber: number) => [
    ...QUERY_KEYS.MINING_RIGHT_LOCK_UP_LIST_INFINITY,
    currentPageNumber
  ],

  MINING_RIGHT_NFT_LIST: ['camp-mining-right-nft-data'],
  USER_INFO: ['user-info'],
  HISTORY_CONVERT: ['history-convert'],
  HISTORY_CONVERT_PAGE: (currentPageNumber: number) => [
    ...QUERY_KEYS.HISTORY_CONVERT,
    currentPageNumber
  ],
  HISTORY_MINING_RIGHT: ['history-mining-right'],
  HISTORY_MINING_RIGHT_PAGE: (currentPageNumber: number) => [
    ...QUERY_KEYS.HISTORY_MINING_RIGHT,
    currentPageNumber
  ],
  TRADING_POST_RULE: ['trading-post-rule'],
  IS_WRONG: ['is-wrong'],
  HAVAH_WALLET_VALID: ['havah-wallet-valid'],

  SERVER_TIME: ['server-time'],
  COLLECTION_LIST: ['collection-list'],
  GOVERNANCE_LIST: ['governance-list'],
  GOVERNANCE_DETAIL: ['governance-detail'],

  STATRESET_LIST: ['stat-reset-list'],

  // GOVERNANCE_DETAIL_MODAL_LIST: ['governance-detail-modal-list'],
  GOVERNANCE_DETAIL_MODAL_LIST_PAGE: (currentPageNumber: number) => [
    ...QUERY_KEYS.HISTORY_MINING_RIGHT,
    currentPageNumber
  ],
  GOVERNANCE_DETAIL_MODAL_LIST_INFINITY: [
    'governance-detail-modal-list-infinity'
  ],

  ACCOUNT_VERIFY_INFO: ['account-verify-info']
} as const;

export default QUERY_KEYS;
