import React from 'react';
import Link from 'next/link';
import { Grid, GridContainer, Table } from '@trussworks/react-uswds';

import { Paragraph } from 'app/components/common/Paragraph';
import Separator from 'app/components/common/Separator';
import Carousel from 'app/components/common/Carousel';
import { createImageSlides } from 'app/utils/slides';
import images from 'app/content/images.json';
import { ArrowBackIcon } from 'app/components/common/Icons';
import Tabs from 'app/components/common/Tabs';
import { tabs } from './tabs';
import ScrollToTop from 'app/components/ScrollToTop';

const FrostMuseumPage: React.FC = () => {
  const slidesIntro = createImageSlides(
    images['frost-museum'].intro,
  );

  return (
    <>
      <ScrollToTop />

      <GridContainer
        containerSize='desktop-lg'
        className='desktop:padding-top-10'
      >
        <Grid
          row
          className='mobile:margin-top-2 desktop:margin-top-0 desktop:margin-bottom-4'
        >
          <Link
            href='/visit'
            className='usa-link cursor-pointer display-inline-flex flex-align-center
'
          >
            <ArrowBackIcon
              size={3}
              className='margin-right-1'
              aria-hidden='true'
            />
            Back
          </Link>
        </Grid>
        <Grid row className='margin-bottom-4 measure-4'>
          <h1 className='text-uppercase'>
            Phillip and Patricia Frost Museum of Science 
          </h1>
          <Paragraph>
           NASA's EIC is on display in Frost Science's vizLab gallery, located on Level 1 in the Frost Planetarium lobby. 
          </Paragraph>
        </Grid>
      </GridContainer>

      <Separator />

      <GridContainer containerSize='desktop-lg'>
        <Grid row gap={6}>
          <Grid col desktop={{ col: 6 }}>
            <Table bordered={false}>
              <tbody>
                <tr>
                  <th scope='row' className='text-bold'>
                    Admission
                  </th>
                  <td className='measure-1'>
                    Rates vary
                  </td>
                </tr>
                <tr>
                  <th scope='row' className='text-bold'>
                    Hours
                  </th>
                  <td className='measure-1'>
                    Open every day of the year
                    <br/>
                    Monday - Thursday, 10:00am - 5:00pm
                    <br/>
                    Friday - Sunday, 10:00am - 6:00pm 
                  </td>
                </tr>
                <tr>
                  <th scope='row' className='text-bold'>
                    Address
                  </th>
                  <td className='measure-1'>
                    Phillip and Patricia Frost Museum of Science, Frost Planetarium lobby
                    <br />
                    1101 Biscayne Blvd.
                    <br />
                    Miami, FL 33132
                  </td>
                </tr>
              </tbody>
            </Table>
          </Grid>
          <Grid desktop={{ col: 6 }}>
            <Carousel fade={true} slides={slidesIntro} />
          </Grid>
        </Grid>
      </GridContainer>

      <Separator />

      <GridContainer containerSize='desktop-lg'>
        <Grid row>
          <h2 className='text-uppercase'>FEATURES</h2>
        </Grid>
        <Tabs tabs={tabs} />
      </GridContainer>
    </>
  );
};

export default FrostMuseumPage;
