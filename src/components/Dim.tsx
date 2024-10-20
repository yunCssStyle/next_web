'use client';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

interface IProps {
  marginTop?: number;
  onClick?: () => void;
}
export default function Dim(Props: IProps) {
  const { onClick } = Props;
  return <DimStyle {...Props} onClick={onClick} />;
}

const animation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const DimStyle = styled.div<IProps>`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  animation: ${animation} 0.1s ease-in-out;
  ${({ marginTop }) => {
    if (marginTop !== undefined) {
      return css`
        top: ${marginTop}px;
      `;
    }
  }}
`;
