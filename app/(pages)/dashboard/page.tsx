import React from 'react';
import { Grid, GridContainer } from '@trussworks/react-uswds';

import Separator from 'app/components/common/Separator';
import ThemeCard from 'app/components/common/cards/ThemeCard';
import InteractiveCard from 'app/components/common/cards/InteractiveCard';
import { DATA_THEMES, DATA_INTERACTIVES } from 'app/constants';
import Carousel from 'app/components/common/Carousel';
import CentersSection from './CentersSection';
import { SectionHeader } from 'app/components/common/Section';

interface DashboardSectionProps {
  title: string;
  children: React.ReactNode;
}

const DashboardSection: React.FC<DashboardSectionProps> = ({
  title,
  children,
}) => {
  return (
    <GridContainer containerSize='desktop-lg'>
      <Grid row>
        <SectionHeader title={title} />
      </Grid>
      {children}
    </GridContainer>
  );
};

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

      <DashboardSection title='Learn about Earth Themes'>
        <Carousel
          slideWidth='third'
          slides={DATA_THEMES.map((theme) => (
            <ThemeCard key={theme.id} theme={theme} />
          ))}
        />
      </DashboardSection>

      <DashboardSection title='Interactives'>
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
      </DashboardSection>

      <DashboardSection title='Explore our centers'>
        <CentersSection />
      </DashboardSection>
    </>
  );
};

export default DashboardPage;
