import React, { useEffect, useState } from 'react';
import { PaginationStyled } from './history/history.style';
import { SVG } from '@/svg';
import useGlobalStore from '@/store/globalStore';
import { Button } from '@mui/material';

interface IPagination {
  className?: string;
  totalPage: number;
  onClick: (page: number) => void;
  type?: 'page' | 'modal';
}
export default function Pagination(props: IPagination) {
  const { className, totalPage, onClick, type = 'page' } = props;
  const [pages, setPages] = useState<number[]>([]);

  const {
    currentPageNumber,
    setCurrentPageNumber,
    currentModalPageNumber,
    setCurrentModalPageNumber
  } = useGlobalStore();

  const currentNumber =
    type === 'page'
      ? currentPageNumber
      : type === 'modal'
      ? currentModalPageNumber
      : 1;

  const setCurrentNumber =
    type === 'page'
      ? setCurrentPageNumber
      : type === 'modal'
      ? setCurrentModalPageNumber
      : () => {};

  useEffect(() => {
    const pages = [];
    if (currentNumber <= 3) {
      for (let i = 1; i <= (totalPage >= 5 ? 5 : totalPage); i++) {
        pages.push(i);
      }
    } else if (currentNumber >= totalPage - 2) {
      for (let i = totalPage - 4; i <= totalPage; i++) {
        i > 0 && pages.push(i);
      }
    } else {
      for (let i = currentNumber - 2; i <= currentNumber + 2; i++) {
        pages.push(i);
      }
    }
    setPages(pages);
  }, [currentNumber, totalPage]);

  const scrollReturn = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0 });
    }, 100);
  };

  const _onClickPage = (page: number) => {
    setCurrentNumber(page);
    onClick(page);
    scrollReturn();
  };

  const _onClickPrev = (e: any) => {
    e.preventDefault();
    if (currentNumber === 1) {
      return;
    }
    setCurrentNumber(currentNumber - 1);
    onClick(currentNumber - 1);
    scrollReturn();
  };

  const _onClickNext = (e: any) => {
    e.preventDefault();
    if (currentNumber === totalPage) {
      return;
    }
    setCurrentNumber(currentNumber + 1);
    onClick(currentNumber + 1);
    scrollReturn();
  };

  return (
    <PaginationStyled className={className}>
      <Button
        className="arrow left"
        onClick={_onClickPrev}
        disabled={currentNumber === 1}
      >
        <SVG.ICON.PAGINATION_LEFT />
      </Button>
      <div className="pages">
        {pages.map((page) => {
          return (
            <div
              key={page}
              className={`page ${page === currentNumber ? 'active' : ''}`}
              onClick={() => _onClickPage(page)}
            >
              {page}
            </div>
          );
        })}
      </div>
      <Button
        className="arrow right"
        onClick={_onClickNext}
        disabled={currentNumber === totalPage}
      >
        <SVG.ICON.PAGINATION_RIGHT />
      </Button>
    </PaginationStyled>
  );
}
