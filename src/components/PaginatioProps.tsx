import React, { useEffect, useState } from 'react';
import { PaginationStyled } from './history/history.style';
import { SVG } from '@/svg';
import useGlobalStore from '@/store/globalStore';
import { Button } from '@mui/material';
import ScrollTo from './ScrollTo';

interface IPagination {
  className?: string;
  totalPage: number;
  onClick: (page: number) => void;
  currentNumber: number;
}
export default function PaginationProps(props: IPagination) {
  const { className, totalPage, onClick, currentNumber } = props;
  const [pages, setPages] = useState<number[]>([]);

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
    onClick(page);
    scrollReturn();
  };

  return (
    <PaginationStyled className={className}>
      <ScrollTo />
      <Button
        className="arrow left"
        onClick={() => _onClickPage(currentNumber - 1)}
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
        onClick={() => _onClickPage(currentNumber + 1)}
        disabled={currentNumber === totalPage}
      >
        <SVG.ICON.PAGINATION_RIGHT />
      </Button>
    </PaginationStyled>
  );
}
