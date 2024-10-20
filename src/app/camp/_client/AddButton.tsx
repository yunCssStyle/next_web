import React from 'react';
import { AddButtonStyle } from './camp.style';
import Image from 'next/image';
import { Button } from '@mui/material';

interface AddButtonProps {
  onClick: () => void;
}
export default function AddButton({ onClick }: AddButtonProps) {
  return (
    // <></>
    <AddButtonStyle>
      <Button className="click__area" onClick={onClick} />
      <Image
        src="/assets/images/add_icon.png"
        alt="add"
        width={106}
        height={120}
      />
    </AddButtonStyle>
  );
}
