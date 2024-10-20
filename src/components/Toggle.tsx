import COLOR from '@/constants/COLOR';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

interface ToggleProps {
  isOn: boolean;
  onToggle?: (isOn: boolean) => void;
}

export default function Toggle({ isOn, onToggle }: ToggleProps) {
  const [isToggle, setIsToggle] = useState(true);
  const [isOnToggle, setIsOnToggle] = useState(false);
  const _onClickToggle = () => {
    if (!isToggle) return;
    setIsToggle(false);
    setIsOnToggle(!isOnToggle);
    const timeout = setTimeout(() => {
      setIsToggle(true);
      clearTimeout(timeout);
    }, 700);
    onToggle && onToggle(!isOn);
  };

  useEffect(() => {
    setIsOnToggle(isOn);
  }, [isOn]);

  return (
    <ToggleStyle onClick={_onClickToggle} isOn={isOnToggle}>
      <span className="toggle__button" />
    </ToggleStyle>
  );
}

const ToggleStyle = styled.div<{ isOn: boolean }>`
  display: flex;
  max-width: 56px;
  min-width: 56px;
  max-height: 32px;
  min-height: 32px;
  padding: 4px;
  align-items: center;
  border-radius: 30px;
  background: ${COLOR['GRAY6__#E7E7E7']};
  transition: 0.2s;
  :hover {
    cursor: pointer;
  }
  .toggle__button {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: ${COLOR['WHITE__#FFFFFF']};
    filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2));
    transition: 0.2s;
  }

  ${({ isOn }) =>
    isOn &&
    css`
      background-color: ${COLOR['ORANGE__#FF570E']};
      .toggle__button {
        margin-left: 24px;
      }
    `}
`;
