import React from 'react';
import Image from 'next/image';
import { Center } from 'app/types';
import './CenterCard.scss';
import { Grid } from '@trussworks/react-uswds';

interface CenterCardProps {
  center: Center;
  isFirst?: boolean;
}

export const CenterCard: React.FC<CenterCardProps> = ({
  center,
  isFirst = false,
}) => {
  const imageWidth = isFirst ? 330 : 110;
  const imageHeight = isFirst ? 192 : 167;

  return (
    <Grid row>
      <Grid col='auto'>
        <Image
          width={imageWidth}
          height={imageHeight}
          src={center.image}
          alt={center.imageAlt}
          className='object-cover'
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
