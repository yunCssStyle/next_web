import React, { useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { SVG } from '@/svg';
import PfpsStatsModal from '@/components/modal/PfpsStatsModal';
import ModalCustom from '@/components/ModalCustom';

interface Props {
  showModal: boolean;
  setShowModal: (isShow: boolean) => void;
}
export default function MiningRightPfpStats({
  showModal,
  setShowModal
}: Props) {
  const [isShow, setIsShow] = useState(true);

  if (!isShow) return null;
  return (
    <DivStyle>
      <Image
        onClick={() => setShowModal(true)}
        src={'/assets/images/mining_right_pfp_stats.png'}
        width={160}
        height={160}
        alt="check a PFP's stats"
      />
      <button onClick={() => setIsShow(false)}>
        <SVG.ICON.CLOSE2 />
      </button>
      <ModalCustom isOpen={showModal}>
        <PfpsStatsModal onClose={() => setShowModal(false)} />
      </ModalCustom>
    </DivStyle>
  );
}

const DivStyle = styled.div`
  position: relative;
  display: inline-block;
  img {
    transition: 0.1s;
    :hover {
      cursor: pointer;
      scale: 1.05;
    }
    :active {
      scale: 0.95;
    }
  }
  button {
    width: 24px;
    height: 24px;
    position: absolute;
    bottom: 9px;
    right: 40px;
    border: none;
    outline: none;
    background-color: transparent;
    :hover {
      cursor: pointer;
    }
  }
`;
