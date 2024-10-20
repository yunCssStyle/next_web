import COLOR from '@/constants/COLOR';
import { cdnUrl } from '@/util/converter';
import { css } from '@emotion/react';
import styled, { StyledComponent } from '@emotion/styled';
import { EmptyListProps } from '../EmptyList';

export const defaultModalStyle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 10px 80px;
  width: 100%;
  height: fit-content;
  min-width: 360px;
  max-width: 768px;
`;

const SelectModalStyle = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 40px 10px 120px;
  width: 100%;
  min-width: 360px;
  max-width: 768px;

  .modal {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 16px 50px;
    width: 100%;
    max-height: calc(100vh - 120px);
    min-height: 160px;
    background-color: ${COLOR['GRAY8__#FAFAFA']};
    border-radius: 24px;
    overflow-y: auto;

    h2 {
    }
    /*  */
    .available__nfts {
      display: flex;
      align-items: center;
      margin-top: 20px;
      width: 100%;
      height: 26px;
      span {
        padding-top: 3px;
        color: ${COLOR['BLACK__#000000']};
        font-family: 'Inter', sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;
        &:nth-of-type(2) {
          margin-left: 6px;
          margin-right: 12px;
          font-weight: 700;
        }
      }
    }
    /*  */
    .list {
      margin-top: 16px;
      width: 100%;
      min-height: 120px;
      height: 100%;
      overflow-y: auto;

      .item {
        position: relative;
        width: 100%;
        border: none;
        background: none;
        margin-top: 16px;
        display: flex;
        align-items: center;
        transition: 0.1s;
        .check__box {
          margin-right: 12px;
        }
        &:first-of-type {
          margin-top: 0;
        }
        :hover {
          cursor: pointer;
          box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
        }
        &.disabled {
          ::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: calc(100% - 36px);
            height: 100%;
            background-color: ${COLOR['GRAY4__#B1B1B1']};
            opacity: 0.4;
            border-radius: 12px;
            z-index: 10;
          }
        }
      }
    }

    /*  */
    .selected {
      margin-top: 20px;
      width: 100%;
      span {
        color: ${COLOR['BLACK__#000000']};
        text-align: center;
        font-family: 'Inter', sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 160%; /* 25.6px */
        &:nth-of-type(2) {
          margin-left: 6px;
          font-weight: 700;
          color: ${COLOR['ORANGE__#FF570E']};
        }
      }
    }
    /*  */
    .add__button {
      width: 100%;
      margin-top: 16px;
    }
    .close__button {
      width: 100%;
      margin-top: 40px;
    }
  }
  /*  */
  .close {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 50px;
    bottom: 95px;
    :hover {
      cursor: pointer;
    }
  }
  .pagination {
    margin-top: 20px;
  }
`;

export const PioneerSelectModalStyle = styled(SelectModalStyle)`
  .add__button {
    position: relative;
    .collection__button {
      position: absolute;
      bottom: 80px;
      right: 0;
      z-index: 10;
    }
  }
`;

export const MiningRightSelectModalStyle = styled(SelectModalStyle)`
  .modal {
    /*  */
    .notification {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      margin-top: 12px;
      span {
        display: block;
        padding-top: 1px;
        margin-right: 4px;
        color: ${COLOR['GRAY3__#929292']};
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 22px;
        letter-spacing: 1.1px;
        white-space: nowrap;
      }
      .question {
        position: relative;
        width: 24px;
        height: 24px;
        .tooltip {
          .tooltip__triangle {
            position: absolute;
            bottom: -11px;
            width: 24px;
            height: 11px;
            display: flex;
            justify-content: center;
            align-items: center;
            svg {
              width: 22px;
            }
          }
        }
      }
    }
  }
`;

export const MiningRightSelectModalTooltipStyle = styled.div`
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 16px;
  width: calc(100vw - 52px);
  min-width: 308px;
  max-width: 718px;
  background-color: ${COLOR['GRAY1__#272727']};
  border-radius: 8px;
  z-index: 10;
  .tooltip__notification {
    width: 100%;
    margin-top: 6px;
    display: flex;
    align-items: flex-start;
    .dot {
      max-width: 4px;
      max-height: 4px;
      min-width: 4px;
      min-height: 4px;
      margin: 8px;
      border-radius: 50%;
      background-color: ${COLOR['WHITE__#FFFFFF']};
    }

    p {
      margin-left: 4px;
      color: ${COLOR['WHITE__#FFFFFF']};
      font-family: 'Inter', sans-serif;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px;
      text-align: justify;
    }
    :first-of-type {
      margin-top: 0;
    }
  }
`;

