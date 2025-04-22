import React from 'react';
import AboutSideNav from './side-nav';

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='bg-white text-ink grid-container'>
      <div className='grid-row'>
        <div className='grid-col-3'>
          <div className='grid-row position-sticky top-0'>
            <div>
              <div className='height-15 grid-row flex-column flex-justify-center'>
                <h1 className='text-uppercase'>About</h1>
              </div>
              <AboutSideNav />
            </div>
          </div>
        </div>
        <div className='grid-col-fill padding-top-15 mdx'>{children}</div>
      </div>
    </div>
  );
}
