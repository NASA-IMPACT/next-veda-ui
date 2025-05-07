import React from 'react';
import { Grid, GridContainer } from '@trussworks/react-uswds';

import { Paragraph } from 'app/components/common/Paragraph';

const VisitPage: React.FC = () => {
  return (
    <GridContainer containerSize='desktop-lg' className='desktop:padding-y-10'>
      <Grid row className='margin-bottom-4 measure-1 desktop:measure-4'>
        <h1 className='text-uppercase'>Plan your visit</h1>
        <Paragraph>
          The Earth Information Center currently has three physical exhibits
          located at: NASA HQ (Washington, DC), Smithsonian Museum of Natural
          History (Washington, DC), and Kennedy Space Center (Merritt Island,
          Florida). All exhibits are open to the public.
        </Paragraph>
      </Grid>
      <Grid row>{/* Add center cards here! */}</Grid>
    </GridContainer>
  );
};

export default VisitPage;
