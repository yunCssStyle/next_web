'use client';
import React from 'react';
import ButtonCustom from '../ButtonCustom';
import Image from 'next/image';
import COLOR from '@/constants/COLOR';
import ModalLayout from './ModalLayout';
import styled from '@emotion/styled';

interface CommonModalProps {
  title?: string;
  children: React.ReactNode;
  imageName?: imageNameType; //img size 160x160 only
  buttonText?: string;
  onClickButton?: () => void;
  isOpen: boolean;
  onClose?: () => void;
  padding?: string;
  bgColor?: string;
  hideBackdrop?: boolean;
}

/**
 *
 * @param title? : string
 * @param children : React.ReactNode
 * @param imageName? : imageNameType
 * @param buttonText? : string
 * @param onClickButton? : () => void (default: onClose)
 * @param isOpen : boolean
 * @param onClose? : () => void (onClose => close button)
 * @param padding? : string
 * @param bgColor? : string
 * @returns
 */
export default function CommonModal({
  title,
  children,
  imageName,
  buttonText = 'OK',
  onClickButton,
  isOpen,
  onClose,
  padding,
  bgColor,
  hideBackdrop
}: CommonModalProps) {
  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      padding={padding}
      bgColor={bgColor}
      hideBackdrop={hideBackdrop}
    >
      <CommonModalStyle>
        {title && <div className="common_title">{title}</div>}
        <div className="description">{children}</div>
        {imageName && (
          <Image
            src={`/assets/images/commonModal/${imageName}.png`}
            alt=""
            width={160}
            height={160}
          />
        )}

        {onClickButton && (
          <ButtonCustom onClick={onClickButton || onClose}>
            {buttonText}
          </ButtonCustom>
        )}
      </CommonModalStyle>
    </ModalLayout>
  );
}

const CommonModalStyle = styled.div`
  width: 100%;

  .common_title {
    text-align: center;
    font-size: 24px;
    font-weight: 700;
    line-height: 34px;
    margin-bottom: 8px;
  }
  .description {
    color: ${COLOR['GRAY2__#565656']};
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    span {
      white-space: nowrap;
    }
  }
  img {
    margin: 40px auto;
  }
`;

type imageNameType =
  | 'friends_bundle'
  | 'jjack_prison'
  | 'jjack_wallet_hi'
  | 'jjack_wallet'
  | 'kiki_fail_wallet'
  | 'kiki_fail'
  | 'kiki_packed'
  | 'kiki_speaker'
  | 'papa_success'
  | 'papa_viewing_map';
