/* eslint-disable @next/next/no-sync-scripts */
import './globals.css';
import type { Metadata } from 'next';
import Footer from '../components/layout/footer';
import Nav from '../components/layout/nav';
import { LayoutStyle } from './layout.style';
import ErrorBoundary from './errorBoundary';
import QueryWrapper from './queryWrapper';
import SessionProviderComponent from './NextAuthProvider';
import {
  GoogleTagManagerNoScript,
  GoogleTagManagerScript
} from './googleTagManager';
import HavahValid from '@/components/layout/havahValid';
import Error from './error';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {process.env.NEXT_PUBLIC_ENVIRONMENT === 'production' && (
          <script
            id="Cookiebot"
            src="https://consent.cookiebot.com/uc.js"
            data-cbid="9c006f2c-1c0e-41a8-a923-55b7b6545743"
            data-blockingmode="auto"
            type="text/javascript"
            async
            defer
          />
        )}
      </head>
      <ErrorBoundary fallback={<Error />}>
        <QueryWrapper>
          <SessionProviderComponent>
            <LayoutStyle>
              <GoogleTagManagerScript />
              <GoogleTagManagerNoScript />
              <div className="width__error">
                Unable to display content due to:
                <br /> 1. Device width less than 360px. <br /> 2. Possible
                Safari browser issue.
              </div>
              <HavahValid />
              <Nav />
              <ErrorBoundary fallback={<Error />}>
                <div className="body__contents">{children}</div>
              </ErrorBoundary>
              <Footer />
            </LayoutStyle>
          </SessionProviderComponent>
        </QueryWrapper>
      </ErrorBoundary>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_CONTENT_DOMAIN),
  title: 'MINE WARZ | GAME-FI',
  description:
    'MINE WARZ, the simple mining tycoon where all NFTs are usable. We strive to provide the most straightforward and accessible GAME-FI project.',

  openGraph: {
    title: 'MINE WARZ | GAME-FI',
    description:
      'MINE WARZ, the simple mining tycoon where all NFTs are usable. We strive to provide the most straightforward and accessible GAME-FI project.',
    images: [
      {
        url: '/assets/images/minewarz_brand_og.png',
        width: 1000,
        height: 525,
        alt: 'MINE WARZ'
      }
    ],
    url: 'https://www.minewarz.io',
    siteName: 'MINE WARZ',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MINE WARZ | GAME-FI',
    description:
      'MINE WARZ, the simple mining tycoon where all NFTs are usable. We strive to provide the most straightforward and accessible GAME-FI project.',
    images: '/assets/images/minewarz_brand_og.png'
  },
  verification: {
    google: 'hA2xnNBU3o_XyFVCvR-3kN3MIIsH2oeJloz1Lope3Co' //google search console verification
  }
};
