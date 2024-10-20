'use client';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { SVG } from '@/svg';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function MiningRightPfpStatsReset() {
  const [isShow, setIsShow] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    setIsShow(true);
  }, []);

  const _onClick = async () => {
    if (status === 'unauthenticated') {
      router.push('/sign/signin');
      return;
    }
    router.push('/event/stat_reset?page=1');
  };

  if (!isShow) return null;
  return (
    <DivStyle>
      <Image
        onClick={_onClick}
        src={'/assets/images/mining_right_pfp_statsreset.png'}
        width={160}
        height={160}
        alt="check a PFP's stats"
      />
      <button onClick={() => setIsShow(false)}>
        <SVG.ICON.CLOSE2 />
      </button>
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
