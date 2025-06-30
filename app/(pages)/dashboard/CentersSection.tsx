import React from 'react';
import { Grid } from '@trussworks/react-uswds';
import { CenterCard } from 'app/components/common/cards/CenterCard';
import { DATA_CENTERS } from 'app/constants';

const CentersSection: React.FC = () => {
  return (
    <Grid row gap={5}>
      {DATA_CENTERS.map((center) => (
        <Grid
          key={center.id}
          col={12}
          tabletLg={{ col: 12 }}
          desktop={{ col: 4 }}
          className='margin-y-2'
        >
          <CenterCard center={center} isWide={false} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CentersSection;
