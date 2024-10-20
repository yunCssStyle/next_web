import useGlobalStore from '@/store/globalStore';
import React from 'react';
import { MiningRightInfoModalStyle } from '../../../components/modal/modal.style';
import QUERY_CUSTOM from '@/query';
import ButtonCustom from '../../../components/ButtonCustom';
import { SVG } from '@/svg';
import Image from 'next/image';
import useHavah from '@/hook/useHavah';
import { useSession } from 'next-auth/react';
import Axios from '@/axios/axios';
import { useAddressChangeDetection } from '@/hook/useAddressChangeDetection';
import useHavahStore from '@/store/havahStore';
import useCampStore from '../_store';
import { useRouter } from 'next/navigation';
import { set } from 'lodash';

export default function MiningRightInfoModal() {
  const { filterMiningRight, currentPageNumber } = useGlobalStore.getState();

  const { setShowCampModal, selectIndex, setSelectIndex, setOnClickOK } =
    useCampStore.getState();
  const index = selectIndex ?? 0;

  const { data: session } = useSession();
  const { data } = QUERY_CUSTOM.MINING_RIGHT_LOCK_UP_LIST_PAGE(
    currentPageNumber,
    !!session,
    filterMiningRight
  );
  const { userInfo } = QUERY_CUSTOM.USER_INFO();
  const { havahWalletInfo } = useHavahStore();

  const { currentWalletChecker } = useHavah();
  const { isWalletAddressChanged } = useAddressChangeDetection();

  const router = useRouter();
  const selectedData = data!.mines[index];
  if (!selectedData) {
    setShowCampModal(null);
    return;
  }

  const _onClickConvert = async () => {
    if (userInfo.user.otpEnable === false) {
      setShowCampModal(null);
      return router.push('/account-setting');
    }

    //! serverAPI block
    const currentWalletCheck = await currentWalletChecker('onlyEmptyAddress');

    if (havahWalletInfo?.isHavahConnected === false || !currentWalletCheck) {
      return setShowCampModal('connectWallet');
    }

    if (await isWalletAddressChanged()) {
      return setShowCampModal('checkHavahWallet');
    }

    await Axios.post('/camp/convert/export-confirmation', {
      mineId: selectedData.id
    })
      .then((res) => {
        const result = res.data as 'OK' | 'MAX_LEVEL_MINE_NOT_MINT';

        if (result === 'OK') {
          setShowCampModal('otp-valid');
        }
      })
      .catch((err) => {
        if (err.client_code === 'MAX_LEVEL_MINE_NOT_MINT') {
          setShowCampModal('conversionConfirmation');
          setSelectIndex(null);
          setOnClickOK(() => {
            setShowCampModal('otp-valid');
          });
        }
      });
  };

  return (
    <MiningRightInfoModalStyle>
      <div className="modal">
        <div className="inner__container">
          <div className="img">
            <Image
              src={`/assets/images/mining_right_lv${selectedData.level}.png`}
              alt=""
              width={172}
              height={172}
              quality={100}
            />
            <div className="label">Non-NFT</div>
          </div>
          {/* collection data로.. */}
          <div className="name">MiningRight</div>
          <div className="status">
            <span>Mining Power</span>
            <span>{selectedData.miningPower}</span>
          </div>
        </div>
        <div className="convert__button">
          <ButtonCustom onClick={_onClickConvert}>
            {userInfo.user.otpEnable
              ? 'Convert to NFT'
              : 'Set up 2-step verification to convert to NFT'}
          </ButtonCustom>
        </div>
      </div>
      <div className="close" onClick={() => setShowCampModal(null)}>
        <SVG.ICON.CLOSE />
      </div>
    </MiningRightInfoModalStyle>
  );
}
