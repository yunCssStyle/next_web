import styled from '@emotion/styled';
import { Button } from '@mui/material';
import React from 'react';
import COLOR from '@/constants/COLOR';

interface Props {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}
export default function ButtonCustom({
  onClick,
  disabled = false,
  children
}: Props) {
  return (
    <ButtonCustomStyle onClick={onClick} disabled={disabled}>
      {children}
    </ButtonCustomStyle>
  );
}

const ButtonCustomStyle = styled(Button)`
  width: 100%;
  height: 60px;
  min-height: 60px;
  border-radius: 8px;
  background: ${COLOR['ORANGE__#FF570E']};
  color: ${COLOR['WHITE__#FFFFFF']};
  text-transform: none;
  span {
    white-space: normal;
    > span {
      display: inline-block;
      white-space: nowrap;
    }
  }
  :hover {
    background: ${COLOR['ORANGE__#FF570E']};
    color: ${COLOR['WHITE__#FFFFFF']};
  }

  :disabled {
    color: ${COLOR['GRAY4__#B1B1B1']};
    background-color: ${COLOR['GRAY6__#E7E7E7']};
  }
`;
