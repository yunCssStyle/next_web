import { LINK } from '@/constants/link';
import { Button } from '@mui/material';
import React from 'react';
import { MarketAndAddButtonsStyle } from './camp.style';

type MarketAndAddButtonsType = {
  type: 'pioneer' | 'miningright';
  onClickAdd: () => void;
};
export default function MarketAndAddButtons(props: MarketAndAddButtonsType) {
  const { type, onClickAdd } = props;
  const _onClickGoToMarket = () => {
    window.open(LINK.MARKET, '_blank');
  };

  return (
    <MarketAndAddButtonsStyle>
      <Button className="go" onClick={_onClickGoToMarket}>
        Go to Market
      </Button>
      <Button className="add" onClick={onClickAdd}>
        {type === 'pioneer' ? 'Add Pioneer' : 'Add Mining Right'}
      </Button>
    </MarketAndAddButtonsStyle>
  );
}
