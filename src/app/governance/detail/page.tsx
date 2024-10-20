'use client';
import React, { useEffect, useRef, useState } from 'react';
import { DetailPageStyle } from './page.style';
import { SVG } from '@/svg';
import ButtonCustom from '@/components/ButtonCustom';
import Image from 'next/image';
import { voteOptionsType } from '@/query/type';
import Loading from '@/components/Loading';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import DetailModal from '@/app/governance/_client/DetailModal';
import VoteConfirmModal from '@/app/governance/_client/VoteConfirmModal';
import Turnout from '@/components/governance/Turnout';
import QUERY_GOVERNANCE from '../_query';
import useGlobalStore from '@/store/globalStore';
import useGovernanceStore from '../_store';
import ScrollTo from '@/components/ScrollTo';
import { stringUtil } from '@/util/strings';
import CommonModal from '@/components/modal/CommonModal';
import { scrollLock, scrollRelease } from '@/util/scrollLock';

export default function GovernanceDetail(props: any) {
  const router = useRouter();
  const pageParams = useSearchParams();
  const page = Number(pageParams.get('page'));
  const anchorRef = useRef<HTMLDivElement>(null);
  const [showMoreText, setShowMoreText] = useState<String>('Show more');
  const [desHeight, setDesHeight] = useState<boolean>(false);
  const [desFullShow, setDesFullShow] = useState<boolean>(false);
  const [selectCall, setSelectCall] = useState<boolean>(true);
  const { data: session } = useSession();
  const [voteOptionsId, setVoteOptionsId] = useState<number[]>([]);
  const [voteOptionId, setVoteOptionId] = useState<number>();
  const [selectOption, setSelectOption] = useState<voteOptionsType['type']>();

  const [showModal, setShowModal] = useState<showModalType>({
    isOpen: false,
    type: 'VOTE_CONFIRM'
  });

  const { setSigninRedirectUrl } = useGlobalStore.getState();

  const { backPageId } = useGovernanceStore((state) => state);

  const { refetch, remove } = QUERY_GOVERNANCE.DETAIL_MODAL_LIST_INFINITY(page);

  const { fetchStatus, votesDetail, isLoading, refetchDetail } =
    QUERY_GOVERNANCE.DETAIL(page);

  const desHeightAuto = () => {
    setDesFullShow((show) => !show);
    if (desFullShow) {
      setShowMoreText('Show more');
    } else {
      setShowMoreText('Show less');
    }
  };
  const signClick = () => {
    router.push('/sign/signin');
    setSigninRedirectUrl(`/governance/detail?page=${page}`);
  };

  const _onClickDetail = () => {
    if (page) {
      refetch();
      setShowModal({ isOpen: true, type: 'DETAIL' });
    }
  };

  const _onClickVote = () => {
    setShowModal({ isOpen: true, type: 'VOTE_CONFIRM' });
  };

  const clientHeight = () => {
    if (anchorRef.current?.clientHeight)
      if (anchorRef.current?.clientHeight > 260) {
        setDesHeight(true);
      } else {
        setDesHeight(false);
      }
  };

  useEffect(() => {
    setDesHeight(false);
    if (fetchStatus === 'idle') {
      if (votesDetail) {
        const options = votesDetail.vote.voteOptions
          .map((option) => option.id)
          .filter((id) => id !== null);
        setVoteOptionsId(options.filter((id) => id !== undefined) as number[]);
      }
      clientHeight();
    }
  }, [fetchStatus, votesDetail]);

  useEffect(() => {
    if (!page || isNaN(Number(page))) {
      router.push('/governance?page=1');
    } else {
      setDesHeight(false);
      refetch();
      refetchDetail();
      remove();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, router]);

  useEffect(() => {
    if (showModal.isOpen) {
      scrollLock();
    } else {
      scrollRelease();
    }
  }, [showModal.isOpen]);

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
              <dd>{votesDetail.vote.proposer}</dd>
            </dl>
            <dl>
              <dt>Record Time</dt>
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
            dangerouslySetInnerHTML={{
              __html: votesDetail.vote.description
            }}
          />
          {desHeight && (
            <div
              className={`show_more ${desFullShow ? 'show' : ''}`}
              onClick={desHeightAuto}
            >
              {showMoreText}
              <SVG.ICON.ICONSHOWMORE />
            </div>
          )}
          <div className="votes">
            <h2>Votes</h2>
            <Turnout
              voteOptions={votesDetail.vote.voteOptions}
              votedRate={votesDetail.vote.votedRate}
            />
            <ul
              className={`votes_item action${
                voteOptionId ? voteOptionsId.indexOf(voteOptionId) : ''
              } myaction${
                votesDetail.mySelect
                  ? voteOptionsId.indexOf(votesDetail.mySelect)
                  : ''
              }`}
            >
              {votesDetail.vote.voteOptions.map((item, index) => {
                if (item.id !== null) {
                  return (
                    <li key={index}>
                      <label
                        className={`${item.type.toLowerCase()} action${voteOptionId}`}
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
                                setSelectCall(false);
                              }}
                              disabled={
                                votesDetail.vote.status !== 'ACTIVE' ||
                                votesDetail.myPower === 0
                              }
                            />
                          </>
                        )}
                        <span className="label">
                          {item.type.charAt(0).toUpperCase() +
                            item.type.slice(1).toLowerCase()}
                        </span>
                        <span className="percent">
                          {item.rate > 0 ? item.rate.toFixed(1) : 0}% (
                          {stringUtil.addComma1000(item.optionPower)})
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
            {votesDetail.vote.status === 'ACTIVE' &&
              (session ? (
                votesDetail.myPower === 0 ? (
                  <ButtonCustom disabled>
                    <span>No Voting Power Available</span>
                  </ButtonCustom>
                ) : (
                  <ButtonCustom
                    disabled={
                      ((voteOptionId === undefined ||
                        votesDetail.mySelect !== null) &&
                        votesDetail.enabled) ||
                      selectCall
                    }
                    onClick={_onClickVote}
                  >
                    {votesDetail.mySelect !== null ? (
                      <span>
                        Cast Votes (<b>{votesDetail.myPower}</b> Votes)
                      </span>
                    ) : (
                      <span>
                        Cast Your Vote (<b>{votesDetail.myPower}</b> Voting
                        Power)
                      </span>
                    )}
                  </ButtonCustom>
                )
              ) : (
                <ButtonCustom onClick={signClick}>
                  <span>Sign in to Vote</span>
                </ButtonCustom>
              ))}
          </div>
        </>
      )}

      {/* Modal */}
      <VoteConfirmModal
        voteId={page}
        optionId={voteOptionId}
        type={selectOption!}
        isOpen={showModal.isOpen && showModal.type === 'VOTE_CONFIRM'}
        onClose={() => {
          setShowModal({ isOpen: false });
        }}
        successCallback={() => {
          refetchDetail();
          setShowModal({ isOpen: false });
        }}
        errorCallback={(clientCode: string) => {
          setShowModal({ isOpen: false });
          if (clientCode === 'VOTE_NOT_ACTIVE') {
            setShowModal({ isOpen: true, type: 'VOTE_CLOSED' });
            return;
          }
          if (clientCode === 'ALREADY_VOTED') {
            setShowModal({ isOpen: true, type: 'VOTE_ALREADY' });
            return;
          }
          router.push(`/error`);
        }}
      />

      <DetailModal
        isOpen={showModal.isOpen && showModal.type === 'DETAIL'}
        onClose={() => setShowModal({ isOpen: false })}
        voteId={page}
      />

      <CommonModal
        isOpen={showModal.isOpen && showModal.type === 'VOTE_CLOSED'}
        title="Voting Closed"
        imageName="kiki_speaker"
        buttonText="Close"
        onClickButton={() => {
          setShowModal({ isOpen: false });
          refetchDetail();
        }}
        onClose={() => {
          setShowModal({ isOpen: false });
        }}
      >
        The voting period has ended.
        <br />
        You cannot vote anymore.
      </CommonModal>

      <CommonModal
        isOpen={showModal.isOpen && showModal.type === 'VOTE_ALREADY'}
        title="Vote Already Cast"
        imageName="kiki_speaker"
        buttonText="Close"
        onClickButton={() => {
          setShowModal({ isOpen: false });
          refetchDetail();
        }}
        onClose={() => {
          setShowModal({ isOpen: false });
        }}
      >
        You have already voted.
        <br />
        You cannot vote anymore.
      </CommonModal>
    </DetailPageStyle>
  );
}

type showModalType = {
  isOpen: boolean;
  type?: 'VOTE_CONFIRM' | 'VOTE_CLOSED' | 'VOTE_ALREADY' | 'DETAIL';
};
