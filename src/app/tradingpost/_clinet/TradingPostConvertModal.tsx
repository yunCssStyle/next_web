import React, { useState } from 'react';
import { SVG } from '@/svg';
import ButtonCustom from '../../../components/ButtonCustom';
import { thousandsSeparator } from '@/util/converter';
import useGlobalStore from '@/store/globalStore';
import useHavah from '@/hook/useHavah';
import QUERY_CUSTOM from '@/query';
import { Button } from '@mui/material';
import useHavahStore from '@/store/havahStore';
import _ from 'lodash';
import { useAddressChangeDetection } from '@/hook/useAddressChangeDetection';
import { TokenComponentStyle, TradingPostCovertAssetModalStyle } from './style';
import CommonModal from '@/components/modal/CommonModal';
import COLOR from '@/constants/COLOR';
import { useRouter } from 'next/navigation';
import useTradingPostStore from '../_store';
import Axios from '@/axios/axios';

export default function TradingPostConvertModal() {
  const { setConvertToMZT } = useGlobalStore();

  const { setShowTradingPostModal } = useTradingPostStore();

  const [selectFromToken, setSelectFromToken] = useState<'mzt' | 'gold'>('mzt');
  const { covertMZTToGold } = useHavah();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [fromAmount, setFromAmount] = useState({ number: 0, string: '0' });
  const [disableButton, setDisableButton] = useState(false);
  const { balanceOfMZT } = useHavahStore();
  const { isWalletAddressChanged } = useAddressChangeDetection();
  const { data } = QUERY_CUSTOM.TRADING_POST_RULES();
  const { userInfo } = QUERY_CUSTOM.USER_INFO();
  const totalAmount = {
    mzt: balanceOfMZT,
    gold: QUERY_CUSTOM.USER_INFO().userInfo?.user?.gold ?? 0
  };

  const router = useRouter();
  // --- calculate / rules

  const feeRatio =
    selectFromToken === 'mzt' ? data?.mztToGold ?? 0 : data?.goldToMzt ?? 0;

  const availableAmount = _.floor(totalAmount[selectFromToken], 6);

  const conversionRate = data?.conversionRate ?? 0;

  const toAmount =
    selectFromToken === 'mzt'
      ? _.round(fromAmount.number * conversionRate, 6)
      : _.round(fromAmount.number / conversionRate, 7); // 변환될 금액

  const fee =
    selectFromToken === 'mzt'
      ? _.round(fromAmount.number * feeRatio, 6)
      : _.round(toAmount * feeRatio, 6); // 수수료

  const minimumConvertAsset: number =
    selectFromToken === 'gold' ? data?.minimumGold ?? 0 : data?.minimumMZT ?? 0;
  // --- end calculate / rules

  const convertorStringToNumber = (integer: string, decimal: string) => {
    const conversionNumber = Number(
      decimal ? `${integer}.${decimal}` : integer
    );
    return conversionNumber;
  };

  const divideInputNumber = (value: string) => {
    const hasDot = value.includes('.');
    const integer = value.toString().split('.')[0].replace(/,/g, '');
    const decimal = value.toString().split('.')[1];
    return { hasDot, integer, decimal };
  };

  const _onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 소수점 구분
    const { hasDot, integer, decimal } = divideInputNumber(value);

    if (decimal?.length > 6) return;
    //availableAmount 보다 큰수는 입력할 수 없다.

    const conversionNumber = convertorStringToNumber(integer, decimal);

    if (conversionNumber > availableAmount) {
      const value = availableAmount.toString();
      const { integer, decimal } = divideInputNumber(value);

      const converted = decimal
        ? `${thousandsSeparator(Number(integer), 0)}.${decimal.slice(0, 6)}`
        : `${thousandsSeparator(Number(integer), 0)}`;

      const conversionNumber = convertorStringToNumber(integer, decimal);

      return setFromAmount({
        number: Number(conversionNumber),
        string: converted
      });
    }

    if (isNaN(Number(integer))) return;
    if (decimal && isNaN(Number(decimal))) return;

    const converted = decimal
      ? `${thousandsSeparator(Number(integer), 0)}.${decimal.slice(0, 6)}`
      : `${thousandsSeparator(Number(integer), 0)}${hasDot ? '.' : ''}`;

    setFromAmount({ number: conversionNumber, string: converted });
  };

  const _onClickDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const _onClickToken = (type: 'mzt' | 'gold') => {
    if (type === 'gold' && userInfo?.user?.otpEnable === false) {
      return router.push('/account-setting');
    }

    setSelectFromToken(type);
    setOpenDropdown(false);
    setFromAmount({ number: 0, string: '0' });
  };

  const _onClickStrikeRich = async () => {
    setDisableButton(true);
    if (await isWalletAddressChanged()) {
      return setShowTradingPostModal('checkHavahWallet');
    }

    let limitCheck = false;
    await Axios.get('/tradingpost/withdraw/limit', {
      params: {
        gold: fromAmount.number
      }
    })
      .then((res) => {
        const result = res.data as {
          member: boolean;
          system: boolean;
        };
        if (result.member === false) {
          setShowTradingPostModal('memberWithdrawLimit');
          limitCheck = true;
          return;
        }
        if (result.system === false) {
          setShowTradingPostModal('systemWithdrawLimit');
          limitCheck = true;
          return;
        }
      })
      .catch(() => {
        //todo error 처리 필요
      });

    if (limitCheck) return;

    setShowTradingPostModal('converting');

    if (selectFromToken === 'gold') {
      //인증 받은적이 있으면 바로 변환

      setConvertToMZT({ amount: fromAmount.number, fee });
      setShowTradingPostModal('otpValid');
      return;
    }

    if (selectFromToken === 'mzt') {
      covertMZTToGold(fromAmount.number);
    }
  };

  const _onClickAll = () => {
    //availableAmount는 소수점 6자리에서 내림한다.
    setFromAmount({
      number: availableAmount,
      string: thousandsSeparator(availableAmount, 6, true)
    });
  };

  const isEnoughConvertAsset = minimumConvertAsset <= fromAmount.number;
  return (
    <CommonModal
      isOpen
      bgColor={COLOR['GRAY8__#FAFAFA']}
      onClose={() => setShowTradingPostModal(null)}
      hideBackdrop
    >
      <TradingPostCovertAssetModalStyle>
        <div className="title">Convert asset</div>
        <div className="token__box from">
          <h5>From</h5>
          <div
            className="dropdown__button" //
            onClick={_onClickDropdown}
          >
            <TokenComponent type={selectFromToken} />
            <div className={`arrow ${openDropdown ? 'open' : ''}`}>
              <SVG.ICON.ARROW_UP2 />
            </div>
          </div>
          <input
            className="amount"
            type="text"
            value={fromAmount.string}
            onChange={_onChangeAmount}
          />
          <div className="all__available">
            <Button className="all" onClick={_onClickAll}>
              All
            </Button>
            <div className="available">
              <span>{`Available : ${thousandsSeparator(
                availableAmount,
                6,
                true
              )}`}</span>
            </div>
          </div>
          {/* dropdown */}
          <div className={`dropdown ${openDropdown ? 'open' : ''}`}>
            <div
              className={`menu ${selectFromToken === 'mzt' ? 'selected' : ''}`} //
              onClick={() => _onClickToken('mzt')}
            >
              <TokenComponent type="mzt" selected={selectFromToken === 'mzt'} />
              <div className="amount">
                {thousandsSeparator(totalAmount.mzt, 6, true)}
              </div>
            </div>

            <div
              className={`menu ${selectFromToken === 'gold' ? 'selected' : ''}`} //
              onClick={() => _onClickToken('gold')}
            >
              <TokenComponent
                type="gold"
                selected={selectFromToken === 'gold'}
              />
              <div className="amount">
                {userInfo?.user?.otpEnable === false && (
                  <div className="error">
                    Set up 2-step verification to convert Gold to MZT.
                  </div>
                )}
                {thousandsSeparator(totalAmount.gold, 6, true)}
              </div>
            </div>
          </div>
          {/* end dropdown */}
        </div>
        <div className="arrow__down">
          <SVG.ICON.ARROW_DOWN />
        </div>
        <div className="token__box to">
          <h5>To</h5>
          <TokenComponent type={selectFromToken === 'mzt' ? 'gold' : 'mzt'} />
          <div className="amount">
            <span>{thousandsSeparator(toAmount, 7, true)}</span>
          </div>
        </div>

        <div className="fee__box">
          <div className={`minimum ${!isEnoughConvertAsset && 'not__enough'}`}>
            <span>Minimum Convert Asset</span>
            <span>
              <strong>
                {thousandsSeparator(minimumConvertAsset, 6, true)}
                {selectFromToken === 'mzt' ? ' MZT' : ' Gold'}
              </strong>
            </span>
          </div>
          <div className="fee">
            <span>Fee</span>
            <span>
              {`(${feeRatio * 100}%)`}
              <strong> {thousandsSeparator(fee, 6, true)} MZT</strong>
            </span>
          </div>
        </div>
        <div className="notification">
          <SVG.ICON.EXCLAMATION />
          <span>
            Fees will be automatically deducted from the actual amount paid.
          </span>
        </div>
        <div className="button">
          <ButtonCustom
            onClick={_onClickStrikeRich}
            disabled={isEnoughConvertAsset && !disableButton ? false : true}
          >
            Strike riches!
          </ButtonCustom>
        </div>
      </TradingPostCovertAssetModalStyle>
    </CommonModal>
  );
}

type TokenComponentProps = {
  type?: 'mzt' | 'gold';
  selected?: boolean;
};

const TokenComponent = ({
  type = 'mzt',
  selected = false
}: TokenComponentProps) => {
  return (
    <TokenComponentStyle selected={selected}>
      {type === 'mzt' ? <SVG.ICON.MZT24 /> : <SVG.ICON.GOLD />}
      <span className="type">{type === 'mzt' ? 'MZT' : 'Gold'}</span>
      <span className="selected">{<SVG.ICON.CHECK />}</span>
    </TokenComponentStyle>
  );
};
