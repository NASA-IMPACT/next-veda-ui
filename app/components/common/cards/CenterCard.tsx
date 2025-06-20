import React from 'react';
import Image from 'next/image';
import { Center } from 'app/types';
import './CenterCard.scss';
import CardBadge from './CardBadge';
import Link from 'next/link';
import { LaunchIcon } from '../Icons';

interface CenterCardProps {
  center: Center;
  isFirst?: boolean;
}

export const CenterCard: React.FC<CenterCardProps> = ({ center, isFirst }) => {
  return (
    <div
      className={`center-card bg-ink border-1px border-base-darkest radius-md padding-y-5 padding-x-3 ${isFirst ? 'is-first' : 'is-secondary'}`}
    >
      {isFirst && (
        <div className='center-card__image'>
          <Image
            width={400}
            height={400}
            src={center.image}
            alt={center.imageAlt}
            className='width-full height-full object-cover'
            unoptimized
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
