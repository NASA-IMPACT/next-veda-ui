import React from 'react';
import type { Metadata } from 'next';
import { baseUrl } from './sitemap';
import dynamic from 'next/dynamic';
import './styles/index.scss';
import '@teamimpact/veda-ui/lib/main.css';

// @NOTE: Dynamically load to ensure only CSR since these depends on VedaUI ContextProvider for routing...
const Header = dynamic(() => import('./components/header'), {
  ssr: false,
  loading: () => <p>Loading...</p>, // @NOTE @TODO: We need a loading state!!!
});

const Footer = dynamic(() => import('./components/footer'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
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
const getPage = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:1337';
  const path = '/api/pages';
  console.log('getPage called');
  const url = new URL(path, baseUrl);

  const res = await fetch('http://localhost:1337/api/pages');

  if (!res.ok) throw new Error('Failed to fetch team pages');

  const data = await res.json();
  console.log(data);

  return data;
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log('before page');
  await getPage();
  return (
    <html lang='en'>
      <body>
        <div className='minh-viewport display-flex flex-column'>
          <Header />
          <main id='pagebody' className='flex-fill' tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
