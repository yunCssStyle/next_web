import { defaultModalStyle } from '@/components/modal/modal.style';
import COLOR from '@/constants/COLOR';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

// export const TradingPostCovertAssetModalStyle = styled(defaultModalStyle)`
export const TradingPostCovertAssetModalStyle = styled.div`
  /* background-color: ${COLOR['GRAY8__#FAFAFA']}; */
  /* background-color: pink; */
  color: ${COLOR['BLACK__#000000']};
  text-align: center;
  font-family: 'Inter', sans-serif;
  .title {
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%; /* 42px */
  }

  .token__box {
    position: relative;
    text-align: left;
    padding: 16px 16px 20px 16px;
    gap: 12px;
    border-radius: 24px;
    background: ${COLOR['WHITE__#FFFFFF']};
    box-shadow: 0px 7px 15px 0px rgba(0, 0, 0, 0.04);
    h5 {
      height: 22px;
      padding-top: 1px;
      margin-bottom: 12px;
      color: ${COLOR['GRAY4__#B1B1B1']};
      font-size: 14px;
      font-weight: 500;
      line-height: 22px; /* 22.4px */
    }
    > .amount {
      display: flex;
      margin-top: 16px;
      align-items: center;
      border-radius: 8px;
      justify-content: flex-end;
      height: 60px;
      padding: 0 16px;
      span {
        display: block;
        height: 34px;
        padding-top: 3px;
        color: ${COLOR['BLACK__#000000']};
        font-size: 24px;
        font-weight: 500;
        line-height: 140%; /* 33.6px */
      }
    }
    &.from {
      .dropdown__button {
        display: flex;
        align-items: center;
        /* justify-content: space-between; */
        :hover {
          cursor: pointer;
        }
        .arrow {
          margin-left: 8px;
          width: 24px;
          height: 24px;
          transform: rotate(180deg);
          &.open {
            transform: rotate(0deg);
          }
        }
      }

      > .amount {
        width: 100%;
        outline: none;
        border: none;
        background-color: ${COLOR['GRAY7__#F1F1F1']};
        text-align: right;
        color: ${COLOR['BLACK__#000000']};
        font-size: 24px;
        font-weight: 500;
        line-height: 140%; /* 33.6px */
        :focus {
          outline: none;
        }
      }
      .all__available {
        height: 24px;
        margin-top: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .all {
          display: flex;
          width: fit-content;
          height: 24px;
          justify-content: center;
          align-items: center;
          border-radius: 20px;
          border: 1px solid ${COLOR['GRAY5__#D2D2D2']};
          color: ${COLOR['GRAY2__#565656']};
          font-size: 12px;
          min-width: 38px;
          text-transform: capitalize;
          :hover {
            cursor: pointer;
          }
          span {
            color: ${COLOR['GRAY2__#565656']};
            padding-top: 2px;
            font-size: 12px;
            font-weight: 400;
            line-height: 160%; /* 19.2px */
            letter-spacing: -0.12px;
          }
        }
        .available {
          span {
            color: ${COLOR['GRAY3__#929292']};
            font-size: 12px;
            font-weight: 400;
            line-height: 160%; /* 19.2px */
            letter-spacing: -0.12px;
          }
        }
      }
    }
    &.to {
      margin-top: 16px;
    }
    .dropdown {
      position: absolute;
      top: 91px;
      left: 0;
      width: 100%;
      height: 0px;
      overflow: hidden;
      border-radius: 0 0 24px 24px;
      background-color: ${COLOR['WHITE__#FFFFFF']};
      box-shadow: 10px 7px 15px 0px rgba(0, 0, 0, 0.04);
      z-index: 100;
      transition: 0.2s;
      .menu {
        padding: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 60px;
        transition: 0.1s;
        .amount {
          margin-left: 16px;
          /* display: flex;
          flex-direction: column;
          align-items: flex-end; */
          color: ${COLOR['GRAY1__#272727']};
          font-size: 16px;
          font-weight: 400;
          line-height: 26px;
          text-align: right;
          .error {
            color: ${COLOR['ERROR__#EC1A26']};
          }
        }
        &.selected {
          background-color: ${COLOR['GRAY8__#FAFAFA']};
          .amount {
            font-weight: 700;
          }
        }
        &:first-of-type {
          border-top: 1px solid ${COLOR['GRAY7__#F1F1F1']};
        }
        :hover {
          cursor: pointer;
          background-color: #fff3ee;
        }
      }
      &.open {
        height: fit-content;
        /* height: 120px; */
      }
    }
  }
  .arrow__down {
    position: relative;
    height: 0px;
    margin-top: -25px;
    margin-bottom: 41px;
    z-index: 10;
  }
  .fee__box {
    margin-top: 24px;
    padding: 16px;
    border-radius: 12px;
    background: ${COLOR['GRAY6__#E7E7E7']};
    > div {
      display: flex;
      justify-content: space-between;
      height: 26px;
      span {
        padding-top: 3px;
        color: ${COLOR['GRAY3__#929292']};
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        strong {
          color: ${COLOR['BLACK__#000000']};
          font-size: 16px;
          font-weight: 500;
        }
      }
      &.minimum {
        margin-bottom: 6px;
        &.not__enough {
          span,
          strong {
            color: ${COLOR['ERROR__#EC1A26']};
          }
        }
      }
    }
  }
  .notification {
    display: flex;
    margin-top: 8px;
    align-items: flex-start;
    height: 24px;
    svg {
      min-width: 24px;
    }
    span {
      margin-left: 4px;
      padding-top: 2px;
      color: ${COLOR['GRAY3__#929292']};
      text-align: left;
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
    }
  }
  .button {
    width: 100%;
    margin-top: 40px;
    .error {
      color: ${COLOR['ERROR__#EC1A26']};
      font-size: 14px;
      font-weight: 400;
      line-height: 160%;
      margin-bottom: 17px;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        padding-top: 2px;
        height: 22px;
        margin-left: 4px;
      }
    }
  }
`;

