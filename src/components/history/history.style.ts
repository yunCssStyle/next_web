import COLOR from '@/constants/COLOR';
import styled from '@emotion/styled';

export const HistoryViewerStyle = styled.div`
  margin: 16px 0 40px;
  .item {
    margin-top: 16px;
    &:first-of-type {
      margin-top: 0;
    }
  }
`;

export const HistoryBoxStyle = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Inter', sans-serif;

  width: 100%;
  min-width: 328px;
  max-width: 736px;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0px 7px 15px 0px rgba(0, 0, 0, 0.04);
  background: ${COLOR['WHITE__#FFFFFF']};
  &.PROCESSING {
    background: linear-gradient(0deg, #fffcde 0%, #fffcde 100%), #eafcff;
  }
  &.FAILED {
    background: #fff2f3;
  }

  div {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 16px;
    &.top {
      justify-content: space-between;
    }
    &:first-of-type {
      margin-top: 0;
    }

    .small {
      display: block;
      color: ${COLOR['GRAY3__#929292']};
      text-align: left;
      font-size: 12px;
      font-weight: 400;
      line-height: 19px;
      letter-spacing: -0.12px;
      width: 56px;
      &.date {
        width: fit-content;
        display: flex;
        span {
          display: block;
          height: 16px;
          svg {
            margin-left: 4px;
          }
          :hover {
            cursor: pointer;
          }
        }
        /* align-items: center; */
      }
    }
    .large {
      color: ${COLOR['BLACK__#000000']};
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;
      &.status {
        text-transform: capitalize;
      }
    }

    .failed__info {
      margin-left: 12px;
      color: ${COLOR['GRAY2__#565656']};
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      a {
        color: ${COLOR['GRAY2__#565656']};
        font-size: 14px;
        font-weight: 400;
        line-height: 160%;
        text-decoration-line: underline;
      }
    }
    .token {
      display: block;
      width: 39px;
      height: 22px;
      padding-top: 2px;
      margin-right: 8px;
      text-align: center;
      font-size: 12px;
      font-weight: 500;
      line-height: 19px;
      letter-spacing: -0.12px;
      height: 22px;
      border-radius: 4px;
      background: #353a50;
      color: ${COLOR['WHITE__#FFFFFF']};
      &.gold {
        background: ${COLOR['YELLOW__#FFE400']};
        color: ${COLOR['GRAY1__#272727']};
      }
    }
  }

  //**/
  .status,
  .gold {
    text-transform: capitalize;
  }

  .mzt {
    text-transform: uppercase;
  }
`;

export const PaginationStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Inter', sans-serif;
  .pages {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-radius: 12px;
    margin: 0 16px;
    .page {
      padding-top: 1px;
      width: 30px;
      height: 30px;
      font-size: 14px;
      text-align: center;
      font-weight: 700;
      line-height: 30px;
      margin-left: 8px;
      &.active {
        border-radius: 8px;
        color: ${COLOR['WHITE__#FFFFFF']};
        background: ${COLOR['BLACK__#000000']};
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
      }

      :hover {
        cursor: pointer;
      }

      &:first-of-type {
        margin-left: 0;
      }
    }
  }

  .arrow {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 40px;
    height: 40px;
    padding: 8px;
    align-items: center;
    border-radius: 8px;
    border: 1px solid ${COLOR['GRAY5__#D2D2D2']};
    color: ${COLOR['GRAY5__#D2D2D2']};
    background-color: ${COLOR['GRAY8__#FAFAFA']};
    :hover {
      color: none;
      cursor: pointer;
    }
    :disabled {
      border-color: ${COLOR['GRAY6__#E7E7E7']};
      svg {
        path {
          stroke: ${COLOR['GRAY5__#D2D2D2']};
        }
      }
    }
    svg {
      min-width: 24px;
      min-height: 24px;
    }
  }
`;
