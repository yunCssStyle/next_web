'use client';
import Loading from '@/components/Loading';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import React, { useEffect } from 'react';

export default function History() {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/history/convert?page=1');
    }
  }, [router, status]);
  return <Loading />;
}