export const TokenComponentStyle = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  height: 26px;
  /* width: 100px; */
  .type {
    display: block;
    height: 26px;
    padding-top: 2px;
    margin-left: 8px;
    color: ${COLOR['BLACK__#000000']};
    font-size: 16px;
    font-weight: 500;
    line-height: 160%; /* 25.6px */
  }
  .selected {
    display: none;
    margin-left: 8px;
    width: 24px;
    height: 24px;
  }

  ${({ selected }) => {
    if (selected) {
      return css`
        .type {
          font-weight: 700;
        }
        .selected {
          display: block;
        }
      `;
    }
  }}
`;

export const TradingPostMailValidModalStyle = styled.div`
  h2 {
    color: ${COLOR['BLACK__#000000']};
    text-align: center;
    font-size: 30px;
    font-weight: 700;
    line-height: 42px;
  }
  .notification {
    margin-top: 40px;
    color: ${COLOR['BLACK__#000000']};
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 160%; /* 25.6px */
  }
  .code__input {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    gap: 8px;
  }
  .send__code {
    position: relative;
    margin: 24px auto 0;
    height: 22px;
    outline: none;
    background: none;
    border: none;
    border-bottom: 1px solid ${COLOR['BLACK__#000000']};
    color: ${COLOR['BLACK__#000000']};
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    line-height: 160%; /* 22.4px */
    display: flex;

    :hover {
      cursor: pointer;
    }
    :disabled {
      cursor: default;
      color: ${COLOR['GRAY4__#B1B1B1']};
      border-color: ${COLOR['GRAY4__#B1B1B1']};
    }
  }
  .information__list {
    margin-top: 40px;
    padding: 16px;
    border-radius: 12px;
    background: ${COLOR['GRAY7__#F1F1F1']};
    .information {
      margin-top: 4px;
      color: ${COLOR['GRAY2__#565656']};
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      text-align: left;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      /* height: 22px; */
      .dot {
        width: 4px;
        min-width: 4px;
        height: 4px;
        min-height: 4px;
        border-radius: 50%;
        background-color: ${COLOR['GRAY2__#565656']};
        margin: 9px 8px 0 0;
      }
      p {
        padding-top: 2px;
        strong {
          word-break: break-all;
        }
      }
      &:first-of-type {
        margin-top: 0;
      }
    }
  }
  .button {
    margin-top: 40px;
    .error {
      height: 22px;
      color: ${COLOR['ERROR__#EC1A26']};
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      margin: 1px 0 17px;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        padding-top: 2px;
        height: 22px;
        margin-left: 4px;
      }
    }
  }
  .close {
    width: 50px;
    height: 50px;
    margin: auto;
    text-align: center;
    transform: translateY(-50%);
    :hover {
      cursor: pointer;
    }
  }
`;
