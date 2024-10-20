import React, { use, useEffect, useState } from 'react';
import { SVG } from '@/svg';
import { Button } from '@mui/material';
import CheckBox from './CheckBox';
import RefreshButton from './RefreshButton';
import styled from '@emotion/styled';
import COLOR from '@/constants/COLOR';
import { css } from '@emotion/react';
interface TotalAndFilterProps {
  className?: string;
  title: string;
  totalCount: number;
  list: { name: string; id: number }[];
  checkedList: number[]; //list.id[], checked id list
  isFetching: boolean; //api data fetching
  onSelect: (index: number) => void;
  onRefresh: (isOpen: boolean) => void;
  openFilter?: boolean;
  setOpenFilter?: (isOpen: boolean) => void;
}
export default function TotalAndFilter(props: TotalAndFilterProps) {
  const {
    className,
    title,
    totalCount,
    list,
    checkedList,
    isFetching,
    onSelect,
    onRefresh,

    openFilter,
    setOpenFilter
  } = props;

  const [isOpenDefault, setIsOpenDefault] = useState(false);

  const isOpen = openFilter ?? isOpenDefault;
  const setIsOpen = setOpenFilter ?? setIsOpenDefault;

  const _onClickFilter = () => {
    setIsOpen(!isOpen);
  };

  const _onClickRefresh = () => {
    onRefresh(isOpen);
  };

  useEffect(() => {
    window.location.href.includes('filter=true') && setIsOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TotalAndFilterStyle
      className={className}
      isOpen={isOpen}
      itemCount={list?.length ?? 0}
    >
      <div className="total__filter">
        <div className="total">
          <span>Total</span>
          <span className="count">{totalCount}</span>
          <RefreshButton
            isFetching={isFetching}
            onClick={_onClickRefresh}
            onlyIcon
          />
        </div>
        <Button className="filter" onClick={_onClickFilter}>
          <SVG.ICON.FILTER />
          <span>Filter</span>
        </Button>
      </div>

      <div className="open__filter">
        <div className="inner__container">
          <div className="title">{title}</div>
          <div className="division__line" />

          {list?.map((item, index) => (
            <div key={index} className="item" onClick={() => onSelect(index)}>
              <span>{item.name}</span>
              <CheckBox isChecked={checkedList.includes(item.id)} />
            </div>
          ))}
        </div>
      </div>
    </TotalAndFilterStyle>
  );
}

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
