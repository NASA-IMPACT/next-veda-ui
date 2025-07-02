import React from 'react';
import { Grid, Link } from '@trussworks/react-uswds';

const TertiarySection = () => {
  return (
    <Grid
      row
      className='border-top-1px border-base-darkest padding-top-2 text-base-light font-body-2xs flex-column desktop-lg:flex-row'
    >
      <p className='margin-y-05'>
        Looking for U.S. government information and services?{' '}
        <Link
          href='https://www.usa.gov'
          target='_blank'
          rel='noopener noreferrer'
        >
          Visit USA.gov
        </Link>
      </p>
      <p className='margin-y-05'>
        Page last updated:{' '}
        <span className='text-white'>
          {/*TODO: Add current date */}Mar 26, 2024
        </span>
      </p>
      <p className='margin-y-05'>
        U.S. Earth Information Center Responsible Official:{' '}
        <Link href='mailto:eleanor.stokes@nasa.gov'>Eleanor Stokes</Link>
      </p>
    </Grid>
  );
};

export default TertiarySection;
