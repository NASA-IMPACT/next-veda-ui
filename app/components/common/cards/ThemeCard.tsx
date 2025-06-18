'use client';

import React from 'react';
import Link from 'next/link';
import { CardMedia, Icon } from '@trussworks/react-uswds';
import Image from 'next/image';
import type { Theme } from 'app/types';
import CardBadge from './CardBadge';
import SmallCard from './SmallCard';
import './ThemeCard.scss';

interface CustomCardMediaProps extends React.ComponentProps<typeof CardMedia> {
  children: React.ReactNode;
  className?: string;
}

const CustomCardMedia: React.FC<CustomCardMediaProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <CardMedia exdent className={`${className} custom-card-media`} {...props}>
      {children}
    </CardMedia>
  );
};

export const ThemeCard: React.FC<{ theme: Theme }> = ({ theme }) => {
  return (
    <SmallCard key={theme.id} className='theme-card'>
      <CustomCardMedia className='position-relative'>
        <CardBadge
          label='Earth Theme'
          icon='Language'
          className='position-absolute top-0 left-0 padding-2'
        />
        <div className='height-full'>
          <Image
            width={400}
            height={400}
            src={theme.cardImage}
            alt={`${theme.title} theme image`}
            className='width-full height-full object-cover'
            unoptimized
          />
          <div className='card-overlay' />
        </div>
        <h2 className='card-title text-uppercase'>
          <span>{theme.title}</span>
          <Icon.ArrowForward
            className='arrow-icon'
            size={3}
            aria-label={`View ${theme.title} theme details`}
          />
        </h2>
      </CustomCardMedia>
      <Link
        className='position-absolute top-0 left-0 width-full height-full'
        href={`/themes/${theme.id}`}
        aria-label={`View ${theme.title} theme details.`}
      />
    </SmallCard>
  );
};

export default ThemeCard;
