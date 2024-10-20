import React from 'react';
import Image from 'next/image';
import { Modal } from '@mui/material';
import styled from '@emotion/styled';
import COLOR from '@/constants/COLOR';
import CommonModal from './CommonModal';
interface LoadingConvertingModalProps {
  title?: string;
  comment?: string;
  subComment?: string;
}

//legacy Modal LoadingModal로 대체가능
export default function LoadingConvertingModal(
  props: LoadingConvertingModalProps
) {
  const { title, comment, subComment } = props;

  return (
    <CommonModal isOpen title={title} hideBackdrop>
      <LoadingConvertingModalStyle>
        <Image
          src="/assets/images/loading_papa.png"
          alt="loading"
          width={160}
          height={160}
        />
        <p>{comment}</p>
        <p>{subComment}</p>
      </LoadingConvertingModalStyle>
    </CommonModal>
  );
}

const LoadingConvertingModalStyle = styled.div`
  img {
    margin: 4px auto 14px;
  }
  p {
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    line-height: 140%;
    color: ${COLOR['BLACK__#000000']};
    :first-of-type {
    }
    :last-of-type {
      color: ${COLOR['GRAY2__#565656']};
      font-size: 14px;
      font-weight: 400;
      line-height: 160%;
    }
  }
`;
