import { stat } from 'fs';
import COLOR from '@/constants/COLOR';
import { cdnUrl } from '@/util/converter';
import styled from '@emotion/styled';

export const PioneerStatPageStyle = styled.div`
  padding: 0 16px 60px;
  background-color: #fafafa;

  h1 {
    margin-top: 60px;
    color: 000;
    text-align: center;
    font-size: 40px;
    font-style: normal;
    font-weight: 800;
    line-height: 56px;
  }

  ul.description {
    color: ${COLOR['GRAY3__#929292']};
    font-size: 14px;
    font-weight: 400;
    line-height: 160%;
    padding: 0;
    margin: 20px 0;
    li {
      list-style: none;
      position: relative;
      padding-left: 16px;
      display: flex;
      align-items: start;
      &::before {
        content: '';
        display: inline-block;
        width: 4px;
        height: 4px;
        background: #929292;
        border-radius: 100%;
        margin-right: 8px;
        display: inline-block;
        position: absolute;
        top: 7px;
        left: 0;
      }
    }
  }

  .alarm {
    color: ${COLOR['GRAY3__#929292']};
    font-size: 12px;
    font-weight: 400;
    text-align: left;
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    &::before {
      content: '';
      display: inline-block;
      width: 2px;
      height: 2px;
      border-radius: 50%;
      background-color: ${COLOR['GRAY3__#929292']};
      margin-right: 10px;
      margin-left: 8px;
    }
  }

  .list_box {
    border-radius: 12px;
    background-color: ${COLOR['WHITE__#FFFFFF']};
    box-shadow: 0px 7px 15px 0px rgba(0, 0, 0, 0.04);
    padding: 24px 16px;
    margin-bottom: 20px;
    h2 {
      color: ${COLOR['BLACK__#000000']};
      text-align: center;
      font-size: 24px;
      line-height: 140%; /* 33.6px */
    }
  }
  .banner {
    img {
      width: 105px;
      height: 141px;
      min-width: 105px;
      margin-right: 22px;
    }
  }
  .list_pro {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    margin: 20px 0;
    .loading {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.1);
      z-index: 1;
      div {
        position: absolute;
        top: 50px;
        left: 50%;
        transform: translate(-50%, 0%);
        width: 110px;
        height: 150px;
        text-align: center;
      }
      img {
        width: 110px;
        height: auto;
        opacity: 1;
      }
      span {
        margin-top: 0px !important;
        line-height: 1.2 !important;
      }
    }
  }
  .pfp_list {
    & > li {
      list-style: none;
      border-radius: 24px;
      background-color: ${COLOR['WHITE__#FFFFFF']};
      padding: 16px;
      margin-top: 12px;
      &:first-of-type {
        margin-top: 0;
      }
      p {
        font-size: 16px;
        font-weight: 400;
        line-height: 160%;
        color: ${COLOR['BLACK__#000000']};
        margin-bottom: 10px;
        span {
          font-size: 14px;
          color: ${COLOR['GRAY3__#929292']};
        }
      }
      .pfp {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
        div {
          width: 132px;
          height: 132px;
          border-radius: 12px;
          margin-right: 12px;
          flex-shrink: 0;
          overflow: hidden;
          background-color: ${COLOR['GRAY7__#F1F1F1']};
          background-image: url(${cdnUrl('/assets/images/dummy_nft.png')});
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          video {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        ul {
          flex-grow: 1;
          li {
            display: flex;
            list-style: none;
            margin-bottom: 4px;
            border-radius: 4px;
            background-color: ${COLOR['GRAY7__#F1F1F1']};
            padding: 5px 24px;
            justify-content: space-between;
            span {
              font-size: 12px;
              font-weight: 400;
              line-height: 160%;
              color: ${COLOR['BLACK__#000000']};
              &.stat {
                color: ${COLOR['GRAY2__#565656']};
              }
              i {
                color: ${COLOR['GRAY3__#929292']};
                font-style: normal;
              }
              strong {
                font-weight: 400;
                color: ${COLOR['ORANGE__#FF570E']};
              }
            }
          }
        }
      }
      button {
        border-radius: 8px;
        background: ${COLOR['ORANGE__#FF570E']};
        color: ${COLOR['WHITE__#FFFFFF']};
        font-size: 16px;
        font-weight: 400;
        line-height: 160%;
        width: 100%;
        height: 60px;
        text-transform: none;
        svg {
          margin-left: 8px;
          margin-right: 4px;
          vertical-align: middle;
          position: relative;
          top: -3px;
        }
        &:disabled {
          color: ${COLOR['GRAY4__#B1B1B1']};
          background: ${COLOR['GRAY6__#E7E7E7']};
        }
        &.disabled {
          svg {
            opacity: 0.4;
          }
        }
      }
    }
    .banner {
      img {
        width: 114px;
        height: 150px;
      }
    }
  }
  @media (max-width: 480px) {
    .pfp_list {
      li {
        & > p {
          text-align: center;
          span {
            display: block;
          }
        }
      }
      .pfp {
        flex-direction: column;
        ul {
          width: 100%;
          margin-top: 12px;
        }
      }
    }
  }
`;

export const ModalStatPageStyle = styled.div`
  font-size: 60px;
  .desc {
    color: ${COLOR['GRAY2__#565656']};
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    line-height: 160%;
    p {
      color: ${COLOR['BLACK__#000000']};
      font-size: 16px;
      font-weight: 500;
    }
  }
`;
