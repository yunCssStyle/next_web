'use client';
import React, { useEffect, useRef, useState } from 'react';
import { DetailPageStyle } from './page.style';
import { SVG } from '@/svg';
import ButtonCustom from '@/components/ButtonCustom';
import Image from 'next/image';
import { voteOptionsType } from '@/query/type';
import Loading from '@/components/Loading';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DetailModal from '@/app/governance/_client/DetailModal';
import VoteConfirmModal from '@/app/governance/_client/VoteConfirmModal';
import Turnout from '@/components/governance/Turnout';
import QUERY_GOVERNANCE from '../_query';
import useGlobalStore from '@/store/globalStore';
import useGovernanceStore from '../_store';
import ScrollTo from '@/components/ScrollTo';

export default function GovernanceDetail(props: any) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [desHeight, setDesHeight] = useState<boolean>(false);
  const [desFullShow, setDesFullShow] = useState<boolean>(false);
  const { data: session } = useSession();
  const [voteOptionId, setVoteOptionId] = useState<number>();
  const [selectOption, setSelectOption] = useState<voteOptionsType['type']>();
  const [showDetail, setShowDetail] = useState(false);
  const [showConfirmVoteModal, setShowConfirmVoteModal] = useState(false);
  const router = useRouter();
  const { setSigninRedirectUrl } = useGlobalStore.getState();

  const { backPageId } = useGovernanceStore((state) => state);

  const { refetch, remove } = QUERY_GOVERNANCE.DETAIL_MODAL_LIST_INFINITY(
    props.page
  );

  const { fetchStatus, votesDetail, isLoading, refetchDetail } =
    QUERY_GOVERNANCE.DETAIL(props.page);

  const addComma = (price: Number) => {
    let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return returnString;
  };

  const desHeightAuto = () => {
    setDesFullShow((show) => !show);
  };
  const signClick = () => {
    router.push('/sign/signin');
    setSigninRedirectUrl(`/governance/${props.page}`);
  };

  const _onClickDetail = () => {
    // refetch();
    setShowDetail(true);
  };

  const _onClickVote = () => {
    setShowConfirmVoteModal(true);
  };

  useEffect(() => {
    if (anchorRef.current?.clientHeight)
      if (anchorRef.current?.clientHeight > 260) {
        setDesHeight(true);
      } else {
        setDesHeight(false);
      }
  }, []);

  useEffect(() => {
    refetchDetail();
    remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DetailPageStyle>
      <span
        className="back"
        onClick={() => {
          router.push(`/governance?page=${backPageId}`);
          window.scrollTo({ top: 500 });
        }}
      >
        <SVG.ICON.PAGEBACK />
      </span>
      <ScrollTo />
      {fetchStatus === 'fetching' && (
        <div className="loading_detail">
          <Loading sessionCheck={false} />
        </div>
      )}
      {votesDetail && (
        <>
          <h1>
            <span className="id">{votesDetail.vote.id}.</span>
            <span className="title">
              {votesDetail.vote.subject}
              <span className={`${votesDetail.vote.status.toLowerCase()}`}>
                {votesDetail.vote.status.charAt(0).toUpperCase() +
                  votesDetail.vote.status.slice(1).toLowerCase()}
              </span>
            </span>
          </h1>
          <div className="info_data">
            <dl>
              <dt>Proposed by</dt>
              <dd>MINE WARZ</dd>
            </dl>
            <dl>
              <dt>Snapshot</dt>
              <dd>{votesDetail.vote.snapshotDateTime} (UTC)</dd>
            </dl>
            <dl>
              <dt>Voting Period</dt>
              <dd>
                {votesDetail.vote.startDateTime} (UTC) ~{' '}
                {votesDetail.vote.endDateTime} (UTC)
              </dd>
            </dl>
          </div>
          <div
            ref={anchorRef}
            className={`description ${desHeight ? 'overflow' : ''} ${
              desFullShow ? 'show' : ''
            }`}
          >
            {votesDetail.vote.description}
          </div>
          {desHeight && (
            <div
              className={`show_more ${desFullShow ? 'show' : ''}`}
              onClick={desHeightAuto}
            >
              Show more
              <SVG.ICON.ICONSHOWMORE />
            </div>
          )}
          <div className="votes">
            <h2>Votes</h2>
            <Turnout
              voteOptions={votesDetail.vote.voteOptions}
              votedRate={votesDetail.vote.votedRate}
            />
            <ul className="votes_item">
              {votesDetail.vote.voteOptions.map((item, index) => {
                if (item.id !== null) {
                  return (
                    <li key={index}>
                      <label
                        className={`${item.type.toLowerCase()}`}
                        // onClick={() => setVoteOptionId(item.id)}
                      >
                        {votesDetail.mySelect !== null || session == null ? (
                          <input
                            type="radio"
                            name="vote"
                            value={`${item.type.toLowerCase()}`}
                            checked={votesDetail.mySelect === item.id}
                            disabled
                          />
                        ) : (
                          <>
                            <span className="voteOptionId">{voteOptionId}</span>
                            <input
                              type="radio"
                              name="vote"
                              value={`${item.type.toLowerCase()}`}
                              onChange={() => {
                                setSelectOption(item.type);
                                setVoteOptionId(item.id);
                              }}
                            />
                          </>
                        )}
                        <span className="label">
                          {item.type.charAt(0).toUpperCase() +
                            item.type.slice(1).toLowerCase()}
                        </span>
                        <span className="percent">
                          {item.rate > 0 ? item.rate.toFixed(1) : 0}% (
                          {addComma(item.optionPower)})
                        </span>
                        {item.rate > 0 && (
                          <span
                            className="bg"
                            style={{ width: `${item.rate}%` }}
                          ></span>
                        )}
                      </label>
                    </li>
                  );
                }
              })}
            </ul>
            <div className="sticky_btns">
              <div>
                {/* <div className="total">
                  <span>Total</span>
                  <span>
                    <b>{addComma(votesDetail.vote.totalPower)}</b> Votes
                  </span>
                </div> */}
                <div className="img" onClick={_onClickDetail}>
                  <span>
                    View Voting
                    <br />
                    Detail
                  </span>
                  <Image
                    src={'/assets/images/governance_btnimg.png'}
                    alt="loading"
                    width={104}
                    height={95}
                  />
                </div>
              </div>
            </div>
            {votesDetail.vote.status === 'ACTIVE' ? (
              session ? (
                votesDetail.myPower === 0 ? (
                  <ButtonCustom disabled>
                    <span>Ineligible to Vote</span>
                  </ButtonCustom>
                ) : (
                  <ButtonCustom
                    disabled={
                      voteOptionId === undefined ||
                      votesDetail.mySelect !== null
                    }
                    onClick={_onClickVote}
                  >
                    <span>
                      Cast Your Vote (<b>{votesDetail.myPower}</b> Voting Power)
                    </span>
                  </ButtonCustom>
                )
              ) : (
                <ButtonCustom onClick={signClick}>
                  <span>Sign in to Vote</span>
                </ButtonCustom>
              )
            ) : (
              votesDetail.vote.status !== 'UPCOMING' &&
              session &&
              (votesDetail.myPower === 0 ? (
                <ButtonCustom disabled>
                  <span>Vote Closed</span>
                </ButtonCustom>
              ) : (
                <ButtonCustom disabled>
                  <span>
                    Cast Votes (<b>{votesDetail.myPower}</b> Votes)
                  </span>
                </ButtonCustom>
              ))
            )}
          </div>
        </>
      )}

      <VoteConfirmModal
        voteId={props.page}
        optionId={voteOptionId}
        type={selectOption!}
        isOpen={showConfirmVoteModal}
        onClose={() => {
          setShowConfirmVoteModal(false);
        }}
        successCallback={() => {
          refetchDetail();
        }}
      />
      <DetailModal
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        voteId={props.page}
      />
    </DetailPageStyle>
  );
}
