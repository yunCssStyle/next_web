'use client';
import Axios from '@/axios/axios';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Modal } from '@mui/material';
import { SVG } from '@/svg';
import COLOR from '@/constants/COLOR';
import { CommonModalLegacyStyle } from './modal.style';
import ButtonCustom from '@/components/ButtonCustom';
import DropdownProps from '@/components/Dropdown';
import Image from 'next/image';
import { cdnUrl, videoUrlConverter } from '@/util/converter';
import QUERY_CUSTOM from '@/query';
import { profileStatType } from '@/query/type';
import ModalLayout from './ModalLayout';

interface PfpsStatsModalProps {
  onClose: () => void;
}
export default function PfpsStatsModal({ onClose }: PfpsStatsModalProps) {
  const [isShow, setIsShow] = useState(false);
  const [isCollectionList, setIsCollectionList] = useState(
    'Please select Collection'
  );
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState('');
  const { collectionListData } = QUERY_CUSTOM.COLLECTION_LIST();
  const [isStat, setIsStat] = useState<boolean>(true);
  const [isStatData, setIsStatData] = useState<profileStatType>();
  const [ableSearch, setAbleSearch] = useState(true);

  const _onClickClose = () => {
    setIsShow(false);
    onClose();
  };

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

  const _statSearchClick = async () => {
    if (!isImageLoaded || !ableSearch) return;

    //search term 1sec
    setAbleSearch(false);
    setTimeout(() => {
      setAbleSearch(true);
    }, 1000);

    if (collectionListData === undefined) return;
    setIsImageLoaded(false);

    let id;
    collectionListData.collectionList.map((it) => {
      if (it.name === isCollectionList) {
        id = it.id;
      }
    });
    await Axios.post('/profile/stat', {
      collectionId: id,
      havahTokenId: inputValue
    })
      .then((res) => {
        if (res.status === 200) {
          if (res.data != '') {
            setIsStat(true);
            setIsStatData(res.data);
            setIsImageLoaded(true);
          } else {
            setIsStat(false);
            setIsImageLoaded(true);
          }
        }
      })
      .catch((err) => {
        setIsStat(false);
        setIsImageLoaded(true);
        // console.log(err.response.data);
      });
  };
  const _onClickShortcut = (e: string) => {
    window.open(e, '_blank');
  };

  useEffect(() => {
    setIsShow(true);
  }, []);
  if (!isShow) return null;
  return (
    <ModalLayout
      title="Check a Pioneer's Stats"
      isOpen={true}
      onClose={_onClickClose}
    >
      <>
        <PfpsStatsModalStyle>
          <div className="pfp_select">
            <div>
              <p>Collection</p>
              <DropdownProps
                dropdownList={
                  collectionListData
                    ? collectionListData.collectionList.map((it) => it.name)
                    : ['Loading...']
                }
                selectedRewardDropdown={isCollectionList}
                setSelectedRewardDropdown={(menu) => {
                  setIsCollectionList(menu);
                }}
                customBackground={COLOR['WHITE__#FFFFFF']}
              />
            </div>
            <div>
              <p>Token ID</p>
              <div
                className={`input ${isCollectionList ? '' : 'disabled'} ${
                  inputValue ? '' : 'placeholder'
                }`}
              >
                #
                {isCollectionList ? (
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        _statSearchClick();
                      }
                    }}
                  />
                ) : (
                  <input type="text" disabled />
                )}
              </div>
            </div>
          </div>

          <div className="pfp_view">
            {isImageLoaded === false && (
              <div className="loading">
                <div>
                  <Image
                    src={'/assets/images/loading_papa.png'}
                    alt="loading"
                    width={160}
                    height={160}
                    style={{
                      objectFit: 'contain'
                    }}
                  />
                  <span>Loading...</span>
                </div>
              </div>
            )}

            <div className="pfp_img">
              {isStatData !== undefined && isStat ? (
                <>
                  {isStatData.data.type === 'MOVIE' && (
                    <video
                      src={videoUrlConverter(isStatData.data.url)}
                      onCanPlay={() => setIsImageLoaded(true)}
                      muted
                      className={isImageLoaded ? 'loaded' : ''}
                    />
                  )}
                  {isStatData.data.type === 'IMAGE' && (
                    <Image
                      src={isStatData.data.url}
                      alt="nft"
                      width={88}
                      height={88}
                      onLoad={() => setIsImageLoaded(true)}
                      style={{
                        objectFit: 'contain',
                        backgroundColor: COLOR['GRAY8__#FAFAFA']
                      }}
                      className={isImageLoaded ? 'loaded' : ''}
                    />
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
            {isStatData !== undefined && isStat && isImageLoaded ? (
              <>
                <div className="pfp_collection">
                  {isStatData.data.collectionName}
                  <span
                    className="shortcut"
                    onClick={() => _onClickShortcut(isStatData.scanAddress!)}
                  >
                    {SVG.ICON.SHORTCUT_CUSTOM(COLOR['GRAY4__#B1B1B1'])}
                  </span>
                </div>
                <div className="tokenId">
                  <span>#{isStatData.data.tokenId}</span>
                </div>
                {isStatData.data.stat !== null &&
                isStatData.data.statBonus !== null ? (
                  <ul className="pfp_stat">
                    {Object.entries(isStatData.data.stat!).map(
                      ([statKey, statValue], index) => (
                        <li key={index}>
                          <span>{getStatLabel(statKey)}</span>
                          <span>
                            {Object.entries(isStatData.data.statBonus!).map(
                              ([statBonusKey, statBonusValue], i) =>
                                statKey === statBonusKey && (
                                  <span key={i}>
                                    {statValue + statBonusValue}
                                  </span>
                                )
                            )}
                            <span className="stat">
                              {` ( `}
                              <i>{statValue}</i>
                              {Object.entries(isStatData.data.statBonus!).map(
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
                ) : (
                  <div className="find_search">
                    This Pioneer&apos;s stats remain undrawn!
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="find_search">
                  Wonder what stats a Pioneer has?
                  <br />
                  Search and find out!
                </div>
              </>
            )}
          </div>
          {isStat ? (
            <></>
          ) : (
            <p className="no_NFT">
              <SVG.ICON.ERROR />
              <span>
                No NFT found.  Please check the collection and the token ID.
              </span>
            </p>
          )}
        </PfpsStatsModalStyle>
        <ButtonCustom
          onClick={_statSearchClick}
          disabled={!isCollectionList || !inputValue || !isImageLoaded}
        >
          <span>Search</span>
        </ButtonCustom>
      </>
    </ModalLayout>
  );
}

const PfpsStatsModalStyle = styled.div`
  display: block;
  width: 100%;
  .pfp_select {
    display: flex;
    justify-content: space-between;
    & > div {
      width: calc(50% - 8px);
      p {
        font-size: 16px;
        font-weight: 500;
        color: ${COLOR['GRAY2__#565656']};
        margin-bottom: 5px;
      }
      &:last-of-type {
        margin-left: 16px;
      }
      .input {
        width: 100%;
        height: 48px;
        padding: 0px 14px 0px 16px;
        border-radius: 8px;
        border: 1px solid ${COLOR['GRAY5__#D2D2D2']};
        font-size: 24px;
        font-weight: 500;
        line-height: 48px;
        display: flex;
        align-items: start;
        input {
          width: calc(100% - 30px);
          border: 0;
          color: ${COLOR['BLACK__#000000']};
          font-size: 24px;
          font-weight: 500;
          height: 46px;
          line-height: 46px;
          outline: none;
        }
        &.disabled {
          background: ${COLOR['GRAY7__#F1F1F1']};
          border-color: ${COLOR['GRAY7__#F1F1F1']};
          color: ${COLOR['GRAY4__#B1B1B1']};
          input {
            background: ${COLOR['GRAY7__#F1F1F1']};
          }
        }
        &.placeholder {
          color: ${COLOR['GRAY4__#B1B1B1']};
          background-color: ${COLOR['GRAY7__#F1F1F1']};
          border-color: ${COLOR['GRAY7__#F1F1F1']};
          input {
            background-color: ${COLOR['GRAY7__#F1F1F1']};
          }
        }
      }
    }
  }
  .no_NFT {
    font-size: 14px;
    font-weight: 500;
    color: ${COLOR['ERROR__#EC1A26']};
    margin-bottom: 17px;
    display: flex;
    align-items: start;
    justify-content: center;
    line-height: 1.2;
    svg {
      width: 32px;
      height: 24px;
      position: relative;
      top: -5px;
    }
    span {
      display: inline-block;
      text-align: center;
    }
  }
  .pfp_view {
    border-radius: 24px;
    background: ${COLOR['GRAY7__#F1F1F1']};
    padding: 24px 16px;
    margin: 20px 0 40px;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    .loading {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.2);
      z-index: 1;
      div {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 110px;
        height: 150px;
        text-align: center;
      }
      img {
        width: 110px;
        height: auto;
        opacity: 1;
      }
      span {
        margin-top: 0px !important;
        line-height: 1.2 !important;
      }
    }
    .pfp_img {
      background-color: #d9d9d9;
      border-radius: 20px;
      width: 172px;
      height: 172px;
      background-image: url(${cdnUrl('/assets/images/video_poster.png')});
      background-size: cover;
      overflow: hidden;
      position: relative;
      video {
        width: 100%;
        height: 100%;
        opacity: 0;
        &.loaded {
          opacity: 1;
        }
      }
      img {
        width: 100%;
        height: 100%;
        opacity: 0;
        &.loaded {
          opacity: 1;
        }
      }
    }
    .pfp_collection {
      color: ${COLOR['BLACK__#000000']};
      text-align: center;
      font-size: 20px;
      font-weight: 500;
      margin: 16px 0 0px;
      display: flex;
      align-items: center;
      justify-content: center;
      .shortcut {
        margin-left: 4px;
        display: flex;
        cursor: pointer;
      }
    }
    .tokenId {
      text-align: center;
      font-size: 20px;
      font-weight: 500;
      margin: 0 0 24px;
    }
    .find_search {
      margin: 16px 0 0px;
      text-align: center;
      color: ${COLOR['GRAY2__#565656']};
      font-size: 14px;
    }
    .pfp_stat {
      width: 100%;
      li {
        display: flex;
        justify-content: space-between;
        border-radius: 4px;
        background: ${COLOR['GRAY8__#FAFAFA']};
        padding: 0 24px;
        height: 30px;
        margin-top: 4px;
        font-weight: 400;
        line-height: 30px;
        letter-spacing: -0.12px;
        > span {
          &:first-of-type {
            font-size: 12px;
            color: ${COLOR['GRAY2__#565656']};
          }
          &:last-of-type {
            font-size: 14px;
          }
          span {
            color: ${COLOR['BLACK__#000000']};
            &.stat {
              color: ${COLOR['GRAY3__#929292']};
            }
            i {
              color: ${COLOR['GRAY3__#929292']};
              font-style: normal;
            }
            strong {
              font-weight: 400;
              color: ${COLOR['ORANGE__#FF570E']};
            }
          }
        }
      }
    }
  }
  @media (max-width: 767px) {
    .pfp_select {
      flex-direction: column;
      & > div {
        width: 100%;
        &:last-of-type {
          margin-left: 0;
          margin-top: 16px;
        }
      }
    }
  }
`;
