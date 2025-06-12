'use client';

import React from 'react';
import { Card, Icon } from '@trussworks/react-uswds';
import './InteractiveCard.scss';
import Image from 'next/image';
import CardBadge from './CardBadge';
import Link from 'next/link';

interface InteractiveCardProps {
  id: string;
  url: string;
  title: string;
  description: string;
  className?: string;
  imageAlt: string;
}

export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  id,
  url,
  title,
  description,
  className = '',
  imageAlt,
}) => {
  return (
    <Card id={id} className={`interactive-card ${className}`}>
      <div className='card-image-container'>
        <Image
          fill
          src={`/images/interactives/${id}/card.png`}
          alt={imageAlt}
          className='object-cover'
        />
        <div className='card-image-overlay' />
        {/* 
          Two-layer content structure:
          - Outer layer (card-content): Full-card overlay with flex centering
          - Inner layer (content-block): Content container with max-width and spacing
        */}
        <div className='card-content'>
          <div className='content-block'>
            <CardBadge
              label='Interactive'
              icon='Lightbulb'
              className='position-absolute top-0 left-0'
            />
            <h3 className='card-title text-uppercase font-body font-weight-bold font-body-xl line-height-sans-1'>
              <span>{title}</span>
              <Icon.ArrowForward
                className='arrow-icon'
                size={3}
                aria-label={`View ${title} interactive tool.`}
              />
            </h3>
            <p className='card-description font-body-3xs line-height-sans-4'>
              {description}
            </p>
          </div>
        </div>
      </div>
      <Link
        className='position-absolute top-0 left-0 width-full height-full overlay-link'
        href={url}
        aria-label={`View ${title} interactive tool.`}
        target='_blank'
        rel='noopener noreferrer'
      />
    </Card>
  );
};

export default InteractiveCard;
