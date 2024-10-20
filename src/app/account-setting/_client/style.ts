import COLOR from '@/constants/COLOR';
import styled from '@emotion/styled';

export const DisabledBoxStyle = styled.div`
  padding: 2px 16px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 60px;
  border-radius: 8px;
  background: ${COLOR['GRAY6__#E7E7E7']};
  color: ${COLOR['GRAY4__#B1B1B1']};
  font-size: 16px;
  font-weight: 700;
  line-height: 160%; /* 25.6px */
`;

export const ModalBodyVerificationStyle = styled.div`
  h2 {
    color: ${COLOR['BLACK__#000000']};
    text-align: center;
    font-size: 30px;
    font-weight: 700;
    line-height: 42px;
  }
  > .notification {
    margin: 8px 0 40px;
    color: ${COLOR['GRAY3__#929292']};
    font-size: 12px;
    font-weight: 400;
    line-height: 19px;
  }
  .show__error {
    margin-top: 12px;
    font-size: 14px;
    line-height: 22px;
    color: ${COLOR['ERROR__#EC1A26']};
  }
  .box {
    display: flex;
    padding: 16px;
    margin-bottom: 20px;
    flex-direction: column;
    align-items: center;
    border-radius: 12px;
    background: ${COLOR['GRAY7__#F1F1F1']};
    :last-of-type {
      margin-bottom: 40px;
    }
    h3 {
      height: 26px;
      display: flex;
      align-items: center;
      color: ${COLOR['BLACK__#000000']};
      text-align: center;
      margin-bottom: 12px;
      span {
        display: inline-block;
        padding-top: 3px;
        margin-left: 8px;
        font-size: 16px;
        font-weight: 500;
        line-height: 26px;
      }
    }

    :nth-of-type(1) {
      li,
      p {
        font-size: 12px;
        font-weight: 400;
        color: ${COLOR['GRAY3__#929292']};
        line-height: 20px;
        text-align: left;
        letter-spacing: -0.12px;
      }
      li {
        margin-left: 16px;
        padding-left: 2px;
      }

      p {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        svg {
          width: 16px;
          min-width: 16px;
          margin-right: 4px;
          height: 16px;
        }
        span {
          color: ${COLOR['GRAY2__#565656']};
          white-space: break-spaces;
        }
      }
      .address {
        display: flex;
        margin-top: 12px;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 26px;
        padding: 0px 10px;
        gap: 6px;
        color: ${COLOR['BLACK__#000000']};
        border-radius: 4px;
        background: ${COLOR['GRAY6__#E7E7E7']};
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        span {
          display: block;
          padding-top: 2px;
        }
        > div {
          width: 18px;
          height: 18px;
        }
        svg {
          cursor: pointer;
        }
      }

      button {
        margin-top: 16px;
      }
    }

    :nth-of-type(2) {
      div {
        height: 36px;
        display: flex;
        align-items: center;
        img {
          :hover {
            cursor: pointer;
          }
          :first-of-type {
            margin-right: 12px;
          }
        }
      }
    }

    :nth-of-type(3) {
      div {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
        img {
          max-width: 111px;
          max-height: 111px;
          margin: 0;
        }
        .explanation {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0px;
          color: ${COLOR['GRAY2__#565656']};
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px; /* 22.4px */
          p {
            text-align: left;
          }
        }
      }
      h4 {
        position: relative;
        display: block;
        height: 14px;
        margin: 16px 0 4px;
        color: ${COLOR['GRAY1__#272727']};
        text-align: center;
        /* padding-top: 2px; */
        font-size: 14px;
        font-weight: 500;
        line-height: 14px;
        :hover {
          cursor: pointer;
        }
        ::after {
          position: absolute;
          bottom: -2px;
          content: '';
          display: block;
          width: 100%;
          border-top: 1px solid ${COLOR['BLACK__#000000']};
        }
      }
      .code {
        display: flex;
        align-items: center;
        width: 100%;
        margin-top: 12px;
        padding: 17px 16px;
        border-radius: 8px;
        background: ${COLOR['GRAY6__#E7E7E7']};
        color: ${COLOR['GRAY4__#B1B1B1']};
        text-align: center;
        font-size: 16px;
        font-weight: 700;
        line-height: 21px;
        word-break: break-all;
      }
    }

    :nth-of-type(4) {
      p {
        color: ${COLOR['GRAY2__#565656']}; /* Body/Body-14R */
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        :first-of-type {
          text-align: left;
        }
      }
      .code__input {
        margin-top: 12px;
        display: flex;
        justify-content: center;
        gap: 8px;
      }
    }
  }
`;

export const ModalBodySuccessStyle = styled.div`
  p {
    margin: 0 auto;
    max-width: 450px;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    :last-of-type {
      color: ${COLOR['GRAY3__#929292']};
    }
  }
`;

export const ModalBodyVerifyingStyle = styled.div`
  h2 {
    color: ${COLOR['BLACK__#000000']};
    text-align: center;
    font-size: 24px;
    font-weight: 700;
    line-height: 34px;
  }
  p {
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    :last-of-type {
      color: ${COLOR['GRAY3__#929292']};
    }
  }
`;
export const ModalBodyConnectWalletStyle = styled.div`
  h2 {
    color: ${COLOR['BLACK__#000000']};
    text-align: center;
    font-size: 24px;
    font-weight: 700;
    line-height: 34px;
  }
  p {
    color: ${COLOR['GRAY2__#565656']};
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    :last-of-type {
      color: ${COLOR['ORANGE__#FF570E']};

      font-size: 14px;
      font-weight: 700;
      line-height: 22px;
    }
  }
`;