export const EmptyListStyle = styled.div<EmptyListProps>`
  height: 100%;
  margin: ${({ type }) =>
    type === 'addSelectModal' || type === 'voteDetailModal'
      ? '80px 0'
      : '120px 0'};

  min-height: 210px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  > span {
    margin-top: 24px;
    display: block;
    color: ${COLOR['GRAY3__#929292']};
    text-align: center;
    font-family: 'Inter', sans-serif;
    font-size: 18px;
    font-weight: 400;
    line-height: 29px;
  }
  p {
    max-width: 405px;
    text-align: center;
    color: ${COLOR['GRAY3__#929292']};
    text-align: center;
    font-family: 'Inter', sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%;
    span {
      white-space: nowrap;
    }
  }
`;

export const CheckCollectionButtonStyle = styled.div<{ isShow: boolean }>`
  position: relative;
  width: 82px;
  height: 95px;
  border-radius: 12px;
  border: 1px solid #353a50;
  background: ${COLOR['WHITE__#FFFFFF']};
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.16);
  padding: 12px;
  color: #353a50;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 110%;
  .button {
    display: flex;
    flex-direction: column;
    align-items: center;
    svg {
      margin-bottom: 5px;
    }
  }
  .close_mini {
    width: 24px;
    height: 24px;
    position: absolute;
    top: -10px;
    right: -10px;
  }

  :hover {
    cursor: pointer;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.3);
  }

  ${({ isShow }) => {
    if (isShow === false) {
      return css`
        display: none;
      `;
    }
  }}
`;

const campInfoModalStyle = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 10px 70px;
  width: 100%;
  min-width: 360px;
  max-width: 768px;
  .modal {
    height: calc(100vh - 140px);
    overflow-y: auto;
    border-radius: 24px;
    padding: 40px 16px 50px;
    background-color: ${COLOR['GRAY8__#FAFAFA']};
    .inner__container {
      padding: 0 24px;
      .img {
        position: relative;
        width: 172px;
        height: 172px;
        margin: 0 auto;
        border-radius: 12px;
        overflow: hidden;
      }
      .name {
        margin-top: 16px;
        text-align: center;
        font-size: 20px;
        font-weight: 500;
        line-height: 140%;
      }
    }

    .convert__button {
      margin-top: 40px;
    }
  }
  .close {
    margin: 0 auto;
    width: 50px;
    height: 50px;
    transform: translateY(-50%);
    :hover {
      cursor: pointer;
    }
  }
`;

export const MiningRightInfoModalStyle = styled(campInfoModalStyle)`
  .modal {
    max-height: 485px;
    .inner__container {
      .img {
        background-image: url(${cdnUrl('/assets/images/dummy_nft.png')});
        background-size: cover;
        .label {
          position: absolute;
          top: 0px;
          right: 0px;
          color: ${COLOR['GRAY2__#565656']};
          font-size: 12px;
          font-style: normal;
          font-weight: 500;
          line-height: 160%; /* 19.2px */
          letter-spacing: -0.12px;
          display: inline-flex;
          height: 22px;
          padding: 0px 8px;
          justify-content: center;
          align-items: center;
          gap: 3px;
          border-radius: 0px 12px;
          background: ${COLOR['GRAY6__#E7E7E7']};
        }
      }
      .status {
        height: 30px;
        margin-top: 24px;
        padding: 0 24px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: ${COLOR['GRAY7__#F1F1F1']};
        span {
          padding-top: 4px;
          color: ${COLOR['GRAY2__#565656']};
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 160%; /* 19.2px */
          letter-spacing: -0.12px;
        }
      }
    }
    .convert__button {
      button {
        padding: 0 16px;
      }
    }
  }
`;

export const LoadingConvertingModalStyle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 40px 10px 80px;
  width: 100%;
  max-height: 550px;
  height: 100%;
  width: 100%;
  min-width: 360px;
  max-width: 768px;

  .modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100vh - 120px);
    max-height: 430px;
    border-radius: 24px;
    padding: 40px 16px;
    background-color: ${COLOR['WHITE__#FFFFFF']};
    color: ${COLOR['BLACK__#000000']};
    overflow-y: auto;
    font-weight: 400;
    p {
      text-align: center;
      &.text {
        text-align: center;
        font-size: 24px;
        font-weight: 700;
        line-height: 140%;
      }
      &.notification {
        color: ${COLOR['GRAY2__#565656']};
        font-size: 14px;
        font-weight: 400;
        line-height: 160%;
      }
    }
    > img {
      margin: 24px 0;
    }
    > span {
      margin-bottom: 4px;
      font-size: 16px;
      font-weight: 500;
      line-height: 160%;
    }
  }
`;

interface CommonModalStyleProps {
  maxHeight?: string;
}
export const CommonModalLegacyStyle: StyledComponent<
  'div',
  any,
  CommonModalStyleProps
