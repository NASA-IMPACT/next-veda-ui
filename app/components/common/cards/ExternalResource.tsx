'use client';
import React from 'react';
import Link from 'next/link';
import { CardBadgeContent } from './CardBadge';
import { Icon, Card, CardMedia, CardBody } from '@trussworks/react-uswds';
import './ExternalResource.scss';

type ExternalResource = {
  title: string;
  description: string;
  linkURL: string;
  imgSrc: string;
  imgAlt: string;
};

export function StoryCard({
  title,
  description,
  linkURL,
  imgSrc,
  imgAlt,
}: ExternalResource) {
  return (
    <Card
      layout='flagDefault'
      className='usa-list--unstyled'
      gridLayout={{
        tablet: {
          col: 6,
        },
      }}
      containerProps={{ className: 'story-card' }}
    >
      <CardMedia>
        <img src={imgSrc} alt={imgAlt} />
      </CardMedia>
      <CardBody>
        <div>
          <CardBadgeContent label='External Link' icon='Link' />
        </div>
        <div className='margin-top-2'>
          <h2 className='card-title text-uppercase text-medium font-sans-md'>
            <span>{title}</span>
            <Icon.ArrowForward
              className='arrow-icon'
              size={3}
              aria-label={`View story`}
            />
          </h2>
          <p className='font-sans-3xs margin-top-0'>{description}</p>
        </div>
        <Link
          className='position-absolute top-0 left-0 width-full height-full'
          href={linkURL}
          aria-label={`Link to the external resource.`}
          target='_blank'
          rel='noopener noreferrer'
        />
      </CardBody>
    </Card>
  );
}

export function ExternalResources({
  resources,
}: {
  resources: ExternalResource[];
}) {
  return (
    <ul className='usa-card-group'>
      {resources.map((story) => (
        <StoryCard key={story.title} {...story} />
      ))}
    </ul>
  );
}
