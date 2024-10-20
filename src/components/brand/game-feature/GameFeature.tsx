'use client';
import { useCallback, useEffect, useState } from 'react';
import GameFeatureStyle from './GameFeatuer.style';
import FeatureBox from './components/FeatureBox';
import { featureList } from './featureInfo';

export type FeatureType = {
  title: string;
  subTitle?: string;
  description: string;
  image: string;
};

export default function GameFeature() {
  const [isFullWidth, setIsFullWidth] = useState(true);

  const resizeSetIsFullWidth = useCallback(() => {
    const refSize = 767;
    if (window.innerWidth > refSize && !isFullWidth) {
      setIsFullWidth(true);
    }
    if (window.innerWidth <= refSize && isFullWidth) {
      setIsFullWidth(false);
    }
  }, [isFullWidth]);

  useEffect(() => {
    // resizeSetIsFullWidth();

    addEventListener('resize', () => {
      resizeSetIsFullWidth();
    });
  }, [resizeSetIsFullWidth]);

  return (
    <GameFeatureStyle>
      <div className="feature__container">
        {featureList.map((feature, index) => (
          <FeatureBox
            key={index}
            {...feature}
            isFullWidth={isFullWidth}
            index={index}
          />
        ))}
      </div>
    </GameFeatureStyle>
  );
}