> = styled.div<CommonModalStyleProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 40px 10px 60px;
  width: 100%;
  height: fit-content;
  min-width: 360px;
  max-width: 768px;
  outline: none;
  .modal {
    background-color: #fff;
    border-radius: 24px;
    padding: 40px 16px 50px;
    .inner__container {
      width: 100%;
      height: calc(100vh - 190px);
      max-height: 460px;
      max-height: ${(props) => props.maxHeight || '460px'};
      min-height: 120px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      overflow-y: auto;
      .title {
        color: ${COLOR['BLACK__#000000']};
        text-align: center;
        font-size: 24px;
        font-weight: 700;
        line-height: 140%;
      }
      .description {
        color: ${COLOR['GRAY2__#565656']};
        text-align: center;
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;
        margin-top: 8px;
        &:last-of-type {
          margin-top: 0px;
        }
        .notification {
          font-size: 14px;
          color: ${COLOR['GRAY3__#929292']};
        }
        .link {
          display: inline-flex;
          color: ${COLOR['ORANGE__#FF570E']};
          font-weight: 600;
          line-height: 24px;
          svg {
            width: 24px;
            height: 24px;
            transform: translateY(-2px);
          }
          :hover {
            cursor: pointer;
          }
        }
      }
      > img {
        margin: 40px 0;
      }
      .blocked__until {
        span {
          font-size: 14px;
          color: #ec1a26;
        }
      }
    }
  }
  .close {
    width: 50px;
    height: 50px;
    margin: 0 auto;
    transform: translateY(-50%);
    :hover {
      cursor: pointer;
    }
  }
`;

interface InputBlockStyleProps {
  isInputValue: boolean;
}
export const InputBlockStyle = styled.input<InputBlockStyleProps>`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  border: 1px solid ${COLOR['BLACK__#000000']};
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  line-height: 140%; /* 33.6px */
  :focus {
    outline: none;
  }
  :disabled {
    background-color: ${COLOR['GRAY6__#E7E7E7']};
    border: none;
  }
`;

export const ModalLayoutStyle = styled.div<{
  bgColor?: string;
  padding?: string;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 40px 10px 50px;
  width: 100%;
  height: fit-content;
  min-width: 360px;
  max-width: 768px;
  .modal {
    background-color: ${({ bgColor }) => bgColor || COLOR['WHITE__#FFFFFF']};
    border-radius: 24px;
    padding: ${({ padding }) => padding || '40px 0 50px'};
    .title {
      color: ${COLOR['BLACK__#000000']};
      text-align: center;
      font-size: 24px;
      font-weight: 700;
      line-height: 140%;
      margin-bottom: 40px;
    }
    .inner__container {
      width: calc(100%);
      padding: 0 16px;
      max-height: calc(100vh - 250px);
      min-height: 120px;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow-y: auto;
    }
  }
  .close {
    width: 50px;
    height: 50px;
    margin: 0 auto;
    transform: translateY(-50%);
    :hover {
      cursor: pointer;
    }
  }
`;

export const TimerStyle = styled.span`
  display: block;
  text-align: center;
  width: 18px;
`;

export const PioneerInfoModalStyle = styled(campInfoModalStyle)<{
  noneStat: boolean;
}>`
  .modal {
    max-height: 462px;
    .inner__container {
      .img__container {
        margin: 0 auto;
        width: 172px;
        height: 172px;
        border-radius: 12px;
        background-color: ${COLOR['GRAY7__#F1F1F1']};
        background-image: url(${cdnUrl('/assets/images/dummy_nft.png')});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        video {
          height: 172px;
        }
      }
      .name {
        padding-bottom: 20px;
      }
      .stat {
        margin-top: 4px;
        height: 30px;
        padding: 0 24px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: ${COLOR['GRAY7__#F1F1F1']};
        span {
          padding-top: 4px;
          color: ${COLOR['GRAY2__#565656']};
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px;
          :last-of-type {
            color: ${COLOR['GRAY3__#929292']};
            span {
              :first-of-type {
                color: ${COLOR['BLACK__#000000']};
              }
              :last-of-type {
                color: ${COLOR['ORANGE__#FF570E']};
              }
            }
          }
        }
      }
      .stat__notification {
        margin-top: 40px;
        color: ${COLOR['GRAY2__#565656']};
        text-align: center;
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;
      }
    }
  }

  ${({ noneStat }) =>
    noneStat &&
    css`
      .modal {
        max-height: 528px;
        .inner__container {
          .stat {
            span {
              :last-of-type {
                color: ${COLOR['GRAY4__#B1B1B1']};
              }
            }
          }
        }
      }
    `}
`;
