import React from 'react';
import { Grid, GridContainer } from '@trussworks/react-uswds';

import { Paragraph } from 'app/components/common/Paragraph';
import Separator from 'app/components/common/Separator';

const KennedySpaceCenterPage: React.FC = () => {
  return (
    <>
      <GridContainer
        containerSize='desktop-lg'
        className='desktop:padding-top-10'
      >
        <Grid row className='margin-bottom-4 measure-1 desktop:measure-4'>
          <h1 className='text-uppercase'>KENNEDY SPACE CENTER</h1>
          <Paragraph>
            The Earth Information Center exhibit at the Kennedy Space Center
            Visitor Complex reimagines the observation gantry at Launch Complex
            39 and includes a data hub featuring a theater show, a Hyperwall
            display, and an interactive exhibit gallery.
          </Paragraph>
        </Grid>
      </GridContainer>

      <Separator />

      <GridContainer containerSize='desktop-lg'>
        <Grid row>{/* Add other content here! */}</Grid>
      </GridContainer>

      <Separator />

      <GridContainer containerSize='desktop-lg'>
        <Grid row>{/* Add other content here! */}</Grid>
      </GridContainer>
    </>
  );
};

export default KennedySpaceCenterPage;
