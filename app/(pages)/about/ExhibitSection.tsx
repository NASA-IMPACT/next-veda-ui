'use client';
import React from 'react';
import { CardGroup } from '@trussworks/react-uswds';
import { DATA_EXHIBITS as exhibits } from 'app/constants';
import ExhibitCard from 'app/components/common/cards/ExhibitCard';

interface ExhibitSectionProps {
  featuredExhibitId?: string;
  className?: string;
}

const ExhibitSection: React.FC<ExhibitSectionProps> = ({
  featuredExhibitId = 'smithsonian-museum',
  className = 'margin-top-1',
}) => {
  const featuredExhibit = exhibits.find((e) => e.id === featuredExhibitId);
  const otherExhibits = exhibits.filter((e) => e.id !== featuredExhibitId);

  return (
    <CardGroup className={`display-flex flex-column ${className}`}>
      {featuredExhibit && (
        <ExhibitCard
          exhibit={featuredExhibit}
          variant='filled'
          containerProps={{
            className: 'border-base-lightest bg-base-lightest',
          }}
        />
      )}

      {otherExhibits.length > 0 && (
        <li className='grid-row grid-gap margin-top-1'>
          {otherExhibits.map((exhibit) => (
            <ul className='grid-col-12 tablet:grid-col-6' key={exhibit.id}>
              <ExhibitCard
                exhibit={exhibit}
                variant='filled'
                containerProps={{
                  className: 'border-base-lightest bg-base-lightest',
                }}
              />
            </ul>
          ))}
        </li>
      )}
    </CardGroup>
  );
};

export default ExhibitSection;
