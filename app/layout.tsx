import React from 'react';
import type { Metadata } from 'next';
import { baseUrl } from './sitemap';
import './styles/index.scss';
import '@teamimpact/veda-ui/lib/main.css';

import Header from './components/header';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl ?? ''),
  title: {
    default: 'Next.js VEDA Template Instance',
    template: '%s | Next.js VEDA Template Instance',
  },
  description: 'Next.js VEDA Template Instance.',
  openGraph: {
    title: 'Next.js VEDA Template Instance',
    description: 'Next.js VEDA Template Instance.',
    url: baseUrl,
    siteName: 'Next.js VEDA Template Instance',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <div className='minh-viewport display-flex flex-column bg-ink text-white'>
          <Header />
          <main id='pagebody' tabIndex={-1}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
