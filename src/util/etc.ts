import useHavah from '@/hook/useHavah';
import { localStateHandler } from './localStateHandler';

export const copyToClipboard = (string: string) => {
  navigator.clipboard.writeText(String(string));
};

export const installWallet = () => {
  window.open(
    'https://chrome.google.com/webstore/detail/havah-wallet/cnncmdhjacpkmjmkcafchppbnpnhdmon',
    '_blank'
  );
};
