import React from 'react';
import { Grid } from '@trussworks/react-uswds';

import Carousel from 'app/components/common/Carousel';
import { Paragraph } from 'app/components/common/Paragraph';
import { createImageSlides } from 'app/utils/slides';
import images from 'app/content/images.json';

export const tabs = [
  {
    id: 'hyperwall',
    title: 'Hyperwall',
    content: (
      <Grid row gap={6}>
        <Grid desktop={{ col: 6 }}>
          <Paragraph className='measure-4 desktop:measure-2'>
            The Hyperwall features videos, dashboards with real-time data on Earth systems, along with an integrated view of our planet. The Earth Information Center collects information about Earth on a variety of scales ranging from ground-based data to space-based observations from all our inter-agency partners. Collecting information at each scale is important and, when combined, provides a comprehensive understanding of how the components of the atmosphere, land and ocean influence each other. With this understanding the datasets become more powerful tools for decision-making.
          </Paragraph>
        </Grid>
        <Grid desktop={{ col: 6 }}>
          <Carousel
            fade={true}
            slides={createImageSlides(images['kennedy-space-center'].hyperwall)}
          />
        </Grid>
      </Grid>
    ),
  },
  {
    id: 'dome-to-dome',
    title: 'Dome to Dome',
    content: (
      <Grid row gap={6}>
        <Grid desktop={{ col: 6 }}>
          <Paragraph className='measure-4 desktop:measure-2'>
          Dome to Dome is an immersive audio-visual installation based on a spoken word narrative that explores the relationship between humans and their home planet through the lense of Bruce McCandless’s well-known spacewalk.  Dome to Dome can accommodate approximately 25 visitors at one time.
          </Paragraph>
        </Grid>
        <Grid desktop={{ col: 6 }}>
          <Carousel
            fade={true}
            slides={createImageSlides(images['kennedy-space-center'].hyperwall)}
          />
        </Grid>
      </Grid>
    ),
  },
];
