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
        <div style={{ position: 'relative' }}>
          <Image
            width={300}
            height={300}
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
      <CardBody>
        <h3 className='margin-bottom-1'>Hours</h3>
        <ul className='usa-list'>
          {exhibit.openingHours.map((hour, index) => (
            <li key={index}>{hour}</li>
          ))}
        </ul>
        <h3 className='margin-bottom-1'>Address</h3>
        <ul className='usa-list'>
          {exhibit.address.map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
};
