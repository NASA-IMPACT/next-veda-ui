import React from 'react';
import Link from 'next/link';
import { Grid, GridContainer, Table } from '@trussworks/react-uswds';

import { Paragraph } from 'app/components/common/Paragraph';
import Separator from 'app/components/common/Separator';
import Carousel from 'app/components/common/Carousel';
import { createImageSlides } from 'app/utils/slides';
import images from 'app/content/images.json';
import { ArrowBackIcon } from 'app/components/common/Icons';

const KennedySpaceCenterPage: React.FC = () => {
  const slidesIntro = createImageSlides(images['kennedy-space-center'].intro);
  const slidesHyperwall = createImageSlides(
    images['kennedy-space-center'].hyperwall,
  );

  return (
    <>
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
        <Grid row gap={6}>
          <Grid desktop={{ col: 6 }}>
            <Paragraph className='measure-4 desktop:measure-2'>
              The Hyperwall features videos, dashboards with real-time data on
              climate and Earth science, along with dazzling imagery of our
              planet. The Earth Information Center collects information about
              Earth on a variety of scales ranging from ground-based data to
              space-based observations from all our inter-agency partners.
              Collecting information at each scale is important and, when
              combined, provides a comprehensive understanding of how the
              components of the atmosphere, land and ocean influence each other.
              With this understanding the datasets become more powerful tools
              for addressing environmental challenges and climate change.
            </Paragraph>
          </Grid>
          <Grid desktop={{ col: 6 }}>
            <Carousel fade={true} slides={slidesHyperwall} />
          </Grid>
        </Grid>
      </GridContainer>
    </>
  );
};

export default KennedySpaceCenterPage;
