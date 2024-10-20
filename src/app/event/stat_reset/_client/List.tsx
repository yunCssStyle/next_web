'use client';
import React, { useState } from 'react';
import { pioneerVerifiedDataType } from '@/query/type';
import { videoUrlConverter } from '@/util/converter';
import Image from 'next/image';
import QUERY_CUSTOM from '@/query';
import { Button } from '@mui/material';
import { SVG } from '@/svg';
import { stringUtil } from '@/util/strings';
import useHavah from '@/hook/useHavah';
import CommonModal from '@/components/modal/CommonModal';
import { ModalStatPageStyle } from '../page.style';
import COLOR from '@/constants/COLOR';

type LsitProps = {
  price: number;
  content: pioneerVerifiedDataType[];
  listRefetch: () => void;
};

export default function Lsit(props: LsitProps) {
  const { price, content, listRefetch } = props;
  const { statResetSign } = useHavah();
  const [modalShowType, setModalShowType] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [modalIngShow, setModalIngShow] = useState(false);
  const getStatLabel = (statKey: string) => {
    switch (statKey) {
      case 'luck':
        return 'Luck';
      case 'silverTongue':
        return 'Silver Tongue';
      case 'stamina':
        return 'Stamina';
      case 'intuition':
        return 'Intuition';
      default:
        return statKey;
    }
  };
  const { userInfo } = QUERY_CUSTOM.USER_INFO();

  const _onClickReset = async (collectionId: number, tokenId: number) => {
    setModalIngShow(true);
    try {
      await statResetSign({ collectionId, tokenId });
      setModalShowType('success');
      listRefetch();
      setModalShow(true);
    } catch (e) {
      setModalShowType(String(e));
      if (e !== 'failed') {
        setModalShow(true);
        listRefetch();
      }
    }
    setModalIngShow(false);
  };
  return (
    <>
      <ul className="pfp_list">
        {content.map((item, index) => (
          <li key={index}>
            <p>
              {item.collectionName} <span>#{item.tokenId}</span>
            </p>
            <div className="pfp">
              <div>
                {item.type === 'MOVIE' && (
                  <video src={videoUrlConverter(item.url)} muted />
                )}{' '}
                {item.type === 'IMAGE' && (
                  <Image
                    src={item.url}
                    alt="nft"
                    width={132}
                    height={132}
                    style={{
                      objectFit: 'contain',
                      backgroundColor: COLOR['WHITE__#FFFFFF']
                    }}
                  />
                )}
              </div>
              <ul>
                {Object.entries(item.stat!).map(
                  ([statKey, statValue], index) => (
                    <li key={index}>
                      <span>{getStatLabel(statKey)}</span>
                      <span>
                        {Object.entries(item.statBonus!).map(
                          ([statBonusKey, statBonusValue], i) =>
                            statKey === statBonusKey && (
                              <span key={i}>{statValue + statBonusValue}</span>
                            )
                        )}

                        <span className="stat">
                          {` ( `}
                          <i>{statValue}</i>
                          {Object.entries(item.statBonus!).map(
                            ([statBonusKey, statBonusValue], i) =>
                              statKey === statBonusKey && (
                                <strong key={i}> + {statBonusValue}</strong>
                              )
                          )}
                          {` )`}
                        </span>
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>
            {userInfo && (
              <Button
                disabled={userInfo?.user?.gold < price}
                onClick={() =>
                  _onClickReset(Number(item.collectionId), item.tokenId)
                }
                className={userInfo?.user?.gold < price ? 'disabled' : ''}
              >
                {userInfo?.user?.gold < price ? 'Not enough gold' : 'Reset'}

                <SVG.ICON.GOLD />
                <strong>{stringUtil.addComma1000(price)}</strong>
              </Button>
            )}
          </li>
        ))}
      </ul>

      <CommonModal title={'Verifying the NFT…'} isOpen={modalIngShow}>
        <ModalStatPageStyle>
          <Image
            src={'/assets/images/loading_papa.png'}
            alt="loading"
            width={160}
            height={160}
            quality={75}
          />
          <div className="desc">
            <p>Waiting for verification…</p>
            Verify from your HAVAH Wallet.
          </div>
        </ModalStatPageStyle>
      </CommonModal>
      <CommonModal
        title={modalShowType == 'success' ? 'Success!' : 'Failed'}
        isOpen={modalShow}
        onClose={() => {
          setModalShow(false);
        }}
        imageName={modalShowType == 'success' ? 'papa_success' : 'kiki_fail'}
        buttonText={'Close'}
        onClickButton={() => {
          setModalShow(false);
        }}
      >
        <ModalStatPageStyle>
          {modalShowType == 'success' && (
            <div className="desc">
              <p>Your NFT has been verified!</p>
              The Pioneer’s stats have been reset.
            </div>
          )}
          {modalShowType == 'NOT_ENOUGH_PACKING_BALANCE' && (
            <div className="desc">Insufficient balance.</div>
          )}
          {modalShowType == 'NODE_PIONEER_NOT_FOUND' && (
            <div className="desc">
              The NFT cannot be found
              <br />
              in the connected wallet.
            </div>
          )}
          {modalShowType == 'PIONEER_NOT_FOUND' && (
            <div className="desc">
              Unable to reset Pioneer stats.
              <br />
              Pionner has already been equipped or reset.
            </div>
          )}
        </ModalStatPageStyle>
      </CommonModal>
    </>
  );
}
