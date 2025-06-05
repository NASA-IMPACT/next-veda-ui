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

const SmithsonianMuseumPage: React.FC = () => {
  const slidesIntro = createImageSlides(
    images['smithsonian-museum-nmnh'].intro,
  );
  const slidesHyperwall = createImageSlides(
    images['smithsonian-museum-nmnh'].hyperwall,
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
          <h1 className='text-uppercase'>
            Smithsonian National Museum of Natural History
          </h1>
          <Paragraph>
            The Earth Information Center exhibit at the Smithsonian’s National
            Museum of Natural History includes a video wall displaying Earth
            science data visualizations and videos, an interpretive panel
            showing Earth’s connected systems, information on our changing
            world, and an overview of how NASA and the Smithsonian study our
            home planet.
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
                    Every day (except Dec 25), 10am - 5:30pm
                  </td>
                </tr>
                <tr>
                  <th scope='row' className='text-bold'>
                    Address
                  </th>
                  <td className='measure-1'>
                    Smithsonian National Museum of Natural History, 2nd Floor
                    <br />
                    1000 Madison Drive NW
                    <br />
                    Washington, D.C. 20560
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

export default SmithsonianMuseumPage;
