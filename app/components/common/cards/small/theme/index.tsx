'use client';
import React from 'react';
import { Icon } from '@trussworks/react-uswds';
import SmallCard from '../index';
import type { Theme } from 'app/types';

export const ThemeCard: React.FC<{ theme: Theme }> = ({ theme }) => {
  return (
    <SmallCard
      id={theme.id}
      heading={theme.title}
      imgSrc={theme.cardImage}
      imgAlt={`${theme.title} theme cover image`}
      linkHref={`/themes/${theme.id}`}
      linkLabel={`View ${theme.title} theme details.`}
      badge={{
        icon: Icon.Lightbulb,
        text: 'Theme',
      }}
    />
  );
};

export default ThemeCard;
