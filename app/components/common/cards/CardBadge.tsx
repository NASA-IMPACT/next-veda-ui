'use client';

import React from 'react';
import { LanguageIcon, AccountBalanceIcon } from '../Icons';
import './CardBadge.scss';

const BADGE_ICONS = {
  Language: LanguageIcon,
  AccountBalance: AccountBalanceIcon,
} as const;

interface CardBadgeProps {
  label: string;
  icon: keyof typeof BADGE_ICONS;
}

/**
 * CardBadge Component
 *
 * A reusable badge component that displays an icon and label.
 *
 * @requires Parent component to have `isolation: isolate` CSS property
 * @param {CardBadgeProps} props - Component props
 * @returns {React.ReactElement} A badge with an icon and label
 */
export const CardBadge: React.FC<CardBadgeProps> = ({ label, icon }) => {
  const IconComponent = BADGE_ICONS[icon];

  return (
    <div className='position-absolute top-0 left-0 padding-2 card-badge'>
      <div className='bg-white padding-x-1 display-flex flex-align-center radius-md text-base-dark'>
        <IconComponent className='margin-right-1' aria-hidden={true} />
        <span>{label}</span>
      </div>
    </div>
  );
};

export default CardBadge;
