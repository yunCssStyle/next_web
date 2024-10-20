import { LINK } from '@/constants/link';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Downloader() {
  return (
    <DownloaderStyle>
      <div className="stores">
        <Link href={LINK.PLAY_STORE} target="_blank">
          <Image
            className="googleplay button"
            draggable="false"
            src={'/assets/images/brand_googleplay.png'}
            alt="logo"
            width={168}
            height={50}
          />
        </Link>
        <Link href={LINK.APP_STORE} target="_blank">
          <Image
            className="appstore button"
            draggable="false"
            src={'/assets/images/brand_appstore.png'}
            alt="logo"
            width={150}
            height={50}
          />
        </Link>
      </div>
      <Link href={LINK.APK_DOWNLOAD} target="_blank">
        <Image
          className="download__apk button"
          draggable="false"
          src={'/assets/images/brand_download_apk.png'}
          alt="logo"
          width={326}
          height={50}
        />
      </Link>
    </DownloaderStyle>
  );
}

const DownloaderStyle = styled.div`
  margin: 40px auto 0;
  width: fit-content;

  .button {
    :hover {
      cursor: pointer;
    }
  }
  .stores {
    width: 326px;
    display: flex;
    justify-content: space-between;
  }
  .download__apk {
    margin-top: 8px;
  }
`;
