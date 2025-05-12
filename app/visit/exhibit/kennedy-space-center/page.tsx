import React from 'react';
import { Grid, GridContainer, Table } from '@trussworks/react-uswds';

import { Paragraph } from 'app/components/common/Paragraph';
import Separator from 'app/components/common/Separator';

const KennedySpaceCenterPage: React.FC = () => {
  return (
    <>
      <GridContainer
        containerSize='desktop-lg'
        className='desktop:padding-top-10'
      >
        <Grid row className='margin-bottom-4 measure-1 desktop:measure-4'>
          <h1 className='text-uppercase'>KENNEDY SPACE CENTER</h1>
          <Paragraph>
            The Earth Information Center exhibit at the Kennedy Space Center
            Visitor Complex reimagines the observation gantry at Launch Complex
            39 and includes a data hub featuring a theater show, a Hyperwall
            display, and an interactive exhibit gallery.
          </Paragraph>
        </Grid>
      </GridContainer>

      <Separator />

      <GridContainer containerSize='desktop-lg'>
        <Grid row>
          <Grid col desktop={{ col: 6 }}>
            <Table bordered={false}>
              <tbody>
                <tr>
                  <th scope='row' className='text-bold'>
                    Admission
                  </th>
                  <td className='measure-1'>Free</td>
                </tr>
                <tr>
                  <th scope='row' className='text-bold'>
                    Hours
                  </th>
                  <td className='measure-1'>
                    Every day (except Dec 25), 9am - 5pm
                  </td>
                </tr>
                <tr>
                  <th scope='row' className='text-bold'>
                    Address
                  </th>
                  <td className='measure-1'>
                    Kennedy Space Center Visitor Complex,
                    <br />
                    The Gantry at LC-39
                    <br />
                    Space Commerce Way,
                    <br />
                    Merritt Island, FL 32953
                  </td>
                </tr>
              </tbody>
            </Table>
          </Grid>
        </Grid>
      </GridContainer>

      <Separator />

      <GridContainer containerSize='desktop-lg'>
        <Grid row>{/* Add other content here! */}</Grid>
      </GridContainer>
    </>
  );
};

export default KennedySpaceCenterPage;
