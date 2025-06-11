import React from 'react';
import { Grid, GridContainer } from '@trussworks/react-uswds';
import { CenterCard } from 'app/components/common/cards/CenterCard';
import { DATA_CENTERS } from 'app/constants';

const CentersSection: React.FC = () => {
  const [firstCenter, ...remainingCenters] = DATA_CENTERS;

  return (
    <GridContainer containerSize='desktop-lg'>
      <Grid row>
        <h2 className='text-uppercase'>Explore our centers</h2>
      </Grid>

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
            tablet={{ col: 6 }}
            desktop={{ col: 6 }}
            className='margin-y-2'
          >
            <CenterCard center={center} isFirst={false} />
          </Grid>
        ))}
      </Grid>
    </GridContainer>
  );
};

export default CentersSection;
