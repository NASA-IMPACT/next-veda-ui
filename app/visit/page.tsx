'use client';
import React from 'react';
import {
  Grid,
  GridContainer,
  Card,
  CardMedia,
  CardHeader,
  CardBody,
  Button,
  Icon,
} from '@trussworks/react-uswds';
import { Paragraph } from 'app/components/common/Paragraph';
import Image from 'next/image';
import { CSSProperties } from 'react';

interface CenterCard {
  key: string;
  heading: string;
  openingHours: string[];
  address: string[];
  imgSrc: string;
  imgAlt: string;
}

const centerCards: CenterCard[] = [
  {
    key: 'nasa-hq',
    heading: 'NASA HQ',
    openingHours: ['Monday - Friday', '8:30am - 5:30pm'],
    address: [
      'NASA Headquarters (East Lobby)',
      '300 E St. SW, Washington, DC 20546',
    ],
    imgSrc: '/images/visit/nasa-hq.png',
    imgAlt: 'NASA HQ exhibit view',
  },
  {
    key: 'smithsonian-museum',
    heading: 'Smithsonian National Museum of Natural History',
    openingHours: ['Every day (closed on Christmas)', '10am - 5:30pm'],
    address: [
      'Smithsonian National Museum of Natural History',
      '1000 Madison Dr, Washington, DC 20560',
    ],
    imgSrc: '/images/visit/smithsoniam-museum.jpg',
    imgAlt: 'Smithsonian National Museum of Natural History exterior view',
  },
  {
    key: 'kennedy-space-center',
    heading: 'Kennedy Space Center',
    openingHours: ['Every day (closed on Christmas)', '9am - 5pm'],
    address: [
      'KSC Visitor Complex (The Gantry at LC-39)',
      'Space Commerce Way, Merritt Island, FL 32953',
    ],
    imgSrc: '/images/visit/kennedy-space-center.png',
    imgAlt: 'Kennedy Space Center exterior view',
  },
];

const CenterCardComponent: React.FC<{ card: CenterCard }> = ({ card }) => {
  const overlayStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  };

  return (
    <Card
      key={card.key}
      gridLayout={{ desktop: { col: 4 }, tablet: { col: 6 } }}
    >
      <CardHeader />
      <CardMedia exdent className='position-relative'>
        <div className='position-absolute top-0 left-0 padding-2 z-top'>
          <Button className='usa-button' type='button'>
            <Icon.Home size={3} className='' aria-hidden='true' />
            Exhibit
          </Button>
        </div>
        <div style={{ position: 'relative' }}>
          <Image
            width={300}
            height={300}
            src={card.imgSrc}
            alt={card.imgAlt}
            className='width-full'
          />
          <div style={overlayStyle} />
        </div>
        <h2 className='position-absolute bottom-0 width-full padding-2 bg-white-90 margin-0 text-white'>
          {card.heading}
        </h2>
      </CardMedia>
      <CardBody>
        <h3 className='margin-bottom-1'>Hours</h3>
        <ul className='usa-list'>
          {card.openingHours.map((hour, index) => (
            <li key={index}>{hour}</li>
          ))}
        </ul>
        <h3 className='margin-bottom-1'>Address</h3>
        <ul className='usa-list'>
          {card.address.map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
};

const VisitPage: React.FC = () => {
  return (
    <GridContainer containerSize='desktop-lg' className='desktop:padding-y-10'>
      <Grid row className='margin-bottom-4 measure-1 desktop:measure-4'>
        <h1 className='text-uppercase'>Plan your visit</h1>
        <Paragraph>
          The Earth Information Center currently has three physical exhibits
          located at: NASA HQ (Washington, DC), Smithsonian Museum of Natural
          History (Washington, DC), and Kennedy Space Center (Merritt Island,
          Florida). All exhibits are open to the public.
        </Paragraph>
      </Grid>
      <Grid row gap>
        {centerCards.map((card) => (
          <CenterCardComponent key={card.key} card={card} />
        ))}
      </Grid>
    </GridContainer>
  );
};

export default VisitPage;
