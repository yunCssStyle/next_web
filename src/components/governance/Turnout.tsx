'use client';
import React from 'react';
import { TurnoutDataStyle } from './governance.style';
import { voteOptionsType } from '@/query/type';

type TurnoutProps = {
  votedRate?: number;
  voteOptions: voteOptionsType[];
};

export default function Turnout(props: TurnoutProps) {
  const { votedRate, voteOptions } = props;
  return (
    <TurnoutDataStyle
      className={`turnout_data ${votedRate != null && 'detail'}`}
    >
      {votedRate != null && (
        <span className="voted">
          {votedRate! > 0 ? votedRate!.toFixed(1) : 0}% Voted
        </span>
      )}
      <div className={`chart`}>
        {voteOptions.map((item, index) => {
          if (item.id !== null) {
            return (
              <span
                className={`${item.type.toLowerCase()}`}
                style={{ width: `${item.rate}%` }}
                key={index}
              ></span>
            );
          }
        })}
      </div>
      {votedRate != null && (
        <span className="quorum" style={{ left: `33.3%` }}>
          Quorum : 33.3% of Votes
        </span>
      )}
    </TurnoutDataStyle>
  );
}
