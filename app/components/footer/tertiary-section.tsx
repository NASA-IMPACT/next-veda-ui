import React from 'react';
import { Grid } from '@trussworks/react-uswds';

const TertiarySection = () => {
  return (
    <Grid
      row
      className='border-top-1px border-base-darkest padding-top-2 desktop:display-flex flex-column desktop:flex-row text-base-light font-body-2xs'
    >
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
            U.S. Earth Information Center Responsible Official: Eleanor Stokes
          </p>
        </div>
      </div>

      <div className='desktop:display-flex desktop:order-first'>
        <p className='margin-top-0 measure-1 desktop:measure-4'>
          Looking for U.S. government information and services? Visit USA.gov
        </p>
      </div>
    </Grid>
  );
};

export default TertiarySection;
