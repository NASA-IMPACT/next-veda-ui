'use client';

import React from 'react';
import { LanguageIcon, AccountBalanceIcon, LightbulbIcon, LinkIcon } from '../Icons';
import './CardBadge.scss';

const BADGE_ICONS = {
  Language: LanguageIcon,
  AccountBalance: AccountBalanceIcon,
  Lightbulb: LightbulbIcon,
  Link: LinkIcon
} as const;

interface CardBadgeProps {
  label: string;
  icon: keyof typeof BADGE_ICONS;
  className?: string;
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

export const CardBadgeContent: React.FC<CardBadgeProps> = ({ label, icon }) => {
  const IconComponent = BADGE_ICONS[icon];

  return (
    <div className='card-badge display-inline-block'>
      <div className='bg-white padding-x-1 display-flex flex-align-center radius-md text-base-dark font-body-3xs'>
        <IconComponent className='margin-right-05' aria-hidden={true} />
        <span>{label}</span>
      </div>
    </div>
  );
}

export const CardBadge: React.FC<CardBadgeProps> = ({ label, icon, className }) => {
  const IconComponent = BADGE_ICONS[icon];

  return (
    <div className={`card-badge font-body-2xs line-height-sans-3 ${className}`}>
      <div className='bg-white padding-x-1 padding-y-05 display-flex flex-align-center radius-md text-base-dark'>
        <IconComponent className='margin-right-05' aria-hidden={true} />
        <span>{label}</span>
      </div>
    </div>
  );
};

export default CardBadge;
