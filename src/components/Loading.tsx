'ues client';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { CampLoadingStyle } from '../app/camp/_client/camp.style';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export type LoadingType = {
  sessionCheck?: boolean;
  marginTopAndBottom?: number;
};
export default function Loading(props: LoadingType) {
  const { sessionCheck = true, marginTopAndBottom } = props;
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    //sessionCheck가 true일 경우에만 session이 없으면 signin 페이지로 이동
    if (!session && sessionCheck) {
      router.push('/sign/signin');
    }
  }, [router, session, sessionCheck]);

  return (
    <CampLoadingStyle {...props}>
      <Image
        src={'/assets/images/loading_papa.png'}
        alt="loading"
        width={160}
        height={160}
        quality={75}
      />
      <span>Loading...</span>
    </CampLoadingStyle>
  );
}
