'use client';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

interface Props {
  text: string;
  subText?: string;
  onClick: () => void;
  selected?: boolean;
  forSign?: boolean;
}
export default function PageMenuButton(props: Props) {
  const { text, subText, onClick, selected = true, forSign } = props;

  const CampMenuButtonStyleProps = {
    selected
  };

  if (forSign)
    return (
      <ForSignMenuButtonStyle {...CampMenuButtonStyleProps} onClick={onClick}>
        {text} {subText && <span className="sub__text">({subText})</span>}
      </ForSignMenuButtonStyle>
    );

  return (
    <PageMenuButtonStyle {...CampMenuButtonStyleProps} onClick={onClick}>
      {text} {subText && <span className="sub__text">({subText})</span>}
    </PageMenuButtonStyle>
  );
}

interface PageMenuButtonStyleProps {
  selected: boolean;
}
export const PageMenuButtonStyle = styled.button<PageMenuButtonStyleProps>`
  position: relative;
  color: #b1b1b1;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  text-transform: capitalize;
  line-height: 160%; /* 28.8px */
  width: 100%;
  height: 80px;
  padding: 0 16px;
  border: none;
  outline: none;
  background-color: transparent;
  .sub__text {
    white-space: nowrap;
  }
  :hover {
    cursor: pointer;
  }

  ${(props) =>
    props.selected &&
    css`
      color: #ff570e;
      font-weight: 700;

      ::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: #ff570e;
      }
    `}
`;

export const ForSignMenuButtonStyle = styled.button<PageMenuButtonStyleProps>`
  position: relative;
  color: #b1b1b1;
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  text-transform: capitalize;
  line-height: 140%; /* 28.8px */
  height: 34px;
  border: none;
  outline: none;
  background-color: transparent;
  white-space: nowrap;
  .sub__text {
    white-space: nowrap;
  }
  :hover {
    cursor: pointer;
  }

  ${(props) =>
    props.selected &&
    css`
      color: #ff570e;
      font-weight: 700;
      ::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 100%;

        height: 3px;
        background-color: #ff570e;
      }
    `}
`;
