import React, { useState } from 'react';
import { NotificationAndTooltipStyle } from './style';
import { SVG } from '@/svg';

export default function NotificationAndTooltip() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <NotificationAndTooltipStyle>
      <span>
        Attention: Apple&apos;s &quot;Hide My Email&quot; Account Users
      </span>
      <div
        className="question__mark"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip((state) => !state)}
      >
        <SVG.ICON.QUESTION_CIRCLE />
        {showTooltip && (
          <span className="triangle">
            <SVG.ICON.TOOLTIP_TRIANGLE />
          </span>
        )}
      </div>
      {showTooltip && (
        <div className="tooltip">
          Users who have opted into Hide My Email for their Apple account will
          skip two-step email verification when converting Gold to MZ Tokens.
          Please proceed with this in mind.
        </div>
      )}
    </NotificationAndTooltipStyle>
  );
}
