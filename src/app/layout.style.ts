'use client';
import COLOR from '@/constants/COLOR';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
export const LayoutStyle = styled.body`
  box-sizing: border-box;
  .body__contents {
    width: 100%;
    min-width: 360px;
    max-width: 768px;
    padding-top: 80px;
    background-color: ${COLOR['GRAY8__#FAFAFA']};
  }

  .width__error {
    position: fixed;
    z-index: 10000;
    padding: 20px;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: black;
    color: #fff;
    text-align: center;
    display: none;
  }
  @media (max-width: 320px) {
    .body__contents {
      display: none;
    }
    .width__error {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: left;
    }
  }
`;

export const NavStyle = styled.header`
  position: fixed;
  width: 100%;
  min-width: 360px;
  max-width: 768px;
  height: 80px;
  background: ${COLOR['ORANGE__#FF570E']};
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
  .hamburger__menu {
    flex: 1;

    .hamburger__button {
      width: 32px;
      height: 32px;
      padding: 5px 4px;
      :hover {
        cursor: pointer;
      }
    }
  }
  .minewarz__logo {
    width: 85px;
    height: 49.5px;
    :hover {
      cursor: pointer;
    }
  }
  .wallet__account {
    height: 36px;
    flex: 1;
    display: flex;
    justify-content: flex-end;
    gap: 16px;

    .wallet,
    .account {
      position: relative;
      :hover {
        cursor: pointer;
      }
    }

    .wallet.disconnect {
      svg {
        path {
          stroke: #822700;
        }
      }
    }
    .account.signOut {
      svg {
        path {
          stroke: #822700;
        }
      }
    }
  }
`;

export const spin = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  
`;
