import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { SVG } from '@/svg';
import { LINK } from '@/constants/link';
import Axios from '@/axios/axios';
import QUERY_CUSTOM from '@/query';

export default function MiningRightOnSale() {
  const [isShow, setIsShow] = useState(false);
  const { serverTime } = QUERY_CUSTOM.SERVER_TIME();

  useEffect(() => {
    const targetDate = Date.UTC(2024, 0, 8, 0); // 2024년 1월 7일 24:00 UTC

    if (serverTime < targetDate) {
      setIsShow(true);
    }
  }, [serverTime]);

  const _onClick = () => {
    window.open(LINK.SHOP_MINING_RIGHT, '_blank');
  };
  const _onClose = () => {
    setIsShow(false);
  };

  if (!isShow) return null;
  return (
    <DivStyle>
      <Image
        onClick={_onClick}
        src={'/assets/images/mining_right_on_sale.png'}
        width={127}
        height={155}
        alt="sale"
      />
      <button onClick={_onClose}>
        <SVG.ICON.CLOSE2 />
      </button>
    </DivStyle>
  );
}

const DivStyle = styled.div`
  position: relative;
  display: inline-block;
  img {
    transition: 0.1s;
    :hover {
      cursor: pointer;
      scale: 1.05;
    }
    :active {
      scale: 0.95;
    }
  }
  button {
    width: 24px;
    height: 24px;
    position: absolute;
    bottom: -3px;
    right: 22px;
    border: none;
    outline: none;
    background-color: transparent;
    :hover {
      cursor: pointer;
    }
  }
`;
