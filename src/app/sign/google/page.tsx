'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { signInAction } from '../_client/signInAction';
import { useRouter } from 'next/navigation';
import FullWhiteBackground from '@/components/FullWhiteBackground';

export default function Google() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (signInAction('google', status)) {
      // router.push('/');
    }
  }, [router, status]);

  return (
    <FullWhiteBackground>
      Login failed.
      <br /> Please try the following solutions:
      <br />
      1. Check if your internet connection is stable.
      <br /> 2. Use a different browser.
      <br /> 3. Reboot your device.
    </FullWhiteBackground>
  );
}
