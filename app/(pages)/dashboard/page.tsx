import React from 'react';
import { Grid, GridContainer } from '@trussworks/react-uswds';

import Separator from 'app/components/common/Separator';
import ThemeCard from 'app/components/common/cards/ThemeCard';
import InteractiveCard from 'app/components/common/cards/InteractiveCard';
import { DATA_THEMES, DATA_INTERACTIVES } from 'app/constants';
import Carousel from 'app/components/common/Carousel';
import CentersSection from './CentersSection';
import { SectionHeader } from 'app/components/common/Section';

import './page.scss';

const DashboardPage: React.FC = () => {
  return (
    <>
      <GridContainer className='desktop:padding-top-10'>
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

      <Separator />

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

      <DashboardSection
        title='Explore our centers'
        className='center-section'
        fullWidth={true}
      >
        <CentersSection />
      </DashboardSection>
    </>
  );
};

export default DashboardPage;

interface DashboardSectionProps {
  title: string;
  className?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}

const DashboardSectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <SectionHeader title={title} className='margin-y-1' />
);

const DashboardSection: React.FC<DashboardSectionProps> = ({
  title,
  className = '',
  children,
  fullWidth = false,
}) => {
  const baseClasses =
    `dashboard-section padding-y-8 width-full ${className}`.trim();

  if (fullWidth) {
    return (
      <div className={baseClasses}>
        <GridContainer>
          <DashboardSectionHeader title={title} />
        </GridContainer>
        <GridContainer>{children}</GridContainer>
      </div>
    );
  }

  return (
    <GridContainer className={baseClasses}>
      <DashboardSectionHeader title={title} />
      {children}
    </GridContainer>
  );
};
