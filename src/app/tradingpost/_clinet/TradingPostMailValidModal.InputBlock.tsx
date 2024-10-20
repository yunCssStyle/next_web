import { useRef } from 'react';
import styled from '@emotion/styled';
import COLOR from '@/constants/COLOR';

interface IInputBlock {
  className?: string;
  item: string;
  index: number;
  codeArr: string[];
  disabled?: boolean;
  onChange: (code: string[]) => void;
}
const InputBlock = (props: IInputBlock) => {
  const { className, item, index, codeArr, onChange, disabled } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const value = codeArr[index];

  const setValue = (value: string, position: number = 0) => {
    const nextCodeArr = [...codeArr];
    nextCodeArr[index + position] = value;
    onChange(nextCodeArr);
  };

  const nextInput = inputRef.current?.nextElementSibling as HTMLInputElement;
  const previousInput = inputRef.current
    ?.previousElementSibling as HTMLInputElement;

  const _onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const clipboardData = e.clipboardData;
    const text = clipboardData.getData('text/plain');

    if (isNaN(Number(text))) return;

    const valueArr = text.split('');
    const nextCodeArr = [...codeArr];

    valueArr.map((e, i) => {
      const plusIndex = inputRef.current?.selectionStart === 0 ? 0 : 1;
      nextCodeArr.splice(index + i + plusIndex, 1, e);
    });

    onChange(nextCodeArr.slice(0, 6));
  };

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (isNaN(Number(value))) return;

    if (String(value).length > 1) {
      //커서 위치에 따른 분기처리
      if (nextInput && inputRef.current?.selectionStart === 2) {
        setValue(value[1], +1);
        nextInput.focus();
      }

      if (inputRef.current?.selectionStart === 1) {
        setValue(value[0]);
      }
      return;
    }

    setValue(value);
  };

  const _onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'arrowRight' || e.key === 'ArrowRight') && nextInput) {
      if (
        // index === 0 &&
        inputRef.current?.selectionStart === 0 &&
        value !== ''
      ) {
        inputRef.current?.setSelectionRange(1, 1);
      } else {
        nextInput.focus();
      }
    }

    if ((e.key === 'arrowLeft' || e.key === 'ArrowLeft') && previousInput) {
      if (
        // codeArr.length - 1 === index &&
        inputRef.current?.selectionStart === 1
      ) {
        inputRef.current?.setSelectionRange(0, 0);
      } else {
        previousInput.focus();
      }
    }

    if (e.key === 'Backspace' && previousInput) {
      if (inputRef.current?.selectionStart === 1) {
        const nextCodeArr = [...codeArr];
        nextCodeArr[index] = '';
        onChange(nextCodeArr);
      } else {
        setValue('', -1);
        previousInput.focus();
      }
    }
  };

  return (
    <InputBlockStyle
      className={`${value.length > 0 ? 'focused' : ''} ${className ?? ''}`}
      type="text"
      ref={inputRef}
      value={value}
      onKeyDown={_onKeyDown}
      onChange={_onChange}
      onPaste={_onPaste}
      isInputValue={value.length > 0}
      inputMode="numeric"
    />
  );
};

interface InputBlockStyleProps {
  isInputValue: boolean;
}

export const InputBlockStyle = styled.input<InputBlockStyleProps>`
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background-color: ${COLOR['GRAY6__#E7E7E7']};
  border: none;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 140%; /* 33.6px */
  transition: 0.2s;
  :focus {
    outline: none;
  }
  &.focused {
    background-color: ${COLOR['WHITE__#FFFFFF']};
    border: 1px solid ${COLOR['BLACK__#000000']};
  }
  &.error {
    border: 1px solid ${COLOR['ERROR__#EC1A26']};
  }
`;
export default InputBlock;
