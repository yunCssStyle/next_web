import EmptyList from '@/components/EmptyList';
import RefreshButton from '@/components/RefreshButton';
import { MarketAndAddButtonsStyle } from '@/app/camp/_client/camp.style';
import { LINK } from '@/constants/link';
import { Button } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function EmptyListReset() {
  const router = useRouter();
  const pageParams = useSearchParams();
  const page = pageParams.get('page');
  const pageName = '/event/stat_reset?page=';
  const [isFetching, setIsFetching] = useState(false);

  const _onClickRefresh = () => {
    setIsFetching(true);
    setTimeout(() => {
      window.open(`${pageName}${page}`, '_self');
    }, 1000);
  };

  const _onClickGoToMarket = () => {
    window.open(LINK.MARKET, '_blank');
  };
  const _onClickCamp = () => {
    router.push('/camp/pioneer?page=1');
  };
  return (
    <>
      <div className="refresh">
        <RefreshButton isFetching={isFetching} onClick={_onClickRefresh} />
      </div>
      <EmptyList type="wallet" />
      <MarketAndAddButtonsStyle>
        <Button className="go" onClick={_onClickGoToMarket}>
          Go to Market
        </Button>
        <Button className="add" onClick={_onClickCamp}>
          Go to Camp
        </Button>
      </MarketAndAddButtonsStyle>
    </>
  );
}
