import React, { useState } from 'react';
import styled from '@emotion/styled';
import RefreshButton from './RefreshButton';
import ButtonCustom from './ButtonCustom';
import useHavah from '@/hook/useHavah';
import { localStateHandler } from '@/util/localStateHandler';
import Image from 'next/image';

interface IProps {
  refreshButton?: boolean;
  refreshUrl?: string;
}

export default function ConnectWallet(Props: IProps) {
  const { refreshButton = false, refreshUrl } = Props;
  const [isFetching, setIsFetching] = useState(false);

  const { connectHavahWallet, currentWalletChecker } = useHavah();

  const _onClickRefresh = () => {
    setIsFetching(true);
    setTimeout(() => {
      window.open(`${refreshUrl}`, '_self');
    }, 1000);
  };

  const _onClickButton = async () => {
    await currentWalletChecker();
    localStateHandler.walletConnect.set();
    await connectHavahWallet();
  };
  return (
    <ConnectWalletStyle>
      {refreshButton && (
        <div className="refresh">
          <RefreshButton isFetching={isFetching} onClick={_onClickRefresh} />
        </div>
      )}
      <div className="img">
        <Image
          src={'/assets/images/common_modal_img9.png'}
          alt="modal image"
          width="160"
          height="160"
          quality={100}
        />
      </div>
      <div className="text">
        No HAVAH Wallet connected.
        <br />
        Please connect your HAVAH Wallet.
      </div>

      <ButtonCustom onClick={_onClickButton}>
        <span>Connect HAVAH Wallet</span>
      </ButtonCustom>
    </ConnectWalletStyle>
  );
}

const ConnectWalletStyle = styled.div`
  .img {
    display: flex;
    justify-content: center;
    margin: 120px 0 40px 0;
  }
  .text {
    text-align: center;
    color: #929292;
    font-size: 18px;
    line-height: 160%;
    margin: 0 0 120px 0;
  }
`;
