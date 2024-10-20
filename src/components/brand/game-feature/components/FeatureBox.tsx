import { useCallback, useEffect, useRef } from 'react';
import { FeatureType } from '../GameFeature';
import styled from '@emotion/styled';
import Image from 'next/image';
import useGlobalStore from '@/store/globalStore';

export default function FeatureBox(
  props: FeatureType & {
    isFullWidth: boolean;
    index: number;
  }
) {
  const { title, subTitle, description, image, isFullWidth, index } = props;

  return (
    <FeatureBoxCommonStyle>
      <Image
        draggable="false"
        src={image}
        alt="image"
        className="image"
        width={328}
        height={240}
        quality={100}
      />
      <div className="content">
        <h3 className="title">
          <span>{title}</span>
          <span className="subTitle">{subTitle}</span>
        </h3>
        <p dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      <Image
        draggable="false"
        src={image}
        alt="image"
        className="image__full__width"
        width={328}
        height={240}
        quality={100}
      />
    </FeatureBoxCommonStyle>
  );
}

const FeatureBoxCommonStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0px 7px 15px 0px rgba(0, 0, 0, 0.04);

  .content {
    width: 100%;
    margin-top: 10px;
    padding: 0 26px 30px;
    h3 {
      color: #000;
      width: 250px;
      font-family: 'Inter', sans-serif;
      font-size: 30px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: -0.6px;
      display: flex;
      align-items: flex-end;
      gap: 2px;
      span {
        white-space: nowrap;
      }
      .subTitle {
        margin-top: 7px;
        margin-left: 8px;
        color: rgba(0, 0, 0, 0.5);
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        transform: translateY(-4px);
      }
    }
    p {
      margin-top: 8px;
      color: #000;
      font-family: 'Inter', sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 27px; /* 168.75% */
      letter-spacing: -0.16px;
    }
  }

  .image {
    display: block;
  }

  .image__full__width {
    display: none;
  }

  @media (min-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    .content {
      width: 338px;
      height: 100%;
      margin-top: 0;
      padding: 30px 28px;
    }
    .image {
      display: none;
    }

    .image__full__width {
      display: block;
    }
  }
`;
