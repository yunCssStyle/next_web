import COLOR from '@/constants/COLOR';
import { cdnUrl } from '@/util/converter';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

// Nav style
export const NavStyle = styled.header`
  position: fixed;
  top: 0;
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

      &.connect {
        transform: translate(-2px, 1px);
      }
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
  }
`;

// Footer style

export const FooterStyle = styled.footer`
  width: 100%;
  min-height: 258px;
  background-color: #fff;
  padding: 33px 16px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  /*  */
  .policy__contact {
    margin-top: 25px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
    color: ${COLOR['GRAY1__#272727']};
    a {
      margin-left: 30px;
      color: ${COLOR['GRAY1__#272727']};
      :first-of-type {
        margin-left: 0;
      }
    }
  }
  /*  */
  .copyright {
    margin-top: 25px;
    color: #4f4f4f;
    text-align: center;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    padding: 0 25px;
    letter-spacing: -0.12px;
  }
  /*  */
  .social__box {
    margin-top: 25px;
    width: 240px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > a {
      width: 32px;
      height: 32px;
    }
    .twitter {
      background-image: url(${cdnUrl('/assets/images/icon_sns.png')});
      /* background-position: -42px 0; */
      background-size: cover;
      background-repeat: no-repeat;
    }
    .gitbook {
      background-image: url(${cdnUrl('/assets/images/icon_sns.png')});
      background-position: -73px 0;
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
`;

export const MailToBoxStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  color: ${COLOR['GRAY1__#272727']};
  .div {
    margin: 0 8px;
    width: 1px;
    height: 9px;
    background-color: #d8d8d8;
  }
`;

interface TooltipProps {
  isOpen: boolean;
}
const TooltipStyle = styled.div<TooltipProps>`
  position: absolute;
  top: 72px;
  right: 10px;
  width: 294px;
  border-radius: 16px;
  padding: 16px;
  background-color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  transition: 0.1s;
  z-index: 10;
  :focus {
    outline: none;
  }

  ${({ isOpen }) => {
    if (isOpen === false) {
      return css`
        opacity: 0;
        pointer-events: none;
      `;
    }
  }}
`;

// Wallet style
export const TooltipWalletStyle = styled(TooltipStyle)`
  width: 340px;
  /* height: 176px; */
  /*  */
  .tail {
    position: absolute;
    top: -9px;
    right: 68px;
  }
  /*  */
  .token__box {
    border-radius: 8px;
    background: #000;
    padding: 20px 16px;
    color: #fff;
    height: 100%;
    /*  */
    .name__signout {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 26px;
      .name {
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px;
        text-transform: capitalize;
        padding-top: 2px;
      }
      .signout {
        width: 24px;
        height: 24px;
        svg {
          fill: #fff;
        }
        :hover {
          cursor: pointer;
        }
      }
    }
    /*  */
    .mzt {
      position: relative;

      margin-top: 8px;
      display: flex;
      align-items: flex-start;
      .symbol {
        margin-left: -4px;
        width: 32px;
        height: 24px;
        margin-right: 4px;
        svg {
          transform: scale(0.75) translateY(-4px);
        }
      }
      .balance {
        width: 100%;
        max-width: 208px;
        font-family: 'Inter', sans-serif;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 28px;
        word-break: break-all;
        .int {
        }
        .dec {
          color: #929292;
        }
      }
      .unit {
        position: absolute;
        right: 0;
        bottom: 2px;
        height: 100%;
        display: flex;
        align-items: flex-end;
        padding-top: 4px;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        color: ${COLOR['YELLOW__#FFE400']};
        span {
          line-height: 22px;
        }
      }
    }
    .address__box {
      margin-top: 8px;
      border-radius: 8px;
      background: #272727;
      height: 36px;
      padding: 0 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .address {
        flex-grow: 1;
        text-align: center;
        margin-top: 4px;
        color: #929292;
        font-family: 'Inter', sans-serif;
        font-size: 16px;
        font-weight: 400;
      }
      .copy {
        width: 24px;
        height: 24px;
        transition: 0.1s;
        :hover {
          cursor: pointer;
        }
        :active {
          filter: brightness(0.8);
        }
      }
    }
  }
  //!--- 여기 작업
  /*  */
  ${({ isOpen }) => {
    if (isOpen === false) {
      return css`
        opacity: 0;
        pointer-events: none;
      `;
    }
  }}
`;
/*  */

// Account style
export const TooltipAccountStyle = styled(TooltipStyle)`
  width: 340px;
  .tail {
    position: absolute;
    top: -9px;
    right: 15px;
  }
  /*  */
  .gold__box {
    background-color: ${COLOR['YELLOW__#FFE400']};
    color: #000;
    padding: 20px 16px;
    border-radius: 8px;
    .nickname {
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 22px;
    }

    .gold {
      position: relative;
      margin-top: 8px;
      display: flex;
      align-items: flex-start;
      svg {
        min-width: 24px;
        margin-right: 8px;
      }
      .amount {
        width: 100%;
        max-width: 208px;
        word-break: break-all;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: 28px;
        .decimal {
          color: #b2a400;
        }
      }
      .unit {
        position: absolute;
        right: 0;
        bottom: 2px;
        display: flex;
        align-items: flex-end;
        height: 100%;
        font-size: 14px;
        font-weight: 500;
        line-height: 22px;
      }
    }
  }
  /*  */
  .menu {
    margin-top: 16px;
    height: 94px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    button {
      display: flex;
      align-items: center;
      background: none;
      border: none;
      span {
        margin-left: 4px;
        font-family: 'Inter', sans-serif;
        font-size: 16px;
        color: #929292;
        font-style: normal;
        font-weight: 400;
        line-height: 160%;
      }
      :hover {
        cursor: pointer;
      }
    }
  }
`;

// hamburger menu style
export const HamburgerMenuStyle = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;

  .container {
    min-width: 360px;
    /* 드물에 외곽 세로선에 바깥 여백이 보이는경우가있어 max-width +1px */
    max-width: 769px;
    width: 100vw;
    padding: 30px 16px 50px;
    background-color: ${COLOR['ORANGE__#FF570E']};
    border-radius: 0px 0px 24px 24px;
    overflow-y: auto;
    ul.menu {
      padding: 20px 0;
      max-height: calc(100vh - 240px);
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #fff;
      li {
        margin-top: 32px;
        list-style: none;
        height: 34px;
        font-family: 'Inter', sans-serif;
        font-size: 24px;
        font-style: normal;
        font-weight: 500;
        line-height: 34px;
        text-transform: capitalize;
        :first-of-type {
          margin-top: 0;
        }
        :hover {
          cursor: pointer;
        }
        svg {
          margin-left: 4px;
          transform: translateY(2px);
          width: 24px;
          height: 24px;
        }
      }
    }
    .button {
      position: absolute;
      bottom: 12px;
      width: 304px;
      height: 60px;
      border-radius: 8px;
      background: ${COLOR['YELLOW__#FFE400']};
      color: #000;
      font-family: 'Inter', sans-serif;
      font-size: 15px;
      font-style: normal;
      font-weight: 400;
      line-height: 140%;
    }
  }

  .sns__container {
    width: 100%;
    .line {
      width: 100%;
      height: 1px;
      background-color: #fff;
      opacity: 0.3;
      margin: 30px 0;
    }
    .sns__icons {
      width: 188px;
      height: 32px;
      display: flex;
      justify-content: space-between;
      margin: 0 auto;
    }
  }
  .close__button {
    position: absolute;
    bottom: -35px;
    left: 50%;
    transform: translateX(-50%);
    :hover {
      cursor: pointer;
    }
  }
`;
