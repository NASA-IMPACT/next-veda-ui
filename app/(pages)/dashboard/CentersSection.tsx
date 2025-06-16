import React from 'react';
import { Grid } from '@trussworks/react-uswds';
import { CenterCard } from 'app/components/common/cards/CenterCard';
import { DATA_CENTERS } from 'app/constants';

const CentersSection: React.FC = () => {
  const [firstCenter, ...remainingCenters] = DATA_CENTERS;

  return (
    <>
      <Grid row className='margin-y-2'>
        <Grid col={12}>
          <CenterCard center={firstCenter} isFirst={true} />
        </Grid>
      </Grid>

      <Grid row>
        {remainingCenters.map((center) => (
          <Grid
            key={center.id}
            col={12}
            tabletLg={{ col: 6 }}
            desktop={{ col: 6 }}
            className='margin-y-2'
          >
            <CenterCard center={center} isFirst={false} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CentersSection;
