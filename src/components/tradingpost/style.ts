import COLOR from '@/constants/COLOR';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export const RefreshStyle = styled.div<{ isLoading: boolean }>`
  width: 134px;
  height: 48px;
  display: flex;
  height: 48px;
  padding: 0px 24px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 1px solid ${COLOR['GRAY5__#D2D2D2']};
  background: ${COLOR['GRAY8__#FAFAFA']};
  > svg {
    min-width: 24px;
    height: 24px;
  }
  span {
    width: 56px;
    padding-top: 2px;
    margin-left: 4px;
    color: ${COLOR['BLACK__#000000']};
  }
  :hover {
    cursor: pointer;
  }

  ${({ isLoading }) =>
    isLoading &&
    css`
      svg {
        animation: ${rotate} 1s linear infinite;
      }
    `}
`;

//rotate animation keyframes
const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(359deg);
    }
`;

export const TokenBoxStyle = styled.div<{ disabled?: boolean }>`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  min-width: 328px;
  height: 130px;
  padding: 24px;
  border-radius: 24px;
  background: ${COLOR['WHITE__#FFFFFF']};
  box-shadow: 0px 7px 15px 0px rgba(0, 0, 0, 0.04);
  .symbol {
    height: 32px;
    display: flex;
    align-items: center;
    .icon {
      width: 32px;
      height: 32px;
      svg {
        width: 32px;
        height: 32px;
      }
    }
    .text {
      margin-left: 8px;
      padding-top: 4px;
      color: ${COLOR['BLACK__#000000']};
      font-size: 18px;
      font-weight: 700;
      line-height: 160%; /* 28.8px */
    }
  }
  .amount {
    margin-top: 16px;
    padding-top: 3px;
    height: 34px;
    color: ${COLOR['BLACK__#000000']};
    text-align: right;
    font-size: 24px;
    font-weight: 500;
    line-height: 140%; /* 33.6px */
  }

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: ${COLOR['GRAY6__#E7E7E7']};
      .symbol {
        .text {
          color: ${COLOR['GRAY4__#B1B1B1']};
        }
      }
      .amount {
        color: ${COLOR['GRAY4__#B1B1B1']};
        font-size: 18px;
        font-weight: 400;
        line-height: 160%; /* 28.8px */
      }
    `}
`;

export const SwapPlatformsStyle = styled.div`
  margin-top: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  h5 {
    color: ${COLOR['GRAY4__#B1B1B1']};
    text-align: center;
    text-transform: capitalize;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
  }
  button {
    margin-top: 12px;
    display: flex;
    width: 100%;
    height: 80px;
    text-transform: none !important;
    min-width: 328px;
    max-width: 736px;
    padding: 0 24px;
    justify-content: space-between;
    align-items: center;
    border-radius: 12px;
    background: ${COLOR['WHITE__#FFFFFF']};
    color: ${COLOR['GRAY5__#D2D2D2']};
    box-shadow: 0px 7px 15px 0px rgba(0, 0, 0, 0.04);
    .info__box {
      display: flex;
      align-items: flex-start;
      .name__comments {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }

      .name,
      .comments {
        display: block;
        margin-left: 8px;
      }

      .name {
        color: ${COLOR['BLACK__#000000']};
        font-size: 18px;
        font-weight: 700;
        text-align: left;
        line-height: 29px;
        padding-top: 3px;
      }
      .comments {
        color: ${COLOR['GRAY2__#565656']};
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        padding-top: 7px;
        white-space: nowrap;
      }
    }
    :first-of-type {
      margin-top: 8px;
    }
    :hover {
      cursor: pointer;
      box-shadow: 0px 7px 15px 0px rgba(0, 0, 0, 0.08);
    }
  }
  .notification {
    .dot {
      margin: 0 8px 3px;
      display: inline-block;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: ${COLOR['GRAY4__#B1B1B1']};
    }
    margin-top: 12px;
    color: ${COLOR['GRAY4__#B1B1B1']};
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
  }

  @media (max-width: 412px) {
    button {
      .info__box {
        .name__comments {
          display: block;
        }
      }
    }
  }
`;
