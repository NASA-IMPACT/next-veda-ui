import React from 'react';
import Image from 'next/image';
import { Center } from 'app/types';
import CardBadge from './CardBadge';
import './CenterCard.scss';

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
    <div className=''>
      <div className=''>
        <Image
          width={imageWidth}
          height={imageHeight}
          src={center.image}
          alt={center.imageAlt}
          className='object-cover'
        />
        <div className=''>
          <CardBadge label='Center' icon='AccountBalance' />
          <h3 className='text-uppercase'>
            <span>{center.title}</span>
          </h3>
          <p className=''>{center.description}</p>
        </div>
      </div>
    </div>
  );
};
