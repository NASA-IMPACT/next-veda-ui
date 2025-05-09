'use client';
import React from 'react';
import {
  Card,
  CardMedia,
  CardHeader,
  CardBody,
  Icon,
} from '@trussworks/react-uswds';
import Image from 'next/image';

export interface Exhibit {
  key: string;
  heading: string;
  openingHours: string[];
  address: string[];
  imgSrc: string;
  imgAlt: string;
}

interface FormattedSectionProps {
  heading: string;
  lines: string[];
}

const FormattedSection: React.FC<FormattedSectionProps> = ({
  heading,
  lines,
}) => {
  return (
    <>
      <h3 className='margin-bottom-0' style={{ lineHeight: '1.1' }}>
        {heading}
      </h3>
      {lines.map((line, index) => (
        <div key={index} style={{ lineHeight: '1.1' }}>
          {line}
        </div>
      ))}
    </>
  );
};

export const ExhibitCard: React.FC<{ exhibit: Exhibit }> = ({ exhibit }) => {
  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  };

  return (
    <Card
      key={exhibit.key}
      gridLayout={{ desktop: { col: 4 }, tablet: { col: 6 } }}
      className='padding-bottom-4'
    >
      <CardHeader />
      <CardMedia exdent className='position-relative'>
        <div className='position-absolute top-0 left-0 padding-2 z-top'>
          <div className='bg-white padding-x-1 display-flex flex-align-center radius-md text-base-dark'>
            <Icon.AccountBalance
              className='margin-right-1'
              aria-hidden='true'
            />
            <span>Exhibit</span>
          </div>
        </div>
        <div className='height-card-lg'>
          <Image
            width={400}
            height={400}
            src={exhibit.imgSrc}
            alt={exhibit.imgAlt}
            className='width-full'
          />
          <div style={overlayStyle} />
        </div>
        <h2 className='position-absolute bottom-0 width-full padding-2 bg-white-90 margin-0 text-white'>
          {exhibit.heading}
        </h2>
      </CardMedia>
      <CardBody className='font-body-2xs height-card'>
        <FormattedSection heading='Hours' lines={exhibit.openingHours} />
        <FormattedSection heading='Address' lines={exhibit.address} />
      </CardBody>
    </Card>
  );
};
