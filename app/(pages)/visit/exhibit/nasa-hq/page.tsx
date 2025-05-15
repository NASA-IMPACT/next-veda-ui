import React from 'react';
import { Grid, GridContainer, Table } from '@trussworks/react-uswds';

import { Paragraph } from 'app/components/common/Paragraph';
import Separator from 'app/components/common/Separator';
import Carousel from 'app/components/common/Carousel';
import { createImageSlides } from 'app/utils/slides';
import images from 'app/content/images.json';

const NasaHqPage: React.FC = () => {
  const slidesIntro = createImageSlides(images['nasa-hq'].intro);
  const slidesHyperwall = createImageSlides(images['nasa-hq'].hyperwall);

  return (
    <>
      <GridContainer
        containerSize='desktop-lg'
        className='desktop:padding-top-10'
      >
        <Grid row className='margin-bottom-4 measure-4'>
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
        <Grid row gap={6}>
          <Grid desktop={{ col: 6 }}>
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

export default NasaHqPage;
