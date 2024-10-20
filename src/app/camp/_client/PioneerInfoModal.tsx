import useGlobalStore from '@/store/globalStore';
import React from 'react';
import { PioneerInfoModalStyle } from '../../../components/modal/modal.style';
import QUERY_CUSTOM from '@/query';
import { SVG } from '@/svg';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import COLOR from '@/constants/COLOR';
import { videoUrlConverter } from '@/util/converter';
import useCampStore from '../_store';
import { set } from 'lodash';

export default function PioneerInfoModal() {
  const {
    // resetShowCampModalState,
    // showCampModalState,
    filterPioneer,
    currentPageNumber
  } = useGlobalStore();

  const { setShowCampModal, setSelectIndex, setOnClickOK, selectIndex } =
    useCampStore();

  const index = selectIndex ?? 0;

  const { data: session } = useSession();

  const { data } = QUERY_CUSTOM.PIONEER_VERIFIED_LIST_PAGE(
    currentPageNumber,
    !!session,
    filterPioneer
  );

  const selectedData =
    //   index === 99 ? data?.equippedPioneer : data!.pioneers[index];
    index === -1 ? data?.equippedPioneer : data!.pioneers[index];
  // const selectedData = data?.equippedPioneer;

  if (!selectedData) {
    setShowCampModal(null);
    setSelectIndex(null);
    setOnClickOK(() => {});

    return;
  }

  const stat = [
    {
      name: 'Luck',
      totalValue:
        (selectedData.stat?.luck ?? 0) + (selectedData.statBonus?.luck ?? 0),
      value: selectedData.stat?.luck ?? 0,
      bonus: selectedData.statBonus?.luck ?? 0
    },
    {
      name: 'Silver Tongue',
      totalValue:
        (selectedData.stat?.silverTongue ?? 0) +
        (selectedData.statBonus?.silverTongue ?? 0),
      value: selectedData.stat?.silverTongue ?? 0,
      bonus: selectedData.statBonus?.silverTongue ?? 0
    },
    {
      name: 'Stamina',
      totalValue:
        (selectedData.stat?.stamina ?? 0) +
        (selectedData.statBonus?.stamina ?? 0),
      value: selectedData.stat?.stamina ?? 0,
      bonus: selectedData.statBonus?.stamina ?? 0
    },
    {
      name: 'Intuition',
      totalValue:
        (selectedData.stat?.intuition ?? 0) +
        (selectedData.statBonus?.intuition ?? 0),
      value: selectedData.stat?.intuition ?? 0,
      bonus: selectedData.statBonus?.intuition ?? 0
    }
  ];

  return (
    <PioneerInfoModalStyle noneStat={!selectedData.stat}>
      <div className="modal">
        <div className="inner__container">
          <div className="img__container">
            {selectedData.type === 'MOVIE' && (
              <video
                src={videoUrlConverter(selectedData.url)}
                autoPlay
                loop
                muted
              />
            )}
            {selectedData.type === 'IMAGE' && (
              <Image
                src={selectedData.url}
                alt="nft"
                width={172}
                height={172}
                style={{
                  objectFit: 'contain',
                  backgroundColor: COLOR['GRAY7__#F1F1F1']
                }}
              />
            )}
          </div>
          <div className="name">
            {selectedData?.collectionName ?? 'unknown'} #{selectedData.tokenId}
          </div>
          {stat.map((item, index) => (
            <div key={index} className="stat">
              <span>{item.name}</span>
              <span>
                <span>{item.totalValue}&nbsp;</span>(&nbsp;{item.value}
                <span>&nbsp;+&nbsp;{item.bonus}</span>&nbsp;)
              </span>
            </div>
          ))}
          {!selectedData.stat && (
            <div className="stat__notification">
              Grant Property at the MINE WARZ APP!
            </div>
          )}
        </div>
      </div>

      <div
        className="close"
        onClick={() => {
          setShowCampModal(null);
          setSelectIndex(null);
          setOnClickOK(() => {});
        }}
      >
        <SVG.ICON.CLOSE />
      </div>
    </PioneerInfoModalStyle>
  );
}
