'use client';
import COLOR from '@/constants/COLOR';
import styled from '@emotion/styled';
import React from 'react';
//미사용..
const envVersion = process.env.NEXT_PUBLIC_WEB_VERSION;
const version = envVersion ? 'v' + envVersion.split('-').at(1) : '';

export default function VersionViewer() {
  return <VersionViewerStyle>{version}</VersionViewerStyle>;
}

const VersionViewerStyle = styled.div`
  position: fixed;
  bottom: 0;
  right: 12px;
  font-size: 14px;
  color: ${COLOR['GRAY5__#D2D2D2']};
`;
