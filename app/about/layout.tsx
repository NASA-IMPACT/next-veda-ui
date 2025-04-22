import React from 'react';
import AboutSideNav from './side-nav';
import './about.scss';

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='bg-white text-ink wrapper'>
      <div className='title'>
        <h1 className='text-uppercase'>About</h1>
      </div>
      <div className='sidenav'>
        {/* Sidenav for mobile view - collapsed style */}
        <div className='mobile-sidenav'>
          <AboutSideNav />
        </div>

        {/* Sidenav for desktop view - expanded style */}
        <div className='desktop-sidenav'>
          <AboutSideNav />
        </div>
      </div>
      <div className='content'>{children}</div>
    </div>
  );
}
