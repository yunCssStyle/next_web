'use client';
import { TooltipAccountStyle } from './layout.style';
import { SVG } from '@/svg';
import QUERY_CUSTOM from '@/query';
import { thousandsSeparator } from '@/util/converter';
import { useRouter } from 'next/navigation';
import { SIGNOUT } from '@/util/signout';
import useGlobalStore from '@/store/globalStore';
import { signOut, useSession } from 'next-auth/react';
import { sign } from 'crypto';

//Tooltip Account
interface IProps {
  isOpen: boolean;
  onClickClose: () => void;
}

const TooltipAccount = ({ isOpen, onClickClose }: IProps) => {
  const { status } = useSession();

  const { userInfo, remove } = QUERY_CUSTOM.USER_INFO(
    status === 'authenticated'
  );
  const router = useRouter();
  const { setCurrentPageNumber } = useGlobalStore();
  const gold = userInfo
    ? thousandsSeparator(userInfo?.user?.gold ?? 0, 3, true)
    : 0;

  const [int, dec] = gold.toString().split('.');

  const accountAction = {
    history: () => {
      setCurrentPageNumber(1);

      router.push('/history/convert?page=1');
      onClickClose();
    },
    setting: () => {
      router.push('/account-setting');
      onClickClose();
    },
    signout: () => {
      remove();
      SIGNOUT();
    }
  };

  return (
    <TooltipAccountStyle isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
      <svg
        className="tail"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="10"
        viewBox="0 0 18 10"
        fill="none"
      >
        <path
          d="M0 10L7.51341 1.65176C8.3079 0.769004 9.69211 0.769006 10.4866 1.65177L18 10H0Z"
          fill="white"
        />
      </svg>
      <div className="gold__box">
        <div className="nickname">
          <span>
            {userInfo?.user?.nickname
              ? userInfo?.user?.nickname
              : 'Set your in-app nickname'}
          </span>
        </div>
        <div className="gold">
          <SVG.ICON.GOLD />
          <div className="amount">
            <span>{int}</span>
            {dec && <span className="decimal">{`.${dec}`}</span>}
          </div>
          <span className="unit">Gold</span>
        </div>
      </div>
      <div className="menu">
        <button onClick={accountAction.history}>
          <SVG.ICON.HISTORY />
          <span>History</span>
        </button>
        <button onClick={accountAction.setting}>
          <SVG.ICON.SETTING />
          <span>Account Settings</span>
        </button>
        <button onClick={() => accountAction.signout()}>
          <SVG.ICON.SIGNOUT />
          <span>Sign Out</span>
        </button>
      </div>
    </TooltipAccountStyle>
  );
};

export default TooltipAccount;
