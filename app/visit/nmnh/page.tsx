import React from 'react';
import { Grid, GridContainer } from '@trussworks/react-uswds';

import { Paragraph } from 'app/components/common/Paragraph';

const NmnhPage: React.FC = () => {
  return (
    <GridContainer containerSize='desktop-lg' className='desktop:padding-y-10'>
      <Grid row className='margin-bottom-4 measure-1 desktop:measure-4'>
        <h1 className='text-uppercase'>
          Smithsonian National Museum of Natural History
        </h1>
        <Paragraph>
          The Earth Information Center exhibit at the Smithsonian’s National
          Museum of Natural History includes a video wall displaying Earth
          science data visualizations and videos, an interpretive panel showing
          Earth’s connected systems, information on our changing world, and an
          overview of how NASA and the Smithsonian study our home planet.
        </Paragraph>
      </Grid>
      <Grid row>{/* Add other content here! */}</Grid>
    </GridContainer>
  );
};

export default NmnhPage;
