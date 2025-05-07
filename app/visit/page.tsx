import { Grid, GridContainer } from '@trussworks/react-uswds';
import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <GridContainer containerSize='desktop-lg' className='desktop:padding-y-10'>
      <Grid row className='margin-bottom-4'>
        <h1 className='text-uppercase'>Plan your visit</h1>
        <p>
          The Earth Information Center currently has three physical exhibits
          located at: NASA HQ (Washington, DC), Smithsonian Museum of Natural
          History (Washington, DC), and Kennedy Space Center (Merritt Island,
          Florida). All exhibits are open to the public.
        </p>
      </Grid>
      <Grid row>{/* Add center cards here! */}</Grid>
    </GridContainer>
  );
};

export default DashboardPage;
