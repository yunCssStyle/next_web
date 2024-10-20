import React, { useState } from 'react';
import { PioneerSelectModalStyle } from '@/components/modal/modal.style';
import QUERY_CUSTOM from '@/query';
import { SVG } from '@/svg';
import CheckBox from '@/components/CheckBox';
import EmptyList from '@/components/EmptyList';
import CheckCollectionButton from '@/components/modal/CheckCollectionButton';
import ButtonCustom from '@/components/ButtonCustom';
import useGlobalStore from '@/store/globalStore';
import useHavah from '@/hook/useHavah';
import Loading from '@/components/Loading';
import PioneerBoxForSelectModal from '@/app/camp/_client/PioneerBoxForSelectModal';
import { CONSTANTS } from '@/constants/CONSTANTS';
import Pagination from '@/components/Pagination';
import RefreshButton from '@/components/RefreshButton';
import { useAddressChangeDetection } from '@/hook/useAddressChangeDetection';
import useCampStore from '../_store';

export default function PioneerSelectModal() {
  const [selectPage, setSelectPage] = useState(1);

  const { data, isLoading, isFetching, refetch } =
    QUERY_CUSTOM.PIONEER_NFT_LIST();

  const [checkedList, setCheckedList] = useState<number[]>([]);

  // const { resetShowCampModalState, setShowCampModalState } =
  //   useGlobalStore.getState();

  const { setShowCampModal, setSelectIndex } = useCampStore.getState();
  const { verifyPioneer } = useHavah();

  const { isWalletAddressChanged } = useAddressChangeDetection();

  const total = data?.length ?? 0;

  const _onClickSelectPioneer = (checkItemIdex: number) => {
    if (checkedList.includes(checkItemIdex)) {
      // remove
      setCheckedList((state) => state.filter((item) => item !== checkItemIdex));
    } else {
      // add
      if (checkedList.length < 10) {
        setCheckedList((state) => [...state, checkItemIdex]);
      }
    }
  };

  const _onClickAddPioneer = async () => {
    if (await isWalletAddressChanged()) {
      return setShowCampModal('checkHavahWallet');
    }

    verifyPioneer(checkedList);
  };

  const _onClickPage = (page: number) => {
    setSelectPage(page);
  };

  const _onClickRefresh = () => {
    refetch();
  };

  const startIndex = (selectPage - 1) * CONSTANTS.CAMP_LIST_COUNT_LIMIT;
  const endIndex = startIndex + CONSTANTS.CAMP_LIST_COUNT_LIMIT;

  return (
    <PioneerSelectModalStyle>
      <div className="modal">
        <h2>Select NFT</h2>

        <div className="available__nfts">
          <span>Available NFTs</span>
          <span className="count">{total}</span>
          <RefreshButton
            isFetching={isFetching}
            onClick={_onClickRefresh}
            onlyIcon
          />
        </div>

        {isLoading || isFetching ? (
          <Loading marginTopAndBottom={80} />
        ) : total ? (
          <div className="list">
            <div>
              {data?.slice(startIndex, endIndex).map((item, index) => {
                const checkItemIdex =
                  (selectPage - 1) * CONSTANTS.CAMP_LIST_COUNT_LIMIT + index;
                return (
                  <div
                    className="item"
                    key={index}
                    onClick={() => _onClickSelectPioneer(checkItemIdex)}
                  >
                    <div className="check__box">
                      <CheckBox
                        type="circle"
                        isChecked={checkedList.includes(checkItemIdex)}
                      />
                    </div>
                    <PioneerBoxForSelectModal {...item} />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <EmptyList type="addSelectModal" />
        )}
        {!isLoading && !isFetching && total ? (
          <>
            <Pagination
              className="pagination"
              totalPage={Math.ceil(total / CONSTANTS.CAMP_LIST_COUNT_LIMIT)}
              onClick={_onClickPage}
              type="modal"
            />
            <div className="selected">
              <span>Selected</span>
              {total < 10 ? (
                <span className="count">{checkedList.length}</span>
              ) : (
                <span className="count">
                  {checkedList.length}
                  <span>/10</span>
                </span>
              )}
            </div>
          </>
        ) : null}

        <div className="add__button">
          <div className="collection__button">
            <CheckCollectionButton />
          </div>
          <ButtonCustom
            onClick={
              total
                ? _onClickAddPioneer
                : () => {
                    setShowCampModal(null);
                    setSelectIndex(null);
                  }
            }
            disabled={total ? checkedList.length === 0 : false}
          >
            {total ? 'Add Pioneer' : 'Close'}
          </ButtonCustom>
        </div>
      </div>
      <div
        className="close"
        onClick={() => {
          setShowCampModal(null);
          setSelectIndex(null);
        }}
      >
        <SVG.ICON.CLOSE />
      </div>
    </PioneerSelectModalStyle>
  );
}
