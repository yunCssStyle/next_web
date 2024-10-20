'use client';

import useGlobalStore from '@/store/globalStore';

export const scrollLock = () => {
  useGlobalStore.getState().setPositionY();

  const currentPositionY = window.scrollY;
  const body = document.querySelector('body');
  if (!body) return;
  body.style.overflow = 'hidden';
  body.style.position = 'fixed';
  body.style.top = `-${currentPositionY}px`;
  body.style.left = '0';
  body.style.right = '0';
};

export const scrollRelease = () => {
  const positionY = useGlobalStore.getState().positionY;
  const body = document.querySelector('body');
  if (!body) return;

  const timeout = setTimeout(() => {
    body.style.removeProperty('overflow');
    body.style.removeProperty('position');
    body.style.removeProperty('top');
    body.style.removeProperty('left');
    body.style.removeProperty('right');
    positionY === 0 || window.scrollTo(0, positionY);
    useGlobalStore.getState().setPositionY(0);
    clearTimeout(timeout);
  }, 50);
};
