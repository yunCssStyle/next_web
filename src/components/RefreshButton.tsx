import { spin } from '@/app/layout.style';
import COLOR from '@/constants/COLOR';
import { SVG } from '@/svg';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

interface IRefreshButton {
  className?: string;
  isFetching?: boolean;
  onClick?: () => void;
  onlyIcon?: boolean;
}
export default function RefreshButton(props: IRefreshButton) {
  const [isRotate, setIsRotate] = useState(false);
  const { className, isFetching = false, onClick, onlyIcon = false } = props;

  useEffect(() => {
    if (isFetching) {
      setIsRotate(true);
      const timeout = setTimeout(() => {
        setIsRotate(false);
        clearTimeout(timeout);
      }, 1000);
    }
  }, [isFetching]);

  const _onClick = () => {
    if (!isFetching && !isRotate) {
      onClick && onClick();
    }
  };

  return (
    <RefreshButtonStyle
      className={className}
      isFetching={isFetching || isRotate}
      onlyIcon={onlyIcon}
      onClick={_onClick}
    >
      <SVG.ICON.REFRESH />
      <span>Refresh</span>
    </RefreshButtonStyle>
  );
}

const RefreshButtonStyle = styled.div<{
  isFetching: boolean;
  onlyIcon: boolean;
}>`
  display: flex;
  min-width: 132px;
  width: 132px;
  height: 48px;
  min-height: 48px;
  padding: 0px 24px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 1px solid ${COLOR['GRAY5__#D2D2D2']};
  background: ${COLOR['GRAY8__#FAFAFA']};
  :hover {
    cursor: pointer;
  }
  span {
    margin-left: 4px;
    padding-top: 3px;
    color: ${COLOR['BLACK__#000000']};
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 500;
    line-height: 18px;
  }

  ${({ onlyIcon }) => {
    if (onlyIcon) {
      return css`
        min-width: 24px;
        min-height: 24px;
        width: 24px;
        height: 24px;
        padding: 0px;
        border: none;
        background: none;
        span {
          display: none;
        }
      `;
    }
  }}

  ${({ isFetching }) => {
    if (isFetching) {
      return css`
        svg {
          animation: ${spin} 1s linear infinite;
        }
      `;
    }
  }}
`;
