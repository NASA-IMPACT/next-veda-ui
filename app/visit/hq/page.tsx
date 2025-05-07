import React from 'react';
import { Grid, GridContainer } from '@trussworks/react-uswds';

import { Paragraph } from 'app/components/common/Paragraph';

const HqPage: React.FC = () => {
  return (
    <GridContainer containerSize='desktop-lg' className='desktop:padding-y-10'>
      <Grid row className='margin-bottom-4 measure-1 desktop:measure-4'>
        <h1 className='text-uppercase'>NASA HQ</h1>
        <Paragraph>
          The Earth Information Center at HQ is a physical and virtual
          experience at NASA Headquarters, where visitors can see how our planet
          is changing in areas that affect lives and livelihoods– from
          temperatures in our cities to sea level rise, greenhouse gas emissions
          to agricultural productivity.
        </Paragraph>
      </Grid>
      <Grid row>{/* Add other content here! */}</Grid>
    </GridContainer>
  );
};

export default HqPage;
