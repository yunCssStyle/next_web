import React from 'react';
import { DisabledBoxStyle } from './style';

interface IProps {
  children: React.ReactNode;
  className?: string;
}
export default function DisabledBox({ children, className }: IProps) {
  return <DisabledBoxStyle className={className}>{children}</DisabledBoxStyle>;
}
