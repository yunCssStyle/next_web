'use client';
import { snsArr } from '@/constants/sns';
import styled from '@emotion/styled';
import Image from 'next/image';
import { FooterStyle, MailToBoxStyle } from './layout.style';
import { LINK } from '@/constants/link';

export default function Footer() {
  const mailToAddress = 'mz_support@minewarz.io';

  return (
    <FooterStyle>
      <Image
        className="trimeta__logo"
        src="/assets/images/footer_logo_trimeta.png"
        alt=""
        width={101}
        height={30}
      />
      <div className="policy__contact">
        <a href={LINK.TERMS_OF_USE} target="_blank">
          Terms of Use
        </a>
        <a href={LINK.PRIVACY_POLICY} target="_blank">
          Privacy Policy
        </a>
        <a href={LINK.CONTACT} target="_blank">
          Contact us
        </a>
      </div>
      <div className="social__box">
        {snsArr.map((item, index) => (
          <a key={index} href={item.url} target="_blank">
            {item.img}
          </a>
        ))}
      </div>
      <div className="copyright">© TriMeta Studios. All Rights Reserved.</div>
    </FooterStyle>
  );
}
