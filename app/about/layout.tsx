import React from 'react';
import SideNav from './side-nav';
import { Grid, GridContainer } from '@trussworks/react-uswds';

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GridContainer
      containerSize='widescreen'
      // TODO: Figure out how to enable responsive text color
      // className='desktop:bg-white desktop:text-ink desktop:padding-x-15 desktop:padding-y-10'
      className='bg-white text-ink desktop:padding-x-15 desktop:padding-y-10'
    >
      <Grid row>
        <h1 className='text-uppercase'>About</h1>
      </Grid>

      <Grid row gap={6}>
        {/* Desktop Sidebar: visible only on desktop */}
        <Grid col={3} className='display-none desktop:display-block'>
          <div className='position-sticky top-0 padding-top-10'>
            <SideNav />
          </div>
        </Grid>

        {/* Mobile Sidebar: visible only on mobile */}
        <Grid col={12} className='display-block desktop:display-none'>
          {/* TODO: <Accordion></Accordion> */}
        </Grid>

        <Grid col={'fill'} className='mdx'>
          {children}
        </Grid>
      </Grid>
    </GridContainer>
  );
}
