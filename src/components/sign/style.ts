import COLOR from '@/constants/COLOR';
import styled from '@emotion/styled';

export const NotificationAndTooltipStyle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 24px;
  span {
    display: block;
    padding-top: 2px;
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
    color: ${COLOR['GRAY3__#929292']};
    margin-right: 2px;
  }
  .question__mark {
    position: relative;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    .triangle {
      width: 24px;
      text-align: center;
      bottom: -18px;
      position: absolute;
    }
  }

  .tooltip {
    position: absolute;
    background-color: green;
    top: 33px;
    left: 50%;
    transform: translateX(-50%);
    max-width: 720px;
    width: calc(100vw - 52px);
    font-size: 12px;
    font-weight: 400;
    line-height: 19.2px;
    text-align: left;
    padding: 10px 16px;
    color: ${COLOR['WHITE__#FFFFFF']};
    background-color: ${COLOR['GRAY1__#272727']};
    border-radius: 8px;
  }
`;
