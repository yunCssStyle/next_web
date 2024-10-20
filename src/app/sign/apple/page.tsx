'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { signInAction } from '../_client/signInAction';
import { useRouter } from 'next/navigation';
import FullWhiteBackground from '@/components/FullWhiteBackground';

export default function Apple() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (signInAction('apple', status)) {
      // router.push('/');
    }
  }, [router, status]);

  return (
    <FullWhiteBackground>
      Some browsers on Apple devices may cause login issues. Please try using a
      different browser.
    </FullWhiteBackground>
  );
}
