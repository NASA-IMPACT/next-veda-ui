'use client';

import React from 'react';
import Link from 'next/link';
import type { Theme } from 'app/types';
import CardBadge from './CardBadge';
import SmallCard from './SmallCard';
import './ThemeCard.scss';

export const ThemeCard: React.FC<{ theme: Theme }> = ({ theme }) => {
  return (
    <SmallCard key={theme.id} className='theme-card'>
      <div
        className='position-relative height-full'
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${theme.cardImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 'inherit',
        }}
      >
        <CardBadge label='Theme' icon='Language' />
        <h2 className='position-absolute bottom-0 width-full padding-2 bg-white-90 margin-0 text-white'>
          {theme.title}
        </h2>
        <Link
          className='position-absolute top-0 left-0 width-full height-full'
          href={`/themes/${theme.id}`}
          aria-label={`View ${theme.title} theme details.`}
        />
      </div>
    </SmallCard>
  );
};

export default ThemeCard;
