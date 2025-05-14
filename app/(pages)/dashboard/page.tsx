import React from 'react';
import { Grid, GridContainer } from '@trussworks/react-uswds';

import { Paragraph } from 'app/components/common/Paragraph';
import Separator from 'app/components/common/Separator';

const DashboardPage: React.FC = () => {
  return (
    <>
      <GridContainer
        containerSize='desktop-lg'
        className='desktop:padding-top-10'
      >
        <Grid row>
          <h1 className='text-uppercase'>Explore</h1>
        </Grid>
      </GridContainer>

      <Separator />

      <GridContainer containerSize='desktop-lg'>
        <Grid row>
          {/* Add content here! */}
          <Paragraph>Welcome to the dashboard!</Paragraph>
        </Grid>
      </GridContainer>
    </>
  );
};

export default DashboardPage;
