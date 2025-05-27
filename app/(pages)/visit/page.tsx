'use client';
import React from 'react';
import { CardGroup, Grid, GridContainer } from '@trussworks/react-uswds';
import { Paragraph } from 'app/components/common/Paragraph';
import ExhibitCard from 'app/components/common/cards/ExhibitCard';
import { DATA_EXHIBITS as exhibits } from 'app/constants';
import './visit.css';

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
      <CardGroup className='exhibit-card-group'>
        {exhibits.map((exhibit) => (
          <ExhibitCard key={exhibit.id} exhibit={exhibit} />
        ))}
      </CardGroup>
    </GridContainer>
  );
};

export default VisitPage;
