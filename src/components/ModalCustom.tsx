import { Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  hideBackdrop?: boolean;
}
export default function ModalCustom({
  isOpen,
  onClose,
  children,
  hideBackdrop
}: Props) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      hideBackdrop={hideBackdrop}
    >
      <>{children}</>
    </Modal>
  );
}
