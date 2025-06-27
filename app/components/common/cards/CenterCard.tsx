import React from 'react';
import Image from 'next/image';
import { Center } from 'app/types';
import './CenterCard.scss';
import CardBadge from './CardBadge';
import Link from 'next/link';
import { LaunchIcon } from '../Icons';
import { DATA_CENTERS } from 'app/constants';
import { Grid } from '@trussworks/react-uswds';

interface CenterCardProps {
  center: Center;
  isWide?: boolean;
}

export const CenterCard: React.FC<CenterCardProps> = ({ center, isWide }) => {
  return (
    <div
      className={`center-card bg-ink border-1px border-base-darkest radius-md padding-y-5 padding-x-3`}
    >
      {isWide && (
        <div className='center-card__image'>
          <Image
            width={400}
            height={400}
            src={center.image}
            alt={center.imageAlt}
            className='width-full height-full object-cover'
          />
        </div>
      )}
      <div className='center-card__body'>
        <div className='center-card__content'>
          <CardBadge label='Center' icon='Network' />
          <h3 className='font-body-lg'>{center.title}</h3>
          <p className='font-body-3xs text-base-light line-height-mono-4'>
            {center.description}
          </p>
        </div>
        <div className='font-body-sm text-bold portal-link'>
          <span>Open External Portal</span>
          <div className='icon-circle bg-primary-vivid'>
            <LaunchIcon size={3} aria-label='Open external portal' />
          </div>
        </div>
      </div>
      <Link
        className='position-absolute top-0 left-0 width-full height-full'
        href={`/visit/center/${center.id}`}
        aria-label={`Visit ${center.title} center.`}
      />
    </div>
  );
};

export const CenterCardBlock: React.FC<{ centerIds: string }> = ({
  centerIds,
}) => {
  const centers = DATA_CENTERS.filter((center) =>
    centerIds.includes(center.id),
  );

  return (
    <Grid col={12}>
      {centers.map((center) => (
        <Grid key={center.id} row className='margin-y-2'>
          <CenterCard key={center.id} center={center} isWide />
        </Grid>
      ))}
    </Grid>
  );
};
