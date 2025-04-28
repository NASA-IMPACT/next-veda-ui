'use client';
import React from 'react';
import './styles/index.scss';
import '@teamimpact/veda-ui/lib/main.css';

import Header from './components/header';

import { TransparentHeaderProvider } from './components/header/transparent-header-context';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <TransparentHeaderProvider>
          <div className='minh-viewport display-flex flex-column'>
            <header>
              <Header />
            </header>
            <main id='pagebody' tabIndex={-1}>
              {children}
            </main>
          </div>
        </TransparentHeaderProvider>
      </body>
    </html>
  );
}
