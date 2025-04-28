import React from 'react';
import { Footer as USWDSFooter, GridContainer } from '@trussworks/react-uswds';

import PrimarySection from './primary-section';
import SecondarySection from './secondary-section';
import TertiarySection from './tertiary-section';

export default function Footer() {
  return (
    <USWDSFooter
      size='slim'
      primary={
        <GridContainer containerSize='widescreen' className='text-white'>
          <PrimarySection />
        </GridContainer>
      }
      secondary={
        <>
          {/* This is already a grid container in trusswork's implementation*/}
          <SecondarySection />

          <TertiarySection />
        </>
      }
    />
  );
}
