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
    <div className={`center-card ${isFirst && 'is-first'}`}>
      <div className='center-card__image'>
        <Image
          width={400}
          height={400}
          src={center.image}
          alt={center.imageAlt}
        />
      </div>
      <div className='center-card__body'>
        <CardBadge
          label='Center'
          icon='AccountBalance'
          className='width-fit-content margin-y-2'
        />
        <h3 className='text-uppercase margin-y-05 font-sans-xs'>
          <span className='font-weight-semibold line-height-tight'>
            {center.title}
          </span>
        </h3>
        <p className='font-body-3xs margin-y-05'>{center.description}</p>
      </div>
    </div>
  );
};
