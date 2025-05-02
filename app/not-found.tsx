import { Grid, GridContainer } from '@trussworks/react-uswds';
import React from 'react';

export default function NotFound() {
  return (
    <GridContainer className='flex-fill flex-align-self-center text-uppercase'>
      <Grid row className='font-ui-lg tablet:font-ui-xl desktop:font-ui-2xl'>
        <h1> 404 - Page Not Found</h1>
      </Grid>
      <Grid row>
        <p>The page you are looking for does not exist.</p>
      </Grid>
    </GridContainer>
  );
}
