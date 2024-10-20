import React, { useState } from 'react';
import {
  MiningRightSelectModalStyle,
  MiningRightSelectModalTooltipStyle
} from '../../../components/modal/modal.style';
import QUERY_CUSTOM from '@/query';
import { SVG } from '@/svg';
import CheckBox from '../../../components/CheckBox';
import EmptyList from '../../../components/EmptyList';
import ButtonCustom from '../../../components/ButtonCustom';
import useHavah from '@/hook/useHavah';
import Loading from '../../../components/Loading';
import MiningRightBoxForSelectModal from './MiningRightForSelectModal';
import { miningRightNftListType } from '@/query/type';
import { CONSTANTS } from '@/constants/CONSTANTS';
import Pagination from '../../../components/Pagination';
import RefreshButton from '../../../components/RefreshButton';
import { useAddressChangeDetection } from '@/hook/useAddressChangeDetection';
import useCampStore from '../_store';

export default function MiningRightSelectModal() {
  const [selectPage, setSelectPage] = useState(1);
  const [showTooltip, setShowTooltip] = useState(false);
  const { data, isLoading, isFetching, refetch, error } =
    QUERY_CUSTOM.MINING_RIGHT_NFT_LIST();
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const { importMiningRights } = useHavah();

  const { setShowCampModal } = useCampStore();

  const { isWalletAddressChanged } = useAddressChangeDetection();

  const _onClickSelectMiningRight = (target: string) => {
    if (checkedList.length > 0) {
      const targetTokenId = target.split('.')[0];
      const checkedTokenId = checkedList[0].split('.')[0];
      if (targetTokenId !== checkedTokenId) {
        setCheckedList([]);
      }
    }

    if (checkedList.includes(target)) {
      setCheckedList((state) => state.filter((item) => item !== target));
    } else {
      setCheckedList((state) => [...state, target]);
    }
  };

  const _onClickReturnRight = async () => {
    if (await isWalletAddressChanged()) {
      return setShowCampModal('checkHavahWallet');
    }
    const _tokenId = checkedList[0].split('.')[0];
    const _count = checkedList.length.toString();
    setShowCampModal('loadingConvertingToMinewarz');
    importMiningRights(_tokenId, _count);
  };

  const miningRightBoxRenderer = (
    data?: miningRightNftListType
  ): {
    render: JSX.Element[];
    total: number;
  } => {
    const render: JSX.Element[] = [];
    let total = 0;

    if (!data) data = [];
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].amount; j++) {
        const disabled =
          checkedList.length > 0 &&
          checkedList[0].split('.')[0] !== data[i].tokenId.toString();

        const key = `${data[i].tokenId}.${j}`;
        total++;
        render.push(
          <div
            className={`item ${disabled ? 'disabled' : ''}`}
            key={key}
            onClick={() => _onClickSelectMiningRight(key)}
          >
            <div className="check__box">
              <CheckBox
                type="circle"
                isChecked={checkedList.includes(key)}
                disabled={disabled}
              />
            </div>
            <MiningRightBoxForSelectModal {...data[i]} disabled={disabled} />
          </div>
        );
      }
    }
    return { render, total };
  };

  const { render, total } = miningRightBoxRenderer(data);

  const _onClickPage = (page: number) => {
    setSelectPage(page);
  };

  const _onClickRefresh = () => {
    refetch();
  };

  const _onMouseEnter = () => {
    setShowTooltip(true);
  };
  const _onMouseLeave = () => {
    setShowTooltip(false);
  };
  const startIndex = (selectPage - 1) * CONSTANTS.CAMP_LIST_COUNT_LIMIT;
  const endIndex = startIndex + CONSTANTS.CAMP_LIST_COUNT_LIMIT;
  return (
    <MiningRightSelectModalStyle>
      <div className="modal">
        <h2>Select NFT</h2>

        <div className="available__nfts">
          <span>Total</span>
          <span className="count">
            {isLoading || isFetching ? 0 : render.length}
          </span>
          <RefreshButton
            isFetching={isFetching}
            onClick={_onClickRefresh}
            onlyIcon
          />
        </div>

        {isLoading || isFetching ? (
          <Loading marginTopAndBottom={80} />
        ) : render.length > 0 ? (
          <div className="list">{render.slice(startIndex, endIndex)}</div>
        ) : (
          <EmptyList type="addSelectModal" />
        )}

        {!isLoading && !isFetching && (
          <span
            className={`notification ${
              showTooltip ? 'add__margin__bottom' : ''
            }`}
          >
            <span>How does claiming work?</span>
            <div
              className="question"
              onMouseEnter={_onMouseEnter}
              onMouseLeave={_onMouseLeave}
            >
              <SVG.ICON.QUESTION_CIRCLE />
              {showTooltip && (
                <div className="tooltip">
                  <div className="tooltip__triangle">
                    <SVG.ICON.TOOLTIP_TRIANGLE />
                  </div>
                </div>
              )}
            </div>
            {showTooltip && (
              <MiningRightSelectModalTooltip
                type={render.length > 0 ? undefined : 'empty'}
              />
            )}
          </span>
        )}

        {!isLoading && !isFetching && total !== 0 ? (
          <>
            {total > CONSTANTS.CAMP_LIST_COUNT_LIMIT && (
              <Pagination
                className="pagination"
                totalPage={Math.ceil(total / CONSTANTS.CAMP_LIST_COUNT_LIMIT)}
                onClick={_onClickPage}
                type="modal"
              />
            )}
            <div className="selected">
              <span>Selected</span>
              <span className="count">{checkedList.length}</span>
            </div>
            <div className="add__button">
              <ButtonCustom
                onClick={_onClickReturnRight}
                disabled={checkedList.length === 0}
              >
                Claim Mining Right
              </ButtonCustom>
            </div>
          </>
        ) : (
          <>
            <div className="close__button">
              <ButtonCustom onClick={() => setShowCampModal(null)}>
                Close
              </ButtonCustom>
            </div>
          </>
        )}
      </div>
      <div className="close" onClick={() => setShowCampModal(null)}>
        <SVG.ICON.CLOSE />
      </div>
    </MiningRightSelectModalStyle>
  );
}

const MiningRightSelectModalTooltip = (props: { type?: 'empty' }) => {
  const notificationText = [
    'Each claim request only allows you to claim mining rights of the same level.',
    'When you send Mining Rights to MINE WARZ, the corresponding NFT will be burned and converted into in-game data. In-game Mining Rights can be converted back into an NFT at any time.'
  ];
  return (
    <MiningRightSelectModalTooltipStyle>
      {props.type !== 'empty' && (
        <div className="tooltip__notification">
          <div className="dot" />
          <p>{notificationText[0]}</p>
        </div>
      )}
      <div className="tooltip__notification">
        <div className="dot" />

        <p>{notificationText[1]}</p>
      </div>
    </MiningRightSelectModalTooltipStyle>
  );
};
