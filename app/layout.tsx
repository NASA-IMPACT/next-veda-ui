import React from 'react';
import type { Metadata } from 'next';

import 'app/styles/index.scss';
import { baseUrl } from 'app/sitemap';
import Header from './components/header';
import Footer from './components/footer';
import Banner from './components/common/Banner';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl ?? ''),
  title: {
    default: 'Earth Information Center',
    template: '%s | Earth Information Center',
  },
  description: 'Explore our changing planet.',
  openGraph: {
    title: 'Earth Information Center',
    description: 'Explore our changing planet.',
    url: baseUrl,
    siteName: 'Earth Information Center',
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
        <div className='minh-viewport display-flex flex-column'>
          <Banner />
          <Header />
          <main className='flex-fill outline-0'>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
