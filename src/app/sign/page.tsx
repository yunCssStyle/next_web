'use client';
import React, { useEffect } from 'react';
import SignIn from './_client/page';
import { usePathname, useRouter } from 'next/navigation';

export default function Sign() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/sign') {
      router.push('/sign/signin');
    }
  }, [pathname, router]);

  return <SignIn />;
}
