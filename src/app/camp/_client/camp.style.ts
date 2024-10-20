import COLOR from '@/constants/COLOR';
import { cdnUrl } from '@/util/converter';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { LoadingType } from '../../../components/Loading';

export const BannerStyle = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 184px;
  min-width: 328px;
  max-width: 736px;
  align-items: center;
  border-radius: 24px;
  background: #f1f1f1;
  display: flex;
  align-items: center;
  .content {
    padding: 16px 0 16px 24px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .text {
      width: 100%;
      color: #000;
      font-size: 16px;
      font-weight: 400;
      line-height: 160%;
      span {
        :nth-of-type(2) {
          white-space: nowrap;
        }
      }
    }
    button {
      margin-top: 12px;
      display: flex;
      height: 36px;
      padding: 0px 20px;
      justify-content: center;
      align-items: center;
      border-radius: 18px;
      background: var(--gray-scale-black, #000);
      color: var(--gray-scale-white, #fff);
      text-align: center;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      font-weight: 400;
      text-transform: none;
      line-height: 100%;
      outline: none;
      border: none;
      :hover {
        cursor: pointer;
      }
    }
  }
  img {
    width: 150px;
    min-width: 150px;
    height: 184px;
    margin-left: 18px;
  }
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const TotalAndFilterStyle = styled.div<{
  isOpen: boolean;
  itemCount: number;
}>`
  width: 100%;
  .total__filter {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /*  */
    .total {
      height: 26px;
      /*  */
      color: #000;
      text-align: center;
      font-family: 'Inter', sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 160%;
      display: flex;
      align-items: center;
      span {
        padding-top: 2px;
        &.count {
          margin-left: 6px;
          margin-right: 12px;
          font-weight: 700;
        }
      }
    }

    /*  */
    .filter {
      height: 48px;
      border-radius: 8px;
      border: 1px solid ${COLOR['GRAY5__#D2D2D2']};
      background: ${COLOR['GRAY8__#FAFAFA']};
      color: ${COLOR['GRAY2__#565656']};
      font-family: 'Inter', sans-serif;
      text-transform: capitalize;
      padding: 0 24px;
      svg {
        transition: 0.3s;
        fill: ${COLOR['GRAY2__#565656']};
      }
      span {
        display: block;
        padding-top: 2px;
        margin-left: 4px;
      }
    }
  }

  .open__filter {
    margin-top: 0px;
    padding: 24px;
    width: 100%;
    height: 0px;
    border-radius: 12px;
    border: 0px solid ${COLOR['WHITE__#FFFFFF']};
    background: ${COLOR['GRAY8__#FAFAFA']};
    padding: 0;
    opacity: 0;
    overflow: hidden;
    transition: 0.3s;
    .inner__container {
      margin: 24px;
      .title {
        height: 26px;
        padding-top: 4px;
        color: ${COLOR['BLACK__#000000']};
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
      }
      .division__line {
        margin: 16px 0;
        width: 100%;
        height: 1px;
        background-color: ${COLOR['GRAY5__#D2D2D2']};
      }
      .item {
        margin-bottom: 16px;
        height: 26px;
        display: flex;
        margin: 0 -8px 16px;
        padding: 0 8px;
        border-radius: 4px;
        align-items: center;
        justify-content: space-between;

        > span {
          padding-top: 2px;
        }
        &:last-of-type {
          margin-bottom: 0;
        }
        :hover {
          cursor: pointer;
          box-shadow: 0px 0px 16px 5px rgba(0, 0, 0, 0.03);
        }
      }
    }
  }

  ${({ isOpen, itemCount }) =>
    isOpen &&
    css`
      .total__filter {
        .filter {
          svg {
            fill: ${COLOR['WHITE__#FFFFFF']};
          }
          border-color: ${COLOR['BLACK__#000000']};
          background-color: ${COLOR['BLACK__#000000']};
          color: ${COLOR['WHITE__#FFFFFF']};
        }
      }
      .open__filter {
        margin-top: 16px;
        border: 1px solid ${COLOR['GRAY5__#D2D2D2']};
        opacity: 1;
        height: calc(91px + (${itemCount} * 42px));
      }
    `}
`;

export const PioneerViewerStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .list__container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 12px;
    width: 100%;
    .box {
      margin-top: 12px;
      :first-of-type {
        margin-top: 0;
      }
    }
    .sticky__button {
      position: sticky;
      bottom: 100px;
      margin-top: -60px;
      margin-right: -16px;
      padding-bottom: 60px;
      display: flex;
      justify-content: flex-end;
      height: 60px;
      width: 106px;
      border-radius: 30px;
    }
  }
  .total__and__filter {
    margin-top: 20px;
  }
  .pagination {
    margin: 0 auto;
    margin-top: 20px;
  }
`;

export const PioneerBoxStyle = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 88px;
  font-family: 'Inter', sans-serif;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px 12px;
  background: ${COLOR['WHITE__#FFFFFF']};
  box-shadow: 0px 7px 15px 0px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  .img__container {
    max-width: 88px;
    max-height: 88px;
    min-width: 88px;
    min-height: 88px;
    background-image: url(${cdnUrl('/assets/images/dummy_nft.png')});
    background-color: ${COLOR['GRAY7__#F1F1F1']};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    video {
      height: 100px;
    }
  }
  .content {
    width: 100%;
    padding: 12px;
    .name {
      font-size: 16px;
      font-weight: 400;
      line-height: 160%;
    }
    .tokenId {
      height: 26px;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;
      color: ${COLOR['GRAY2__#565656']};
      display: flex;
      align-items: center;
      span {
        display: block;
        height: 24px;
        &:first-of-type {
          padding-top: 1px;
        }
        svg {
          margin-left: 8px;
          fill: ${COLOR['GRAY4__#B1B1B1']};
          width: 24px;
          height: 24px;
        }
      }
    }
  }
  .label {
    position: absolute;
    top: 0;
    right: 0;
    width: 88px;
    height: 22px;
    border-radius: 0 0 0 12px;
    background: ${COLOR['ORANGE__#FF570E']};
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      margin-left: 3px;
      padding-top: 2px;
      color: ${COLOR['WHITE__#FFFFFF']};
      font-family: 'Inter', sans-serif;
      font-size: 12px;
      font-weight: 500;
      line-height: 160%;
      letter-spacing: -0.12px;
    }
  }

  :hover {
    cursor: pointer;
  }
`;

export const EquippedPioneerStyle = styled.div`
  width: 100%;
  height: 404px;
  padding: 32px 16px;
  border-radius: 12px;
  border: 2px solid #ff570e;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Box_drop shadow */
  box-shadow: 0px 7px 15px 0px rgba(0, 0, 0, 0.04);
  margin-top: 40px;
  .img__box {
    position: relative;
    width: 264px;
    height: 264px;
    background-color: ${COLOR['GRAY6__#E7E7E7']};
    background-image: url(${cdnUrl('/assets/images/dummy_nft.png')});
    background-size: cover;
    border-radius: 12px;
    overflow: hidden;
    .label {
      position: absolute;
      top: 0;
      right: 0;
      width: 70px;
      height: 52px;
      border-radius: 0 0 0 12px;
      background: ${COLOR['ORANGE__#FF570E']};
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      svg {
        width: 28px;
        height: 22px;
      }

      span {
        color: ${COLOR['WHITE__#FFFFFF']};
        font-family: 'Inter', sans-serif;
        font-size: 12px;
        font-weight: 500;
        letter-spacing: -0.12px;
        line-height: 19px;
      }
    }
  }
  .name__id {
    margin-top: 16px;
    height: 56px;
    text-align: center;
    font-family: 'Inter', sans-serif;
    font-size: 20px;
    line-height: 140%;
    font-weight: 500;
    .collection__name {
      color: #000;
    }
    .token__id {
      color: ${COLOR['GRAY2__#565656']};
      font-family: 'Inter', sans-serif;
    }
  }
  :hover {
    cursor: pointer;
  }
`;

export const AddButtonStyle = styled.div`
  position: relative;
  width: 106px;
  height: 120px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;

  .click__area {
    position: absolute;
    top: 0;
    right: 16px;
    padding: 0;
    border-radius: 30px;
    width: 60px;
    min-width: 60px;
    height: 60px;
    color: ${COLOR['WHITE__#FFFFFF']};
    :hover {
      cursor: pointer;
    }
  }
`;

export const MiningRightViewerStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .list__container {
    margin-top: 12px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .box {
      margin-top: 12px;
      :first-of-type {
        margin-top: 0;
      }
    }
    .sticky__button {
      position: sticky;
      bottom: 100px;
      margin-top: -60px;
      margin-right: -16px;
      padding-bottom: 60px;
      display: flex;
      justify-content: flex-end;
      height: 60px;
      width: 106px;
      border-radius: 30px;
    }
  }
  .total__and__filter {
    margin-top: 20px;
  }
  .pagination {
    margin: 0 auto;
    margin-top: 20px;
  }
`;

export const MiningRightBoxStyle = styled.div<{ isActive?: boolean }>`
  position: relative;
  width: 100%;
  height: 88px;
  background-color: ${COLOR['WHITE__#FFFFFF']};
  box-shadow: 0px 7px 15px 0px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  border-radius: 12px;
  display: flex;
  .img__box {
    min-width: 88px;
    min-height: 88px;
    background-color: red;
    background-image: url(${cdnUrl('/assets/images/dummy_nft.png')});
    background-size: cover;
  }
  .info {
    padding: 10px 12px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    .name {
      color: ${COLOR['BLACK__#000000']};
      font-family: 'Inter', sans-serif;
      font-size: 16px;
      font-weight: 400;
      line-height: 160%; /* 25.6px */
    }
    .token__id {
      display: flex;
      align-items: center;
      height: 26px;
      span {
        padding-top: 2px;
        color: ${COLOR['GRAY2__#565656']};
        text-align: center;
        font-family: 'Inter', sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 160%; /* 25.6px */
      }
      .shortcut {
        margin-left: 6.5px;
        width: 24px;
        height: 24px;
        fill: ${COLOR['GRAY4__#B1B1B1']};
        :hover {
          cursor: pointer;
        }
      }
    }

    &.disabled {
      .name {
        color: ${COLOR['GRAY3__#929292']};
      }
      .token__id {
        span {
          color: ${COLOR['GRAY3__#929292']};
        }
      }
    }
  }
  .label {
    position: absolute;
    top: 0;
    right: 0;
    width: 71px;
    height: 22px;
    border-radius: 0px 12px;
    background: ${COLOR['ORANGE__#FF570E']};
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      margin-left: 3px;
      padding-top: 2px;
      color: ${COLOR['WHITE__#FFFFFF']};
      font-family: 'Inter', sans-serif;
      font-size: 12px;
      font-weight: 500;
      line-height: 160%;
      letter-spacing: -0.12px;
    }
    ${({ isActive }) => {
      if (isActive === false)
        return css`
          background-color: ${COLOR['GRAY6__#E7E7E7']};
          span {
            color: ${COLOR['GRAY2__#565656']};
            letter-spacing: -0.12px;
          }
        `;
    }}
  }
  :hover {
    cursor: pointer;
  }
`;

export const CampLoadingStyle = styled.div<LoadingType>`
  margin: ${({ marginTopAndBottom }) =>
    marginTopAndBottom ? `${marginTopAndBottom}px 0` : '120px 0'};
  width: 100%;
  max-width: 768px;
  min-height: 210px;

  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    margin: 0;
  }
  > span {
    display: block;
    margin-top: 24px;
    color: ${COLOR['GRAY3__#929292']};
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    line-height: 160%; /* 28.8px */
  }
`;

export const MarketAndAddButtonsStyle = styled.div`
  margin-top: 40px;

  display: flex;
  button {
    min-width: 156px;
    width: 100%;
    height: 60px;
    text-transform: none !important;
    border-radius: 8px;
    outline: none;
    border: 1px solid ${COLOR['ORANGE__#FF570E']};
    background-color: transparent;
    font-style: normal;
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-weight: 500;
    line-height: 120%;
    text-transform: capitalize;

    &.go {
      color: ${COLOR['ORANGE__#FF570E']};
    }
    &.add {
      color: ${COLOR['WHITE__#FFFFFF']};
      background-color: ${COLOR['ORANGE__#FF570E']};
      margin-left: 16px;
    }
  }
`;
