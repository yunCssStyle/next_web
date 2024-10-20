import COLOR from '@/constants/COLOR';
import { cdnUrl } from '@/util/converter';
import { css, keyframes } from '@emotion/react';
import styled, { StyledComponent } from '@emotion/styled';
import { LoadingType } from '../Loading';

export const GovernanceLsitStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  cursor: pointer;
  &:hover {
    background: #fafafa;
  }
  &.line {
    border-top: 1px solid ${COLOR['GRAY7__#F1F1F1']};
  }
  .info {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    width: 100%;
    & > div {
      flex-grow: 1;
      display: flex;
      justify-content: start;
      align-items: center;
      .index {
        color: ${COLOR['GRAY3__#929292']};
        font-size: 12px;
      }
      .title {
        margin-left: 8px;
        color: ${COLOR['BLACK__#000000']};
        font-size: 16px;
        line-height: 140%;
        word-break: break-all;
      }
    }
    .label {
      flex-shrink: 0;
      text-align: right;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
      padding: 0 6px;
      height: 22px;
      line-height: 22px;
      margin-left: 26px;
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
  .governance_data {
    color: ${COLOR['GRAY3__#929292']};
    font-size: 12px;
    font-weight: 400;
    letter-spacing: -0.12px;
    display: flex;
    justify-content: flex-start;
    width: 100%;
  }
`;

export const TurnoutDataStyle = styled.div`
  position: relative;
  width: 100%;
  &.detail {
    padding-bottom: 16px;
    width: 296px;
    .chart {
      margin: 4px 0 16px;
      height: 10px;
      span {
        height: 10px;
      }
    }
  }
  .voted {
    color: ${COLOR['GRAY3__#929292']};
    font-size: 12px;
    text-align: right;
    display: block;
  }
  .chart {
    height: 8px;
    background: ${COLOR['GRAY7__#F1F1F1']};
    border-radius: 6px;
    width: 100%;
    margin: 8px 0 16px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    span {
      height: 8px;
    }
    .agree {
      background: ${COLOR['TRUE__#16C71D']};
    }
    .disagree {
      background: ${COLOR['ERROR__#EC1A26']};
    }
    .abstain {
      background: ${COLOR['GRAY5__#D2D2D2']};
    }
  }
  .quorum {
    color: ${COLOR['GRAY3__#929292']};
    font-size: 10px;
    display: inline-block;
    padding: 0 8px;
    border-radius: 4px;
    background: ${COLOR['GRAY7__#F1F1F1']};
    height: 20px;
    line-height: 20px;
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translate(-50%, 0);
    &::before {
      content: '';
      position: absolute;
      top: -24px;
      left: 50%;
      height: 24px;
      transform: translate(-50%, 0);
      border-left: 1px dotted ${COLOR['WHITE__#FFFFFF']};
      border-width: 0 0 0 2px;
    }
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -60%) rotate(45deg);
      width: 6px;
      height: 6px;
      background: ${COLOR['GRAY7__#F1F1F1']};
    }
  }
`;
