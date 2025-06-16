import React from 'react';
import { Grid, GridContainer } from '@trussworks/react-uswds';

import Separator from 'app/components/common/Separator';
import ThemeCard from 'app/components/common/cards/ThemeCard';
import InteractiveCard from 'app/components/common/cards/InteractiveCard';
import { DATA_THEMES, DATA_INTERACTIVES } from 'app/constants';
import Carousel from 'app/components/common/Carousel';
import CentersSection from './CentersSection';
import { SectionHeader } from 'app/components/common/Section';

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

      <GridContainer containerSize='desktop-lg' className='margin-bottom-4'>
        <Grid row className='margin-bottom-4'>
          <SectionHeader title='Learn about earth themes' />
        </Grid>
        <Carousel
          slideWidth='third'
          slides={DATA_THEMES.map((theme) => (
            <ThemeCard key={theme.id} theme={theme} />
          ))}
        />
      </GridContainer>

      <GridContainer containerSize='desktop-lg'>
        <Grid row className='margin-bottom-4'>
          <SectionHeader title='Interactive Tools' />
        </Grid>
        <Carousel
          slideWidth='full'
          slides={DATA_INTERACTIVES.map((interactive) => (
            <InteractiveCard
              key={interactive.id}
              id={interactive.id}
              url={interactive.url}
              title={interactive.title}
              description={interactive.description}
              imageAlt={interactive.cardImageAlt}
            />
          ))}
        />
      </GridContainer>

      <CentersSection />
    </>
  );
};

export default DashboardPage;
