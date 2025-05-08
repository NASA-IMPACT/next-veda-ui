import React from 'react';
import {
  Grid,
  GridContainer,
  Card,
  CardMedia,
  CardHeader,
  CardBody,
} from '@trussworks/react-uswds';
import { Paragraph } from 'app/components/common/Paragraph';
import Image from 'next/image';

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

const renderCenterCard = (card: CenterCard) => (
  <Card key={card.key}>
    <CardHeader>
      <h2 className='margin-top-0'>{card.heading}</h2>
    </CardHeader>
    <CardMedia>
      <Image width={300} height={300} src={card.imgSrc} alt={card.imgAlt} />
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
      <Grid row>{centerCards.map(renderCenterCard)}</Grid>
    </GridContainer>
  );
};

export default VisitPage;
