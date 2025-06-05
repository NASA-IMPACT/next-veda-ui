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
            The Hyperwall features videos, dashboards with real-time data on
            climate and Earth science, along with dazzling imagery of our
            planet. The Earth Information Center collects information about
            Earth on a variety of scales ranging from ground-based data to
            space-based observations from all our inter-agency partners.
            Collecting information at each scale is important and, when
            combined, provides a comprehensive understanding of how the
            components of the atmosphere, land and ocean influence each other.
            With this understanding the datasets become more powerful tools for
            addressing environmental challenges and climate change.
          </Paragraph>
        </Grid>
        <Grid desktop={{ col: 6 }}>
          <Carousel
            fade={true}
            slides={createImageSlides(images['nasa-hq'].hyperwall)}
          />
        </Grid>
      </Grid>
    ),
  },
  {
    id: 'space-for-earth',
    title: 'Space for Earth',
    content: (
      <Grid row gap={6}>
        <Grid desktop={{ col: 6 }}>
          <Paragraph className='measure-4 desktop:measure-2'>
            Space for Earth is an immersive experience that invites viewers to
            experience Earth as can only be seen from space-- as an
            interconnected world, lacking boundaries or limits. This interactive
            and immersive audio-visual installation invites visitors to explore
            Earth&apos;s changing vital signs. Observe, interact with, and
            become part of the data different federal agencies use to understand
            our changing planet. Space for Earth welcomes guests in groups of up
            to 7 at a time.
          </Paragraph>
        </Grid>
        <Grid desktop={{ col: 6 }}>
          <Carousel
            fade={true}
            slides={createImageSlides(images['nasa-hq']['space-for-earth'])}
          />
        </Grid>
      </Grid>
    ),
  },
  {
    id: 'earth-pulse',
    title: 'Earth Pulse',
    content: (
      <Grid row gap={6}>
        <Grid desktop={{ col: 6 }}>
          <Paragraph className='measure-4 desktop:measure-2'>
            The Earth Pulse displays live communication with a selection of the
            NASA/NOAA/USGS fleet of satellites that study the Earth. Activity in
            the lights means data is being transmitted, with the amount of light
            indicating the amount of data being transferred. The name of the
            specific mission communicating the data is indicated in lights on
            the sculpture.
          </Paragraph>
          <Paragraph className='measure-4 desktop:measure-2'>
            Watch the data streams and imagine what they reveal about our Earth.
          </Paragraph>
        </Grid>
        <Grid desktop={{ col: 6 }}>
          <Carousel
            fade={true}
            slides={createImageSlides(images['nasa-hq']['earth-pulse'])}
          />
        </Grid>
      </Grid>
    ),
  },
];
