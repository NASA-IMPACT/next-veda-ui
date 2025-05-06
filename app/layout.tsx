'use client';
import React from 'react';
import './styles/index.scss';
import '@teamimpact/veda-ui/lib/main.css';

import Header from './components/header';
import Footer from './components/footer';

// import { TransparentHeaderProvider } from './components/header/transparent-header-context';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        {/* <TransparentHeaderProvider> */}
          <div className='minh-viewport display-flex flex-column'>
            <Header/>
            <main id='pagebody' tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </div>
        {/* </TransparentHeaderProvider> */}
      </body>
    </html>
  );
}
