import React, { use, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Button, Modal } from '@mui/material';
import { SVG } from '@/svg';
import COLOR from '@/constants/COLOR';
import { set } from 'lodash';
import { LINK } from '@/constants/link';
import Axios from '@/axios/axios';
import QUERY_CUSTOM from '@/query';
import Image from 'next/image';

export default function AnnouncementModal() {
  const [isShow, setIsShow] = useState(false);
  const _onClickClose = () => {
    setIsShow(false);
  };

  const { serverTime } = QUERY_CUSTOM.SERVER_TIME();

  const _onClickButton = () => {
    window.open(LINK.SHOP_MINING_RIGHT, '_blank');
  };

  useEffect(() => {
    const targetDate = Date.UTC(2024, 0, 8, 0); // 2024년 1월 7일 24:00 UTC

    if (serverTime < targetDate) {
      setIsShow(true);
    }
  }, [serverTime]);

  if (!isShow) return null;
  return (
    <Modal open={true}>
      <AnnouncementModalStyle>
        <div className="modal">
          <div className="inner__container">
            <Image
              src="/assets/images/banner_miningright_nft.png"
              width={724}
              height={320}
              alt="banner"
            />
            <Button onClick={_onClickButton}>Boost Your Mining Power!</Button>
          </div>
        </div>
        <div className="close" onClick={_onClickClose}>
          <SVG.ICON.CLOSE />
        </div>
      </AnnouncementModalStyle>
    </Modal>
  );
}

const AnnouncementModalStyle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 40px 10px 60px;
  width: 100%;
  height: fit-content;
  min-width: 360px;
  max-width: 768px;
  .modal {
    background-color: #fff;
    border-radius: 24px;
    padding: 16px 16px 50px;
    .inner__container {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: flex-end;
      border-radius: 24px;
      height: 100vh;
      max-height: 320px;
      overflow: hidden;
      img {
        width: 100%;
        position: absolute;
        object-fit: cover;
      }
      button {
        margin-bottom: 12px;
        width: 304px;
        height: 60px;
        color: ${COLOR['BLACK__#000000']};
        background-color: ${COLOR['YELLOW__#FFE400']};
        font-size: 15px;
        font-weight: 500;
        line-height: 18px;
      }
    }
  }
  .close {
    width: 50px;
    height: 50px;
    margin: 0 auto;
    transform: translateY(-50%);
    :hover {
      cursor: pointer;
    }
  }
  :focus {
    outline: none;
  }
`;
