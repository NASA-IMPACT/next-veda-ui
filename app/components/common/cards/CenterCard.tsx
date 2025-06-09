import React from 'react';
import Image from 'next/image';
import { Center } from 'app/types';
import './CenterCard.scss';
import { Grid } from '@trussworks/react-uswds';

interface CenterCardProps {
  center: Center;
  isFirst?: boolean;
}

export const CenterCard: React.FC<CenterCardProps> = ({ center }) => {
  return (
    <Grid row className='center-card'>
      <Grid col='auto'>
        <Image
          width={400}
          height={400}
          src={center.image}
          alt={center.imageAlt}
          className='width-full height-full object-cover'
        />
      </Grid>
      <Grid col={6}>
        <h3 className='text-uppercase'>
          <span>{center.title}</span>
        </h3>
        <p className=''>{center.description}</p>
      </Grid>
    </Grid>
  );
};
