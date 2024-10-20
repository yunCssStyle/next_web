'use client';
import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import COLOR from '@/constants/COLOR';
import { converter } from '@/util/converter';
import { SVG } from '@/svg';
import useGovernanceStore from '@/app/governance/_store';
import Image from 'next/image';
import Loading from '../../../components/Loading';
import EmptyList from '../../../components/EmptyList';
import QUERY_GOVERNANCE from '@/app/governance/_query';

export default function DetailModalList({ voteId }: { voteId: number }) {
  const { searchInputValue } = useGovernanceStore((state) => state);
  const {
    data: infinityData,
    fetchNextPage,
    isLoading,
    isFetching,
    isError
  } = QUERY_GOVERNANCE.DETAIL_MODAL_LIST_INFINITY(voteId, searchInputValue);

  const ref = useRef(null);

  const getAddressArray = (address: string[]) => {
    try {
      return address.map((address: string, index: number) => (
        <div className="address" key={index}>
          <span
            className={address === searchInputValue ? 'search__target' : ''}
          >
            {converter.walletAddressShortener(String(address))}
          </span>
          <span
            className="copy"
            onClick={() => {
              navigator.clipboard.writeText(String(address));
            }}
          >
            <SVG.ICON.COPY2 />
          </span>
        </div>
      ));
    } catch (error) {
      return null;
    }
  };

  // last 페이지가 아닐때 로딩 테그 발견시 다음 페이지를 불러온다.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // ref가 화면에 보이는 경우
        if (entries[0].isIntersecting) {
          // 다음 페이지를 불러옵니다.
          fetchNextPage();
        }
      },
      {
        threshold: 1.0 // ref의 100%가 보일 때 콜백 함수를 실행합니다.
      }
    );

    // ref가 null이 아닌 경우 observer를 연결합니다.
    if (ref.current) {
      observer.observe(ref.current);
    }

    // 컴포넌트가 unmount될 때 observer를 해제합니다.
    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    };
  }, [infinityData, fetchNextPage]);

  if (isLoading) return <Loading sessionCheck={false} />;

  if (!searchInputValue && !infinityData?.pages[0].voteResult?.content.length) {
    return <EmptyList type="voteDetailModal_noVotesCast" />;
  }

  if (isError || !infinityData?.pages[0].voteResult) {
    return <EmptyList type="voteDetailModal" />;
  }
  return (
    <ListStyle>
      {infinityData?.pages.map((pageInfo, page) =>
        pageInfo.voteResult?.content.map((item, index) => {
          const isObserverTarget =
            page + 1 === infinityData.pages.length &&
            !pageInfo.voteResult?.last &&
            index === 5;

          const addressCount = item.address.length;
          return (
            <>
              <div
                ref={isObserverTarget ? ref : null}
                key={`${page}-${index}`}
                className={`votes__box ${isObserverTarget ? 'target' : ''}}`}
              >
                <div className="name__box">
                  <span className="name">nickname</span>
                  <span
                    className="name"
                    style={{ height: `${addressCount * 30 - 4}px` }}
                  >
                    wallet address
                  </span>
                  <span className="name">voted item</span>
                  <span className="name">voting power</span>
                </div>
                <div className="value__box">
                  <div className="value">
                    <span>{item.nickname}</span>
                  </div>
                  <div
                    className="address__box"
                    style={{ height: `${addressCount * 30 - 4}px` }}
                  >
                    {getAddressArray(item.address)}
                  </div>
                  <div className="value">
                    <span className={`${item.voteOption}`}>
                      {item.voteOption.charAt(0).toUpperCase() +
                        item.voteOption.slice(1).toLowerCase()}
                    </span>
                  </div>
                  <div className="value">
                    <span className="value">{item.power}</span>
                  </div>
                </div>
              </div>
            </>
          );
        })
      )}
      {isFetching && (
        <div className="loading">
          <Image
            src="/assets/images/loading_papa.png"
            width={80}
            height={80}
            alt="papa"
          />
        </div>
      )}
    </ListStyle>
  );
}

const ListStyle = styled.div`
  .votes__box {
    margin-top: 12px;
    display: flex;
    padding: 16px;
    align-items: flex-start;
    border-radius: 12px;
    background: ${COLOR['WHITE__#FFFFFF']};
    box-shadow: 0px 7px 15px 0px rgba(0, 0, 0, 0.04);
    :first-of-type {
      margin-top: 0;
    }

    .name__box {
      display: flex;
      flex-direction: column;
      .name {
        display: block;
        height: 26px;
        margin-top: 12px;
        display: inline-block;
        color: ${COLOR['GRAY3__#929292']};
        font-size: 14px;
        font-weight: 400;
        text-transform: capitalize;
        line-height: 26px;

        :first-of-type {
          margin-top: 0;
        }
      }
    }
    .value__box {
      margin-left: 16px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      > div {
        /* height: 26px; */
        margin-top: 12px;
        :first-of-type {
          margin-top: 0;
        }
      }
      .value {
        color: ${COLOR['BLACK__#000000']};
        font-size: 16px;
        line-height: 26px;
        height: 26px;

        .AGREE {
          color: ${COLOR['TRUE__#16C71D']};
        }
        .DISAGREE {
          color: ${COLOR['ERROR__#EC1A26']};
        }
        .ABSTAIN {
          color: ${COLOR['GRAY3__#929292']};
        }
      }
      .address__box {
        display: flex;
        flex-direction: column;
        .address {
          margin-top: 4px;
          min-height: 26px;
          max-height: 26px;
          span {
            display: inline-block;
            margin-top: -2px;
            font-size: 16px;
            font-weight: 400;
            line-height: 26px;
            &.search__target {
              background-color: ${COLOR['YELLOW__#FFE400']};
              margin-left: -1px;
              padding-left: 1px;
              margin-right: -1px;
              padding-right: 1px;
            }
            &.copy {
              margin-left: 6px;
              cursor: pointer;
            }
          }
          :first-of-type {
            margin-top: 0;
          }
        }
      }
    }
  }
  .loading {
    margin-top: 12px;
    height: 80px;
    img {
      margin: auto;
    }
  }
`;
