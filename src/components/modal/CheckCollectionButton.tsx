import React, { useState } from 'react';
import { CheckCollectionButtonStyle } from './modal.style';
import { SVG } from '@/svg';
import { LINK } from '@/constants/link';

export default function CheckCollectionButton() {
  const [isShow, setIsShow] = useState(true);

  const _onClick = () => {
    window.open(LINK.WHITE__COLLECTION, '_blank');
  };
  return (
    <CheckCollectionButtonStyle isShow={isShow}>
      <div className="button" onClick={_onClick}>
        <SVG.ICON.SYMBOL />
        <span>Check</span>
        <span>Collection</span>
      </div>
      <div className="close_mini" onClick={() => setIsShow(false)}>
        <SVG.ICON.CLOSE_MINI />
      </div>
    </CheckCollectionButtonStyle>
  );
}
