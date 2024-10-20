import React, { use, useEffect, useState } from 'react';
import { TotalAndFilterStyle } from './camp.style';
import { SVG } from '@/svg';
import { Button } from '@mui/material';
import CheckBox from '../../../components/CheckBox';
import useGlobalStore from '@/store/globalStore';
import { useRouter } from 'next/navigation';
import RefreshButton from '../../../components/RefreshButton';

interface TotalAndFilterProps {
  className?: string;
  type: 'pioneer' | 'miningright';
  totalCount: number;
  collectionList?: { id: number; name: string }[];
  miningRightList?: number[];
  isFetching: boolean;
  refresh: () => void;
}
export default function TotalAndFilterLegacy(props: TotalAndFilterProps) {
  const {
    className,
    type,
    totalCount,
    collectionList,
    miningRightList,
    isFetching,
    refresh
  } = props;
  const [isOpen, setIsOpen] = useState(false);

  const {
    filterMiningRight,
    setFilterMiningRight,
    filterPioneer,
    setFilterPioneer
  } = useGlobalStore();
  const router = useRouter();

  const _onClickFilter = () => {
    setIsOpen(!isOpen);
  };
  const _onClickRefresh = () => {
    switch (type) {
      case 'pioneer':
        router.push(`/camp/pioneer?page=1${isOpen ? '?filter=true' : ''}`);
        refresh();
        break;
      case 'miningright':
        router.push(`/camp/miningright?page=1${isOpen ? '?filter=true' : ''}`);
        refresh();
        break;
      default:
        break;
    }
  };

  const _onClickSelectFilter = (index: number) => {
    switch (type) {
      case 'pioneer':
        const checkedCollection = collectionList![index].id;

        if (filterPioneer.includes(checkedCollection)) {
          const unChecked = filterPioneer.filter(
            (item) => item !== checkedCollection
          );
          setFilterPioneer(unChecked);
        } else {
          const checked = [...filterPioneer, checkedCollection];
          setFilterPioneer(checked);
        }
        const timeoutPioneer = setTimeout(() => {
          router.push('/camp/pioneer?page=1?filter=true');

          refresh();
          clearTimeout(timeoutPioneer);
        }, 150);

        break;

      case 'miningright':
        const checkedLevel = miningRightList![index];
        if (filterMiningRight.includes(checkedLevel)) {
          const unChecked = filterMiningRight.filter(
            (item) => item !== checkedLevel
          );
          setFilterMiningRight(unChecked);
        } else {
          const checked = [...filterMiningRight, checkedLevel];
          setFilterMiningRight(checked);
        }
        const timeoutMiningRight = setTimeout(() => {
          router.push('/camp/miningright?page=1?filter=true');
          refresh();
          clearTimeout(timeoutMiningRight);
        }, 150);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.location.href.includes('filter=true') && setIsOpen(true);
  }, []);

  const filterCount = collectionList?.length ?? miningRightList?.length ?? 0;

  return (
    <TotalAndFilterStyle
      className={className}
      isOpen={isOpen}
      itemCount={filterCount}
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
          <div className="title">
            {type === 'pioneer' ? 'Collection' : 'Level'}
          </div>
          <div className="division__line" />
          {/* pioneer Filter */}
          {type === 'pioneer' &&
            collectionList?.map((item, index) => (
              <div
                key={index}
                className="item"
                onClick={() => _onClickSelectFilter(index)}
              >
                <span>{item.name}</span>
                <CheckBox
                  isChecked={filterPioneer.includes(collectionList[index].id)}
                />
              </div>
            ))}
          {/* miningRight Filter */}
          {type === 'miningright' &&
            miningRightList?.map((item, index) => (
              <div
                key={index}
                className="item"
                onClick={() => _onClickSelectFilter(index)}
              >
                <span>{`Lv. ${item}`}</span>
                <CheckBox
                  isChecked={filterMiningRight.includes(miningRightList[index])}
                />
              </div>
            ))}
        </div>
      </div>
    </TotalAndFilterStyle>
  );
}
