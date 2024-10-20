'use client';
import PageMenuButton from '@/components/PageMenuButton';
import React from 'react';
import { SignLayoutStyle } from './layout.style';
import { useRouter } from 'next/navigation';
import useGlobalStore from '@/store/globalStore';

export default function SignLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const { signLayoutSelected, setSignLayoutSelected } = useGlobalStore();

  const _onClickSignin = () => {
    router.push('/sign/signin');
    setSignLayoutSelected('signin');
  };

  const _onClickSignup = () => {
    router.push('/sign/signup');
    setSignLayoutSelected('signup');
  };

  return (
    <SignLayoutStyle>
      <div className="menu">
        <PageMenuButton
          text="Sign In"
          onClick={_onClickSignin}
          selected={signLayoutSelected === 'signin'}
          forSign
        />
        <div className="gap" />
        <PageMenuButton
          text="Sign Up"
          onClick={_onClickSignup}
          selected={signLayoutSelected === 'signup'}
          forSign
        />
      </div>
      <div>{children}</div>
    </SignLayoutStyle>
  );
}
