import React from 'react';
import { HistoryBoxStyle } from './history.style';
import { historyConvertsType } from '@/query/type';
import { thousandsSeparator, walletAddressShortener } from '@/util/converter';
import { LINK } from '@/constants/link';
import { SVG } from '@/svg';

interface IHistoryBox {
  info: historyConvertsType['converts'][0];
  className?: string;
}

export default function HistoryConvertBox({ info, className }: IHistoryBox) {
  return (
    <HistoryBoxStyle className={`${className} ${info.status}`}>
      <div className="top">
        <span className="small">No. {info.no}</span>
        <span className="small date">
          {info.time} (UTC)
          <span onClick={() => window.open(info.url, '_blank')}>
            <SVG.ICON.SHORTCUT_16X16 />
          </span>
        </span>
      </div>

      <div>
        <span className="small">from</span>
        <span className={`token ${info.type === 'GOLD' ? 'gold' : 'mzt'}`}>
          {info.type === 'GOLD' ? 'Gold' : 'MZT'}
        </span>
        <span className="large">{thousandsSeparator(info.fromAmount)}</span>
      </div>

      <div>
        <span className="small">to</span>
        <span className={`token ${info.type === 'GOLD' ? 'mzt' : 'gold'}`}>
          {info.type === 'GOLD' ? 'MZT' : 'Gold'}
        </span>
        <span className="large">{thousandsSeparator(info.toAmount)}</span>
      </div>

      <div>
        <span className="small">Status</span>
        <span className="large status">
          {info.status.toLocaleLowerCase()}
          {info.status === 'PROCESSING' && '...'}
        </span>
        {info.status === 'FAILED' && (
          <span className="failed__info">
            Please submit a ticket on{' '}
            <a href={LINK.DISCORD_HELP} target="_blank">
              Discord.
            </a>
          </span>
        )}
      </div>
      <div>
        <span className="small">Address</span>
        <span className="large">
          {' '}
          {walletAddressShortener(info.address, 6, 4)}
        </span>
      </div>
    </HistoryBoxStyle>
  );
}
