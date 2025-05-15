import React from 'react';
import { Grid, GridContainer, CardGroup } from '@trussworks/react-uswds';

import Separator from 'app/components/common/Separator';
import ThemeCard from 'app/components/common/cards/ThemeCard';
import { DATA_THEMES } from 'app/constants';

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
        <Grid row className='margin-bottom-4'>
          <h2 className='text-uppercase'>Learn about earth themes</h2>
        </Grid>
        <CardGroup>
          {DATA_THEMES.map((theme) => (
            <ThemeCard key={theme.id} theme={theme} />
          ))}
        </CardGroup>
      </GridContainer>
    </>
  );
};

export default DashboardPage;
