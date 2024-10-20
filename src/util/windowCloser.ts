'use client';

export const windowCloser = () => {
  if (window?.location.href.split('&').at(-1) === 'error=OAuthCallback') {
    // login success, error
    window?.close();
  }
};
