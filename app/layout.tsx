import './global.css';
import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from './components/nav';
import Footer from './components/footer';
import { baseUrl } from './sitemap';
import dynamic from 'next/dynamic';
import { EnvConfigProvider } from '@lib';

const DevSeedUIThemeProvider = dynamic(
  () => import('app/store/providers/theme'),
  { ssr: false },
);

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Next.js Portfolio Starter',
    template: '%s | Next.js Portfolio Starter',
  },
  description: 'This is my portfolio.',
  openGraph: {
    title: 'My Portfolio',
    description: 'This is my portfolio.',
    url: baseUrl,
    siteName: 'My Portfolio',
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
        <main>
          <DevSeedUIThemeProvider>
            <EnvConfigProvider
              config={{
                envMapboxToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '',
                envApiStacEndpoint:
                  process.env.NEXT_PUBLIC_API_STAC_ENDPOINT ?? '',
                envApiRasterEndpoint:
                  process.env.NEXT_PUBLIC_API_RASTER_ENDPOINT ?? '',
              }}
            >
              <Navbar />
              {children}
              <Footer />
            </EnvConfigProvider>
          </DevSeedUIThemeProvider>
        </main>
      </body>
    </html>
  );
}
