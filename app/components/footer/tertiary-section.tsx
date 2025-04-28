import React from 'react';
import { Grid } from '@trussworks/react-uswds';

const TertiarySection = () => {
  return (
    <Grid
      row
      gap={4}
      className='desktop:grid-row flex-justify border-top-1px border-base-darkest padding-top-2 text-base-light font-body-2xs'
    >
      <div className='desktop:display-flex desktop:flex-row desktop:order-last flex-justify'>
        <div className='padding-right-4'>
          <p>
            Page last updated: <span className='text-white'>Mar 26, 2024</span>
          </p>
        </div>
        <div>
          <p>
            U.S. Earth Information Center Responsible Official: Eleanor Stokes
          </p>
        </div>
      </div>

      <div className='desktop:display-flex desktop:order-first'>
        <p>
          Looking for U.S. government information and services? Visit USA.gov
        </p>
      </div>
    </Grid>
  );
};

export default TertiarySection;
