import React from 'react';
import { Grid, GridContainer, Table } from '@trussworks/react-uswds';

import { Paragraph } from 'app/components/common/Paragraph';
import Separator from 'app/components/common/Separator';

const NasaHqPage: React.FC = () => {
  return (
    <>
      <GridContainer
        containerSize='desktop-lg'
        className='desktop:padding-top-10'
      >
        <Grid row className='margin-bottom-4 measure-1 desktop:measure-4'>
          <h1 className='text-uppercase'>NASA HQ</h1>
          <Paragraph>
            The Earth Information Center at HQ is a physical and virtual
            experience at NASA Headquarters, where visitors can see how our
            planet is changing in areas that affect lives and livelihoods– from
            temperatures in our cities to sea level rise, greenhouse gas
            emissions to agricultural productivity.
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
                    Monday - Friday, 8:30am - 5:30pm
                  </td>
                </tr>
                <tr>
                  <th scope='row' className='text-bold'>
                    Address
                  </th>
                  <td className='measure-1'>
                    Mary W. Jackson NASA HQ East Lobby
                    <br />
                    300 E St. SW
                    <br />
                    Washington, DC 20546
                  </td>
                </tr>
                <tr>
                  <th scope='row' className='text-bold'>
                    Group Visits
                  </th>
                  <td className='measure-1'>
                    For organized groups and schools planning a visit, please
                    reach out via our contact form.
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

export default NasaHqPage;
