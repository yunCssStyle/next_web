'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { SignPageStyle } from './page.style';
import useGlobalStore from '@/store/globalStore';
import NotificationAndTooltip from '@/components/sign/notificationAndTooltip';
import { popupCenter } from '@/util/popupCenter';
import { localStateHandler } from '@/util/localStateHandler';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LINK } from '@/constants/link';

type SignPageProps = {
  type?: 'signin' | 'signup';
};

let a = 'ttt';
export default function SignIn(
  { type = 'signin' }: SignPageProps = { type: 'signin' }
) {
  const { setSignLayoutSelected, signinRedirectUrl } = useGlobalStore();
  const { status } = useSession();
  const router = useRouter();
  const [clickBlock, setClickBlock] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(signinRedirectUrl);
    }
  }, [router, signinRedirectUrl, status]);

  useEffect(() => {
    setSignLayoutSelected(type);
  }, [setSignLayoutSelected, type]);

  const _preClick = () => {
    if (clickBlock) return true;
    setClickBlock(
      setTimeout(() => {
        setClickBlock(null);
      }, 1000)
    );
    return false;
  };

  const _onClickGoogle = () => {
    if (_preClick()) return;
    localStateHandler.errorDescription.reset();
    popupCenter('/sign/google');
  };

  const _onClickApple = () => {
    if (_preClick()) return;
    localStateHandler.errorDescription.reset();
    popupCenter('/sign/apple');
  };

  return (
    <>
      <SignPageStyle>
        {type === 'signin' ? (
          <>
            <h3>Ready to saddle up and ride off into the sunset?</h3>
            <h5>
              Please enter your verification information to access your account.
            </h5>
            <Image
              className="bg__image"
              src="/assets/images/signin_img.png"
              alt=""
              width={328}
              height={240}
            />
          </>
        ) : (
          <>
            <h3>MINE WARZ, register to begin your quest for gold!</h3>
            <h5>Please create an account to proceed.</h5>
            <Image
              className="bg__image"
              src="/assets/images/signup_img.png"
              alt=""
              width={328}
              height={240}
            />
          </>
        )}
        <Image
          className="apple button"
          onClick={_onClickApple}
          src="/assets/images/apple_button.png"
          alt=""
          width={288}
          height={50}
        />
        <Image
          className="google button"
          onClick={_onClickGoogle}
          src="/assets/images/google_button.png"
          alt=""
          width={288}
          height={50}
        />{' '}
        {type === 'signup' && (
          <p className="terms">
            By proceeding, you agree to MINE WARZ’s
            <br />
            <a href={LINK.TERMS_OF_USE} target="_blank">
              Terms of Use
            </a>{' '}
            &{' '}
            <a href={LINK.PRIVACY_POLICY} target="_blank">
              Privacy Policy.
            </a>
          </p>
        )}
      </SignPageStyle>
    </>
  );
}
