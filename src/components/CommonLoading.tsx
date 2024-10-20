'use client';
import { Modal } from '@mui/material';
import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';

interface IProps {
  open?: boolean;
  hideBackdrop?: boolean;
}
export default function CommonLoading(props: IProps) {
  const { open = true, hideBackdrop } = props;
  return (
    <Modal open={open} hideBackdrop={hideBackdrop}>
      <CommonModalStyle>
        <div className="inner__container">
          <h2>Loading...</h2>
          <Image
            src="/assets/images/loading_papa.png"
            alt=""
            width={160}
            height={160}
          />
        </div>
      </CommonModalStyle>
    </Modal>
  );
}

const CommonModalStyle = styled.div`
  padding: 0 16px;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .inner__container {
    width: 100vw;
    height: 298px;
    max-width: 748px;
    background-color: #ffffff;
    padding: 40px 16px 40px 16px;
    border-radius: 24px;
    h2 {
      font-weight: 700;
      font-size: 24px;
      line-height: 34px;
      text-align: center;
    }
    img {
      margin: 24px auto;
    }
  }
`;
