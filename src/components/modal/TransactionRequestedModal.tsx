import CommonModal from '@/components/modal/CommonModal';
import COLOR from '@/constants/COLOR';
import { SVG } from '@/svg';
import { useRouter } from 'next/navigation';
import React from 'react';
import styled from '@emotion/styled';
import useGlobalStore from '@/store/globalStore';

interface IConvertSuccessModalProps {
  myHistoryUrl: string;
  onClose: () => void;
}
export default function TransactionRequestedModal(
  props: IConvertSuccessModalProps
): JSX.Element {
  const router = useRouter();
  const { onClose, myHistoryUrl } = props;

  //임시
  return (
    <CommonModal
      isOpen
      title="Transaction Requested"
      imageName="papa_success"
      onClose={onClose}
      onClickButton={onClose}
      hideBackdrop
    >
      <ConvertSuccessModalStyle>
        <p>Your transaction request is being processed.</p>
        <p>
          Track the status of your transaction from your{' '}
          <strong onClick={() => router.push(myHistoryUrl)}>
            My History <SVG.ICON.SHORTCUT_16X16 />
          </strong>
          page.
        </p>
      </ConvertSuccessModalStyle>
    </CommonModal>
  );
}

const ConvertSuccessModalStyle = styled.div`
  width: 100%;

  p:last-of-type {
    font-size: 14px;
    font-weight: 400;
    color: ${COLOR['GRAY3__#929292']};
    strong {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
      color: ${COLOR['ORANGE__#FF570E']};
      word-break: keep-all;
      white-space: nowrap;
      font-weight: 700;
      svg {
        fill: ${COLOR['ORANGE__#FF570E']};
        margin-bottom: 2px;
      }
    }
  }
`;
