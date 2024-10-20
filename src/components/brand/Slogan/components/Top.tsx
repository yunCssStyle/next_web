import { cdnUrl } from '@/util/converter';
import styled from '@emotion/styled';
import Image from 'next/image';

export default function Top() {
  return (
    <TopStyle>
      <div className="top">
        <video
          poster={cdnUrl('/assets/images/top_bg.png')}
          src={cdnUrl('/assets/video/top_video.mp4')}
          autoPlay
          loop
          muted
          playsInline
        />
        <Image
          className="logo"
          draggable="false"
          src={'/assets/images/logo.png'}
          alt="logo"
          width={270}
          height={277}
        />
      </div>
      <div className="title">Expand your mining empire, and get rich!</div>
    </TopStyle>
  );
}
//
const TopStyle = styled.div`
  width: 100%;
  .top {
    position: relative;
    width: 100%;
    max-width: 768px;
    height: 656px;
    overflow: hidden;
    background-image: url(${cdnUrl('/assets/images/top_bg.png')});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    video {
      position: absolute;
      top: 0px;
      left: 50%;
      transform: translateX(-50%);
    }
    .character {
      position: absolute;
      top: 353px;
      left: 50%;
      transform: translateX(-50%);
      width: 438px;
    }
    .logo {
      position: absolute;
      top: 49px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .title {
    color: #000;
    text-align: center;
    font-family: 'Inter', sans-serif;
    font-size: 40px;
    font-style: normal;
    font-weight: 800;
    line-height: 52px; /* 130% */
    letter-spacing: -0.4px;
    margin: 37px auto 0;
    padding: 0 35px;
    max-width: 650px;
  }
`;
