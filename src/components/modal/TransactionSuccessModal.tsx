import CommonModal from '@/components/modal/CommonModal';
import COLOR from '@/constants/COLOR';
import { SVG } from '@/svg';
import { useRouter } from 'next/navigation';
import React from 'react';
import styled from '@emotion/styled';

interface IConvertSuccessModalProps {
  myHistoryUrl: string;
  onClose: () => void;
}
export default function TransactionSuccessModal(
  props: IConvertSuccessModalProps
): JSX.Element {
  const router = useRouter();
  const { onClose, myHistoryUrl } = props;

  //임시
  return (
    <CommonModal
      isOpen
      title="Success"
      imageName="papa_success"
      onClose={onClose}
      onClickButton={onClose}
      hideBackdrop
    >
      <ConvertSuccessModalStyle>
        <p>Transaction confirmed.</p>
        <p>
          Track the status of your transaction from your{' '}
          <strong onClick={() => router.push(myHistoryUrl)}>
            My History {SVG.ICON.SHORTCUT_CUSTOM(COLOR['ORANGE__#FF570E'])}
          </strong>
          page.
        </p>
        <p>
          It may take a few seconds for the latest transaction record to appear.
        </p>
      </ConvertSuccessModalStyle>
    </CommonModal>
  );
}

const ConvertSuccessModalStyle = styled.div`
  width: 100%;

  strong {
    display: inline-flex;
    cursor: pointer;
    color: ${COLOR['ORANGE__#FF570E']};
    word-break: keep-all;
    white-space: nowrap;
    background-color svg {
      background-color: red;
    }
  }
  p {
    font-size: 16px;
    line-height: 26px;
  }
  p:last-of-type {
    font-size: 14px;
    line-height: 22px;
    color: ${COLOR['GRAY3__#929292']};
  }
`;
