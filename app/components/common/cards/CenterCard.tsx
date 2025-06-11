import React from 'react';
import Image from 'next/image';
import { Center } from 'app/types';
import './CenterCard.scss';
import CardBadge from './CardBadge';

interface CenterCardProps {
  center: Center;
  isFirst?: boolean;
}

export const CenterCard: React.FC<CenterCardProps> = ({ center, isFirst }) => {
  return (
    <div
      className={`center-card ${isFirst && 'is-first'} display-flex flex-row flex-align-start gap-4`}
    >
      <div className='center-card__image'>
        <Image
          width={400}
          height={400}
          src={center.image}
          alt={center.imageAlt}
        />
      </div>
      <div className='flex-fill display-flex flex-column flex-justify-start gap-2'>
        <CardBadge label='Center' icon='AccountBalance' />
        <h3 className='text-uppercase'>
          <span>{center.title}</span>
        </h3>
        <p>{center.description}</p>
      </div>
    </div>
  );
};
