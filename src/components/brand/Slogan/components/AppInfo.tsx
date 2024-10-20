import Image from 'next/image';
import { appInfo } from '../infomation';
import styled from '@emotion/styled';
import { cdnUrl } from '@/util/converter';

export default function AppInfo() {
  return (
    <AppInfoStyle>
      <div className="image__box">
        <Image
          draggable="false"
          src="./assets/images/logo_app.png"
          alt="logo"
        />
      </div>
      <div className="information">
        {appInfo.map((item, index) => (
          <div key={index} className="name__content">
            <div className="name">{item.name}</div>
            <div className="content">{item.content}</div>
          </div>
        ))}
      </div>
    </AppInfoStyle>
  );
}

const AppInfoStyle = styled.div`
  position: relative;
  margin-top: 123px;
  width: 100%;
  height: 525px;
  background-image: url(${cdnUrl('/assets/images/top_bg_yellow.png')});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  .image__box {
    position: absolute;
    margin: auto;
    top: -52px;
    left: 50%;
    transform: translateX(-50%);
    > img {
      width: 156px;
      height: 156px;
      border-radius: 19px;
      filter: drop-shadow(0px 40px 60px rgba(114, 27, 0, 0.25));
    }
  }
  .information {
    width: fit-content;
    margin: 143px auto 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    .name__content {
      .name {
        width: fit-content;
        margin: auto;
        padding: 7px 18px;
        border-radius: 30px;
        background: #000;
        color: #ffea00;
        text-align: center;
        font-family: 'Inter', sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
      .content {
        margin-top: 10px;
        color: #000;
        text-align: center;
        font-family: 'Inter', sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }
    }
  }
`;
