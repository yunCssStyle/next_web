import React, { useEffect, useRef, useState } from 'react';
import { SVG } from '@/svg';
import COLOR from '@/constants/COLOR';

import styled from '@emotion/styled';

interface DropdownProps {
  dropdownList: string[];
  selectedRewardDropdown: string;
  customBackground?: string;
  setSelectedRewardDropdown: (menu: string) => void;
}
interface DropdownStyleProps {
  customBackground?: string; // 추가
  isOpen?: boolean;
}

export default function Dropdown({
  dropdownList,
  selectedRewardDropdown,
  setSelectedRewardDropdown,
  customBackground
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const _onClick = (menu: string) => {
    setSelectedRewardDropdown(menu);
    setIsOpen(false);
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <DropdownStyle
      ref={dropdownRef}
      onClick={() => setIsOpen(!isOpen)}
      customBackground={customBackground}
      isOpen={isOpen}
    >
      <div className="selected">{selectedRewardDropdown}</div>

      <SVG.ICON.ARROW_UP2 />
      {isOpen && (
        <div className="menu">
          {dropdownList.map((menu, index) => {
            return (
              <div
                key={index}
                onClick={() => _onClick(menu)}
                className={`${
                  selectedRewardDropdown === menu ? 'selected' : ''
                } `}
              >
                <span>{menu}</span>
              </div>
            );
          })}
        </div>
      )}
    </DropdownStyle>
  );
}

export const DropdownStyle = styled.div<DropdownStyleProps>`
  position: relative;
  display: flex;
  width: 100%;
  height: 48px;
  padding: 0px 14px 0px 24px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid ${COLOR['GRAY5__#D2D2D2']};
  background: ${(props) =>
    props.customBackground || COLOR['GRAY8__#FAFAFA']}; // 수정
  color: ${COLOR['BLACK__#000000']};
  text-transform: capitalize;
  text-align: right;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  .selected {
    word-break: break-all;
    text-align: left;
  }
  svg {
    min-width: 24px;
    transform: ${(props) => (props.isOpen ? 'rotate(0deg)' : 'rotate(180deg)')};
  }
  :hover {
    cursor: pointer;
  }

  .menu {
    position: absolute;
    top: 64px;
    left: 0;
    padding: 16px 0px;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    border-radius: 12px;
    border: 1px solid ${COLOR['GRAY5__#D2D2D2']};
    background: ${COLOR['GRAY8__#FAFAFA']};
    color: var(--Gray-Scale-Black, #000);
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 20;
    max-height: 200px;

    div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 8px 24px;
      width: 100%;
      /* height: 50px; */
      min-height: 50px;
      font-size: 15px;
      font-style: normal;
      font-weight: 500;
      text-align: left;
      transition: 0.1s;

      span {
        line-height: 18px;
        padding-top: 1px;
        word-break: break-all;
      }
      svg {
        width: 20px;
        height: 20px;
        transform: rotate(0deg);
      }

      :hover {
        cursor: pointer;
        box-shadow: 0px 0px 16px 5px rgba(0, 0, 0, 0.03);
      }

      &.complete {
        color: ${COLOR['GRAY4__#B1B1B1']};
      }

      &.selected {
        color: ${COLOR['ORANGE__#FF570E']};
        svg {
          stroke: ${COLOR['ORANGE__#FF570E']};
        }
      }

      &.disabled {
        :hover {
          cursor: default;
          box-shadow: none;
        }
      }
    }
  }
`;
