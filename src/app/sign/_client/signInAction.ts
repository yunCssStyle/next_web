import { signIn, signOut } from 'next-auth/react';

export const signInAction = (
  type: 'apple' | 'google',
  status: 'authenticated' | 'loading' | 'unauthenticated'
) => {
  if (status === 'unauthenticated') {
    setTimeout(() => {
      switch (type) {
        case 'apple':
          signIn('apple');
          break;
        case 'google':
          signIn('google', { callbackUrl: '/' }, { prompt: 'select_account' });
          break;
        default:
          break;
      }
    }, 150);
  }
  if (status === 'authenticated') {
    window.close();
    return true;
  }
  return false;
};
