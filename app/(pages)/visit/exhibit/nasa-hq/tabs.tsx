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
            Earth systems, along with an integrated view of our planet. The
            Earth Information Center collects information about Earth on a
            variety of scales ranging from ground-based data to space-based
            observations from all our inter-agency partners. Collecting
            information at each scale is important and, when combined, provides
            a comprehensive understanding of how the components of the
            atmosphere, land and ocean influence each other. With this
            understanding the datasets become more powerful tools for
            decision-making.
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
    title: 'Immersive Experience',
    content: (
      <Grid row gap={6}>
        <Grid desktop={{ col: 6 }}>
          <Paragraph className='measure-4 desktop:measure-2'>
            Space for Earth is an immersive audio-visual installation that
            invites viewers to experience Earth as can only be seen from space--
            as an interconnected world, lacking boundaries or limits. This
            interactive and immersive audio-visual installation invites visitors
            to observe, interact with, and become part of the data different
            federal agencies use to understand our planet. Space for Earth
            welcomes guests in groups of up to 7 at a time.
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
            The Earth Pulse is an LED sculpture that displays live communication
            with a selection of the NASA/NOAA/USGS fleet of satellites that
            study the Earth. Activity in the lights means data is being
            transmitted, with the amount of light indicating the amount of data
            being transferred. The name of the specific mission communicating
            the data is indicated in lights on the sculpture.
          </Paragraph>
          <Paragraph className='measure-4 desktop:measure-2'>
            Watch the data streams and imagine what they reveal about our Earth!
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
  {
    id: 'planet-pen',
    title: 'Planet Pen',
    content: (
      <Grid row gap={6}>
        <Grid desktop={{ col: 6 }}>
          <Paragraph className='measure-4 desktop:measure-2'>
            Planet Pen is an interactive experience designed around the idea of
            seeing Earth from above, like an astronaut. This experience provides
            a quick and fun way to explore astronaut photography of Earth taken
            from the International Space Station. Visitors are prompted to draw
            shapes and lines and these are used to find near identical shapes in
            Earth’s landscapes. Visitors are provided with information about the
            image shown.
          </Paragraph>
        </Grid>
        <Grid desktop={{ col: 6 }}>
          <Carousel
            fade={true}
            slides={createImageSlides(images['nasa-hq']['planet-pen'])}
          />
        </Grid>
      </Grid>
    ),
  },
  {
    id: 'eyes-on-earth',
    title: 'Eyes on Earth',
    content: (
      <Grid row gap={6}>
        <Grid desktop={{ col: 6 }}>
          <Paragraph className='measure-4 desktop:measure-2'>
            This interactive tool allows users to fly along with NASA&apos;s
            Earth observing missions in real-time, view satellite imagery of
            recent weather events, and monitor some of Earth&apos;s current
            measurements, including temperature, atmospheric ozone, and
            groundwater. The kiosk has a touch screen for users to scroll to
            their location of interest, select a satellite to learn more about a
            missions, and interact with the 3D globe.
          </Paragraph>
        </Grid>
        <Grid desktop={{ col: 6 }}>
          <Carousel
            fade={true}
            slides={createImageSlides(images['nasa-hq']['eyes-on-earth'])}
          />
        </Grid>
      </Grid>
    ),
  },
];
