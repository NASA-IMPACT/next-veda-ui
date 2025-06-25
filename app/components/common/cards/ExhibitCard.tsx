'use client';
import React from 'react';
import { CardMedia, CardBody } from '@trussworks/react-uswds';
import Image from 'next/image';
import Link from 'next/link';
import CardBadge from './CardBadge';
import SmallCard from './SmallCard';
import './ExhibitCard.scss';

export interface Exhibit {
  id: string;
  heading: string;
  openingHours: string[];
  address: string[];
  imgSrc: string;
  imgAlt: string;
  description?: string;
}

interface FormattedSectionProps {
  heading: string;
  lines: string[];
}

interface ExhibitCardProps {
  exhibit: Exhibit;
  showDescription?: boolean;
  containerProps?: { className?: string };
}

const FormattedSection: React.FC<FormattedSectionProps> = ({
  heading,
  lines,
}) => {
  return (
    <>
      <h3 className='margin-bottom-0 line-height-sans-1'>{heading}</h3>
      {lines.map((line, index) => (
        <div key={index} className='line-height-sans-1'>
          {line}
        </div>
      ))}
    </>
  );
};

export const ExhibitCard: React.FC<ExhibitCardProps> = ({
  exhibit,
  showDescription,
  containerProps,
}) => {
  return (
    <SmallCard
      key={exhibit.id}
      className='exhibit-card'
      containerProps={containerProps}
    >
      <CardMedia exdent className='position-relative'>
        <CardBadge
          label='Exhibit'
          icon='AccountBalance'
          className='position-absolute top-0 left-0 padding-2'
        />
        <div className='height-card-lg'>
          <Image
            width={400}
            height={400}
            src={exhibit.imgSrc}
            alt={exhibit.imgAlt}
            className='width-full'
          />
          <div className='card-overlay' />
        </div>
        <h2 className='position-absolute bottom-0 width-full padding-2 bg-white-90 margin-0 text-white'>
          {exhibit.heading}
        </h2>
      </CardMedia>
      <CardBody className='font-body-2xs height-card margin-top-2'>
        {showDescription ? (
          <p>{exhibit.description}</p>
        ) : (
          <>
            <FormattedSection heading='Hours' lines={exhibit.openingHours} />
            <FormattedSection heading='Address' lines={exhibit.address} />
          </>
        )}
      </CardBody>

      <Link
        className='position-absolute top-0 left-0 width-full height-full'
        href={`/visit/exhibit/${exhibit.id}`}
        aria-label={`View details for ${exhibit.heading} exhibit.`}
      />
    </SmallCard>
  );
};

export default ExhibitCard;
