'use client';
import React from 'react';
import { ModalLayoutStyle } from './modal.style';
import ModalCustom from '../ModalCustom';
import { SVG } from '@/svg';
interface ModalLayoutProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  showCloseButton?: boolean;
  bgColor?: string;
  padding?: string;
  hideBackdrop?: boolean;
}
export default function ModalLayout(props: ModalLayoutProps) {
  const { children, title, isOpen, onClose, bgColor, padding, hideBackdrop } =
    props;

  return (
    <ModalCustom isOpen={isOpen} hideBackdrop={hideBackdrop}>
      <ModalLayoutStyle bgColor={bgColor} padding={padding}>
        <div className="modal">
          {title && <div className="title">{title}</div>}
          <div className="inner__container">{children}</div>
        </div>
        {onClose && (
          <div className="close" onClick={onClose}>
            <SVG.ICON.CLOSE />
          </div>
        )}
      </ModalLayoutStyle>
    </ModalCustom>
  );
}
