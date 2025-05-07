import { Grid, GridContainer } from '@trussworks/react-uswds';
import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <GridContainer containerSize='desktop-lg' className='desktop:padding-y-10'>
      <Grid row className='margin-bottom-4'>
        <h1 className='text-uppercase'>Explore</h1>
      </Grid>
      <Grid row>
        {/* Add content here! */}
        <p>Welcome to the dashboard!</p>
      </Grid>
    </GridContainer>
  );
};

export default DashboardPage;
