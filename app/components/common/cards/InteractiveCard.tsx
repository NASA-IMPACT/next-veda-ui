'use client';

import React from 'react';
import { Card } from '@trussworks/react-uswds';
import './InteractiveCard.scss';
import Image from 'next/image';
import CardBadge from './CardBadge';

interface InteractiveCardProps {
  id: string;
  title: string;
  description: string;
  className?: string;
  imageAlt: string;
}

/**
 * InteractiveCard Component
 *
 * A card component that displays an image covering the full card area.
 *
 * @param {InteractiveCardProps} props - Component props
 * @returns {React.ReactElement} An interactive card with a full-cover image
 */
export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  id,
  title,
  description,
  className = '',
  imageAlt,
}) => {
  return (
    <Card id={id} className={`interactive-card ${className}`}>
      <div className='card-image-container'>
        <CardBadge label='Interactive' icon='Lightbulb' />

        <Image
          fill
          src={`/public/images/interactives/${id}/card.png`}
          alt={imageAlt}
          className='object-cover'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
        <div className='card-overlay' />
      </div>
    </Card>
  );
};

export default InteractiveCard;
