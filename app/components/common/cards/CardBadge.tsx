'use client';

import React from 'react';
import { LanguageIcon, AccountBalanceIcon, LightbulbIcon } from '../Icons';
import './CardBadge.scss';

const BADGE_ICONS = {
  Language: LanguageIcon,
  AccountBalance: AccountBalanceIcon,
  Lightbulb: LightbulbIcon,
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
export const CardBadge: React.FC<CardBadgeProps> = ({
  label,
  icon,
  className = '',
}) => {
  const IconComponent = BADGE_ICONS[icon];

  return (
    <div className={`position-absolute top-0 left-0 card-badge ${className}`}>
      <div className='bg-white padding-x-1 display-flex flex-align-center radius-md text-base-dark font-body-3xs'>
        <IconComponent className='margin-right-05' aria-hidden={true} />
        <span>{label}</span>
      </div>
    </div>
  );
};

export default CardBadge;
