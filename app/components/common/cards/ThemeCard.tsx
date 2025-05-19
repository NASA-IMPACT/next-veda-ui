'use client';

import React from 'react';
import Link from 'next/link';
import { CardMedia } from '@trussworks/react-uswds';
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

const overlayStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
};

export const ThemeCard: React.FC<{ theme: Theme }> = ({ theme }) => {
  return (
    <SmallCard key={theme.id} className='theme-card'>
      <CustomCardMedia className='position-relative'>
        <CardBadge label='Theme' icon='Language' />
        <div className='height-full'>
          <Image
            width={400}
            height={400}
            src={theme.cardImage}
            alt={`${theme.title} theme image`}
            className='width-full height-full object-cover'
          />
          <div style={overlayStyle} />
        </div>
        <h2 className='position-absolute bottom-0 width-full padding-2 bg-white-90 margin-0 text-white'>
          {theme.title}
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
