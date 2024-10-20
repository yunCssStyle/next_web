import COLOR from '@/constants/COLOR';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState } from 'react';

interface CheckBoxProps {
  type?: 'rect' | 'circle';

  isChecked?: boolean;
  disabled?: boolean;
}

export default function CheckBox({
  type = 'rect',
  isChecked = false,
  disabled = false
}: CheckBoxProps) {
  const _onClickCheckBox = () => {
    // setIsChecked(!isChecked);
    // if (isChecked) {
    //   onClickChecked();
    // } else {
    //   onClickUnChecked();
    // }
  };

  return (
    <CheckBoxStyle
      isChecked={isChecked}
      type={type}
      disabled={disabled}
      onClick={_onClickCheckBox}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M17 8L11 16L7 12.5"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </CheckBoxStyle>
  );
}

const CheckBoxStyle = styled.div<CheckBoxProps>`
  box-sizing: border-box;
  max-width: 24px;
  max-height: 24px;
  min-width: 24px;
  min-height: 24px;
  border-radius: ${({ type }) => (type === 'circle' ? '50%' : '4px')};
  border: 1px solid ${COLOR['GRAY5__#D2D2D2']};
  background: ${({ disabled }) =>
    disabled ? COLOR['GRAY7__#F1F1F1'] : 'transparent'};

  transition: 0.1s;

  svg {
    display: none;
    min-width: 24px;
    min-height: 24px;
  }

  :hover {
    cursor: pointer;
  }

  /*  */
  ${({ isChecked }) => {
    if (isChecked) {
      return css`
        border: none;
        background: ${COLOR['ORANGE__#FF570E']};
        svg {
          display: block;
        }
      `;
    }
  }}
`;
