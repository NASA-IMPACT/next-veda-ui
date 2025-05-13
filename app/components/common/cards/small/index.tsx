import React from 'react';
import {
  Card,
  CardMedia,
  CardHeader,
  CardBody,
  Icon,
} from '@trussworks/react-uswds';
import Image from 'next/image';
import Link from 'next/link';

export interface SmallCardProps {
  id: string;
  heading: string;
  imgSrc: string;
  imgAlt: string;
  linkHref: string;
  linkLabel: string;
  badge?: {
    icon: typeof Icon.AccountBalance;
    text: string;
  };
  gridLayout?: {
    desktop?: { col: 4 | 6 | 8 | 12 };
    tablet?: { col: 4 | 6 | 8 | 12 };
  };
  children?: React.ReactNode;
}

export const SmallCard: React.FC<SmallCardProps> = ({
  id,
  heading,
  imgSrc,
  imgAlt,
  linkHref,
  linkLabel,
  badge,
  gridLayout = { desktop: { col: 4 }, tablet: { col: 6 } },
  children,
}) => {
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
      key={id}
      gridLayout={gridLayout}
      className={`padding-x-2 ${children ? 'padding-bottom-4' : ''}`}
    >
      <CardHeader />
      <CardMedia exdent className='position-relative'>
        {badge && (
          <div className='position-absolute top-0 left-0 padding-2 z-top'>
            <div className='bg-white padding-x-1 display-flex flex-align-center radius-md text-base-dark'>
              <badge.icon className='margin-right-1' aria-hidden='true' />
              <span>{badge.text}</span>
            </div>
          </div>
        )}
        <div className='height-card-lg'>
          <Image
            width={400}
            height={400}
            src={imgSrc}
            alt={imgAlt}
            className='width-full'
          />
          <div style={overlayStyle} />
        </div>
        <h2 className='position-absolute bottom-0 width-full padding-2 bg-white-90 margin-0 text-white'>
          {heading}
        </h2>
      </CardMedia>
      {children && (
        <CardBody className='font-body-2xs height-card'>{children}</CardBody>
      )}
      <Link
        className='position-absolute top-0 left-0 width-full height-full'
        href={linkHref}
        aria-label={linkLabel}
      />
    </Card>
  );
};

export default SmallCard;
