import COLOR from '@/constants/COLOR';
import { cdnUrl } from '@/util/converter';
import styled from '@emotion/styled';

const agreeCheckedImageUrl = cdnUrl('/assets/images/agree_checked.png');
const disagreeCheckedImageUrl = cdnUrl('/assets/images/disagree_checked.png');
const abstainCheckedImageUrl = cdnUrl('/assets/images/abstain_checked.png');

export const DetailPageStyle = styled.div`
  padding: 24px 16px 60px;
  background-color: ${COLOR['GRAY8__#FAFAFA']};
  position: relative;
  min-height: 80vh;
  .loading_detail {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    z-index: 20;
    justify-content: center;
    background: rgba(255, 255, 255, 0.8);
  }
  .back {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    width: 40px;
    height: 40px;
    background: ${COLOR['NAVY__#353A50']};
    cursor: pointer;
  }
  h1 {
    color: ${COLOR['BLACK__#000000']};
    font-size: 40px;
    font-style: normal;
    font-weight: 800;
    line-height: 1.2;
    margin: 20px 0 10px;
    .title {
      margin-left: 10px;
      word-break: break-all;
      span {
        border-radius: 4px;
        display: inline-block;
        padding: 0px 6px;
        font-size: 12px;
        height: 22px;
        line-height: 24px;
        vertical-align: middle;
        position: relative;
        font-weight: 400;
        top: -2px;
        margin-left: 8px;
        &.upcoming {
          background: ${COLOR['YELLOW__#FFE400']};
          color: ${COLOR['GRAY1__#272727']};
        }
        &.active {
          background: ${COLOR['ORANGE__#FF570E']};
          color: ${COLOR['WHITE__#FFFFFF']};
        }
        &.passed {
          background: rgba(22, 199, 29, 0.1);
          color: ${COLOR['TRUE__#16C71D']};
        }
        &.failed {
          background: rgba(236, 26, 38, 0.1);
          color: ${COLOR['ERROR__#EC1A26']};
        }
        &.executed {
          background: ${COLOR['GRAY7__#F1F1F1']};
          color: ${COLOR['GRAY4__#B1B1B1']};
        }
      }
    }
  }
  .info_data {
    padding: 16px;
    border-radius: 12px;
    background: ${COLOR['GRAY7__#F1F1F1']};
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    dl {
      display: flex;
      flex-direction: row;
      justify-content: start;
      align-items: center;
      margin-bottom: 8px;
      &:last-child {
        margin-bottom: 0;
      }
      dt {
        flex-shrink: 0;
        width: 100px;
        color: ${COLOR['GRAY3__#929292']};
        font-size: 14px;
        line-height: 1.2;
      }
      dd {
        flex-grow: 1;
        color: ${COLOR['GRAY2__#565656']};
        font-size: 16px;
        line-height: 1.2;
      }
    }
  }

  .description {
    color: ${COLOR['BLACK__#000000']};
    font-size: 16px;
    font-weight: 400;
    line-height: 160%;
    word-wrap: break-word;
    &.overflow {
      max-height: 260px;
      overflow: hidden;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 90px;
        background-image: url(${cdnUrl('/assets/images/gra.png')});
        background-repeat: repeat-x;
        background-position: center;
        background-size: cover;
        /* background: linear-gradient(
          to top,
          ${COLOR['GRAY8__#FAFAFA']},
          transparent
        ); */
      }
    }
    &.show {
      max-height: none;
      overflow: visible;
      &::after {
        display: none;
      }
    }
  }

  .show_more {
    color: ${COLOR['ORANGE__#FF570E']};
    font-size: 14px;
    font-weight: 700;
    line-height: 160%;
    margin: 0 0 22px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 24px;
    height: 24px;
    svg {
      /* position: relative;
      top: -2px; */
    }

    &.show {
      svg {
        transform: rotate(180deg);
      }
    }
  }

  .votes {
    border-radius: 24px;
    background: ${COLOR['WHITE__#FFFFFF']};
    padding: 32px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    h2 {
      color: ${COLOR['BLACK__#000000']};
      text-align: center;
      font-size: 24px;
      font-weight: 700;
    }
    .votes_item {
      margin: 36px 0 52px;
      width: 296px;
      li {
        margin-bottom: 16px;
        list-style: none;
        &:last-child {
          margin-bottom: 0;
        }
        label {
          display: flex;
          justify-content: space-between;
          border-radius: 6px;
          border: 1px solid #d2d2d2;
          position: relative;
          padding: 7px 8px;
          overflow: hidden;
          cursor: pointer;
          align-items: center;
          input {
            position: absolute;
            top: 0;
            left: -5000px;
            opacity: 0;
            overflow: hidden;
            width: 0;
            height: 0;
          }
          .voteOptionId {
            position: absolute;
            top: 0;
            left: -5000px;
            opacity: 0;
            overflow: hidden;
            width: 0;
            height: 0;
          }
          .bg {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            z-index: 1;
            border-radius: 6px;
            opacity: 0.2;
            border: 1px solid #fff;
          }
          .label {
            position: relative;
            z-index: 2;
            color: ${COLOR['GRAY1__#272727']};
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: start;
            &::before {
              content: '';
              width: 24px;
              height: 24px;
              border-radius: 50%;
              border: 1px solid #d2d2d2;
              background-color: #fafafa;
              opacity: 0.55;
              margin-right: 8px;
              background-position: center;
              background-size: cover;
            }
          }
          .percent {
            position: relative;
            z-index: 2;
            color: ${COLOR['GRAY3__#929292']};
            font-size: 14px;
          }
          &.agree {
            .bg {
              background: ${COLOR['TRUE__#16C71D']};
              border-color: ${COLOR['TRUE__#16C71D']};
            }
            input:checked + .label {
              border-color: ${COLOR['TRUE__#16C71D']};
              &::before {
                background-image: url(${agreeCheckedImageUrl});
                background-color: ${COLOR['TRUE__#16C71D']};
                border-color: ${COLOR['TRUE__#16C71D']};
                opacity: 1;
              }
            }
          }
          &.disagree {
            .bg {
              background: ${COLOR['ERROR__#EC1A26']};
              border-color: ${COLOR['ERROR__#EC1A26']};
            }
            input:checked + .label {
              border-color: ${COLOR['ERROR__#EC1A26']};
              &::before {
                background-image: url(${disagreeCheckedImageUrl});
                background-color: ${COLOR['ERROR__#EC1A26']};
                border-color: ${COLOR['ERROR__#EC1A26']};
                opacity: 1;
              }
            }
          }
          &.abstain {
            .bg {
              background: ${COLOR['GRAY5__#D2D2D2']};
              border-color: ${COLOR['GRAY5__#D2D2D2']};
            }
            input:checked + .label {
              border-color: ${COLOR['GRAY3__#929292']};
              &::before {
                background-image: url(${abstainCheckedImageUrl});
                background-color: ${COLOR['GRAY3__#929292']};
                border-color: ${COLOR['GRAY3__#929292']};
                opacity: 1;
              }
            }
          }
        }
      }
      &.action0 {
        li {
          &:nth-of-type(1) {
            opacity: 1;
            label {
              border-color: ${COLOR['TRUE__#16C71D']};
            }
          }
          opacity: 0.5;
        }
      }
      &.action1 {
        li {
          &:nth-of-type(2) {
            opacity: 1;
            label {
              border-color: ${COLOR['ERROR__#EC1A26']};
            }
          }
          opacity: 0.5;
        }
      }
      &.action2 {
        li {
          &:nth-of-type(3) {
            opacity: 1;
            label {
              border-color: ${COLOR['GRAY3__#929292']};
            }
          }
          opacity: 0.5;
        }
      }
      &.myaction0 {
        li {
          &:nth-of-type(1) {
            opacity: 1;
            label {
              border-color: ${COLOR['TRUE__#16C71D']};
            }
          }
        }
      }
      &.myaction1 {
        li {
          &:nth-of-type(2) {
            opacity: 1;
            label {
              border-color: ${COLOR['ERROR__#EC1A26']};
            }
          }
        }
      }
      &.myaction2 {
        li {
          &:nth-of-type(3) {
            opacity: 1;
            label {
              border-color: ${COLOR['GRAY3__#929292']};
            }
          }
        }
      }
    }
  }
  .sticky_btns {
    position: sticky;
    bottom: 50%;
    left: 100%;
    z-index: 10;
    height: 0px;
    > div {
      position: absolute;
      bottom: 0;
      right: 0;
      min-width: 106px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      .total {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 8px;
        background: var(--Point-Navy, #353a50);
        padding: 3px 8px;
        margin-bottom: 12px;
        position: relative;
        span {
          font-size: 12px;
          color: var(--White, #ffffff);
          display: flex;
          line-height: 1;
          b {
            font-weight: 600;
            margin-right: 4px;
          }
        }
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 50%) rotate(45deg);
          width: 6px;
          height: 6px;
          background: var(--Point-Navy, #353a50);
        }
      }
      .img {
        border-radius: 12px;
        border: 1px solid var(--Point-Navy, #353a50);
        background: var(--Gray-Scale-White, #fff);
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.16);
        position: relative;
        width: 84px;
        padding: 4px 0 61px;
        cursor: pointer;
        span {
          color: var(--Point-Navy, #353a50);
          text-align: center;
          font-size: 12px;
          font-weight: 500;
          line-height: 1.2;
          display: block;
        }
        img {
          position: absolute;
          bottom: 0px;
          left: 50%;
          width: 104px;
          max-width: 104px;
          transform: translate(-50%, 0%);
        }
      }
    }
  }
`;
