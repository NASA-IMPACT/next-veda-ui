import React from 'react';
import { Icon } from '@trussworks/react-uswds';
import SmallCard from './SmallCard';
import type { Exhibit } from 'app/types';

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
      <h3 className='margin-bottom-0 line-height-sans-1'>{heading}</h3>
      {lines.map((line, index) => (
        <div key={index} className='line-height-sans-1'>
          {line}
        </div>
      ))}
    </>
  );
};

export const ExhibitCard: React.FC<{ exhibit: Exhibit }> = ({ exhibit }) => {
  return (
    <SmallCard
      id={exhibit.id}
      heading={exhibit.heading}
      imgSrc={exhibit.imgSrc}
      imgAlt={exhibit.imgAlt}
      linkHref={`/visit/exhibit/${exhibit.id}`}
      linkLabel={`View details for ${exhibit.heading} exhibit.`}
      badge={{
        icon: Icon.AccountBalance,
        text: 'Exhibit',
      }}
    >
      <FormattedSection heading='Hours' lines={exhibit.openingHours} />
      <FormattedSection heading='Address' lines={exhibit.address} />
    </SmallCard>
  );
};

export default ExhibitCard;
