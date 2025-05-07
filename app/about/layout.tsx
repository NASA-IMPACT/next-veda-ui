import React from 'react';
import SideNav from './side-nav';
import { Grid, GridContainer } from '@trussworks/react-uswds';

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // The about page needs a full width white bg color, so we're adding a div wrapper
    // around the GridContainer to achieve that.
    <div className='desktop:bg-white'>
      <GridContainer
        containerSize='desktop-lg'
        className='desktop:text-ink desktop:padding-y-10'
      >
        <Grid row className='margin-bottom-4'>
          <h1 className='text-uppercase'>About</h1>
        </Grid>

        <Grid row gap={6}>
          {/* Desktop Sidebar: visible only on desktop */}
          <Grid col={3} className='display-none desktop:display-block'>
            <div className='position-sticky top-2'>
              <SideNav />
            </div>
          </Grid>

          {/* Mobile Sidebar: visible only on mobile */}
          <Grid col={12} className='display-block desktop:display-none'>
            {/* TODO: <Accordion></Accordion> */}
          </Grid>

          <Grid col={'fill'} className='mdx margin-top-neg-2'>
            {children}
          </Grid>
        </Grid>
      </GridContainer>
    </div>
  );
}
