import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

interface Props {
  children?: React.ReactNode;
}
export default function FullWhiteBackground({ children }: Props) {
  return (
    <FullWhiteBackgroundStyle>
      {children && <p className="show">{children}</p>}
    </FullWhiteBackgroundStyle>
  );
}

//animation 4초 후 보임
const show = keyframes`
  0% {
    opacity: 0;
  }
  99% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const FullWhiteBackgroundStyle = styled.div`
  position: fixed;
  top: -10vh;
  left: -10vw;
  width: 120vw;
  height: 120vh;
  background-color: white;
  z-index: 9999999;
  display: flex;
  justify-content: center;
  align-items: center;
  .show {
    width: 100vw;

    font-size: 16px;
    font-weight: 700;
    animation: ${show} 6s;
    padding: 20px;
  }
`;
