'use client';
import React, { use, useEffect } from 'react';
import QUERY_CUSTOM from '@/query';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
import useGlobalStore from '@/store/globalStore';
import { useSession } from 'next-auth/react';
import { CampPageStyle } from './page.style';

export default function Camp() {
  const { filterPioneer } = useGlobalStore((state) => state);
  const { status } = useSession();

  const { data, isLoading } = QUERY_CUSTOM.PIONEER_VERIFIED_LIST_PAGE(
    1,
    status === 'authenticated',
    filterPioneer
  );

  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      (data?.total ?? 0) > 0
        ? router.push('/camp/pioneer?page=1')
        : router.push('/camp/miningright?page=1');
    }
  }, [data, isLoading, router]);

  // camp page 상태
  // todo 하던중 docker 켜는거 까먹지 말기  ₩
  // select modal오픈 상태에서 지갑이 변경된후 클레임버튼 클릭시 지갑 변경안내모달 오픈
  // 모달오픈 상태에서만 지갑 변경 상태 변경되도록해야함.
  // miningright export 시 지갑이 변경되면 클레임 버튼 누르면 지갑 변경 안내 모달 오픈

  //1. camp, tradingpost modal state show 될때마다 지갑 변경상태 false로 변경
  //2. camp, tradingpost modal 이 open 상태일 경우에 지갑응ㄹ 변경하면 지갑 변경 상태 true로 변경
  //3. 지갑 변경 상태가 true일 경우에는 특정액션실행시 지갑 변경 안내 모달 오픈
  //4. 해당 액션은 export 모달 claim 버튼액션, pioneer claim 버튼 액션, miningright claim 버튼 액션, tradingpost Strike riches 버튼 액션, 메일인증 confirm 버튼

  return (
    <CampPageStyle>
      {/* 상단 마진용 div */}
      <div className="refresh__box"></div>
      <Loading />
    </CampPageStyle>
  );
}
