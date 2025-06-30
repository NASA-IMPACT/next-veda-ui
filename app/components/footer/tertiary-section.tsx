import React from 'react';
import { Grid, Link } from '@trussworks/react-uswds';

const TertiarySection = () => {
  return (
    <Grid
      row
      className='border-top-1px border-base-darkest padding-top-2 desktop:display-flex flex-column desktop:flex-row text-base-light font-body-2xs'
    >
      <div className='desktop:display-flex desktop:order-first'>
        <p className='margin-top-0 measure-1 desktop:measure-4'>
          Looking for U.S. government information and services?{' '}
          <Link
            href='https://www.usa.gov'
            target='_blank'
            rel='noopener noreferrer'
          >
            Visit USA.gov
          </Link>
        </p>
      </div>

      <div className='desktop:display-flex desktop:flex-row desktop:order-last'>
        <div className='padding-right-4'>
          <p className='margin-top-0 measure-1 desktop:measure-4'>
            Page last updated:{' '}
            <span className='text-white'>
              {/*TODO: Add current date */}Mar 26, 2024
            </span>
          </p>
        </div>
        <div>
          <p className='margin-top-0 measure-1 desktop:measure-4'>
            U.S. Earth Information Center Responsible Official:{' '}
            <Link href='mailto:eleanor.stokes@nasa.gov'>Eleanor Stokes</Link>
          </p>
        </div>
      </div>
    </Grid>
  );
};

export default TertiarySection;
