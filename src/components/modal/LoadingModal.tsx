import React from 'react';
import CommonModal from './CommonModal';
import styled from '@emotion/styled';
import Image from 'next/image';
import COLOR from '@/constants/COLOR';

interface Props {
  isOpen: boolean;
  title: string;
  description: string;
  subDescription: string;
  hideBackdrop?: boolean;
}
export default function LoadingModal(props: Props) {
  const { isOpen, title, description, subDescription, hideBackdrop } = props;
  return (
    <CommonModal
      isOpen={isOpen}
      padding="40px 16px"
      hideBackdrop={hideBackdrop}
    >
      <LoadingModalStyle>
        <h2>{title}</h2>
        <Image
          width={160}
          height={160}
          src="/assets/images/loading_papa.png"
          alt="loading..."
        />
        <p>{description}</p>
        <p>{subDescription}</p>
      </LoadingModalStyle>
    </CommonModal>
  );
}

const LoadingModalStyle = styled.div`
  color: ${COLOR['BLACK__#000000']};
  text-align: center;
  h2 {
    font-size: 24px;
    font-weight: 700;
    line-height: 34px;
  }
  img {
    margin: 24px auto;
  }
  p {
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    line-height: 26px;
    :last-of-type {
      color: ${COLOR['GRAY2__#565656']};
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
    }
  }
`;
