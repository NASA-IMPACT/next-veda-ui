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

const KennedySpaceCenterPage: React.FC = () => {
  const slidesIntro = createImageSlides(images['kennedy-space-center'].intro);

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
          <h1 className='text-uppercase'>KENNEDY SPACE CENTER</h1>
          <Paragraph>
            The Earth Information Center exhibit at the Kennedy Space Center Visitor Complex is located at Launch Complex 39 on the bus tour.  The center includes a data hub featuring an immersive theater show, a Hyperwall display, and an interactive exhibit gallery.
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

export default KennedySpaceCenterPage;
