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
            slides={createImageSlides(
              images['smithsonian-museum-nmnh'].hyperwall,
            )}
          />
        </Grid>
      </Grid>
    ),
  },
  {
    id: 'time-unveiled',
    title: 'Time Unveiled',
    content: (
      <Grid row gap={6}>
        <Grid desktop={{ col: 6 }}>
          <Paragraph className='measure-4 desktop:measure-2'>
            Spanning periods from days to decades, satellite imagery reveals
            changes in Earth&apos;s landscape over time. At the exhibit,
            visitors use their silhouette and movement to uncover images from
            before and after a range of events, including flooding,
            urbanization, fires, and more. This interactive experience
            demonstrates some of the human impact on our planet.
          </Paragraph>
        </Grid>
        <Grid desktop={{ col: 6 }}>
          <Carousel
            fade={true}
            slides={createImageSlides(
              images['smithsonian-museum-nmnh']['time-unveiled'],
            )}
          />
        </Grid>
      </Grid>
    ),
  },
  {
    id: 'hometown-dashboard',
    title: 'Hometown Dashboard',
    content: (
      <Grid row gap={6}>
        <Grid desktop={{ col: 6 }}>
          <Paragraph className='measure-4 desktop:measure-2'>
            This interactive display invites users to learn how temperature and
            precipitation in their home region are projected to change from 1950
            to 2100. Select your hometown from a global map, adjust time scales,
            and interact with visual charts that show historical and predicted
            climate changes based on different emission scenarios. What future
            will you choose?
          </Paragraph>
        </Grid>
        <Grid desktop={{ col: 6 }}>
          <Carousel
            fade={true}
            slides={createImageSlides(
              images['smithsonian-museum-nmnh']['hometown-dashboard'],
            )}
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
            recent weather events, and monitor some of Earth&apos;s vital signs,
            including temperature, carbon dioxide, atmospheric ozone, and sea
            level. The kiosk has a touch screen for users to scroll to their
            location of interest, select a satellite to learn more about a
            mission, and interact with the 3D globe.
          </Paragraph>
        </Grid>
        <Grid desktop={{ col: 6 }}>
          <Carousel
            fade={true}
            slides={createImageSlides(
              images['smithsonian-museum-nmnh']['eyes-on-earth'],
            )}
          />
        </Grid>
      </Grid>
    ),
  },
  {
    id: 'mobile-climate-mapper',
    title: 'Mobile Climate Mapper',
    content: (
      <Grid row gap={6}>
        <Grid desktop={{ col: 6 }}>
          <Paragraph className='measure-4 desktop:measure-2'>
            This app allows users to explore temperature data between 1950 to
            2100 a mobile device or computer. While selecting different emission
            scenarios and timeframes, users interact with a 3D globe to select a
            region of interest and reveal charts of historical and predicted
            temperatures.
          </Paragraph>
        </Grid>
        <Grid desktop={{ col: 6 }}>
          <Carousel
            fade={true}
            slides={createImageSlides(
              images['smithsonian-museum-nmnh']['mobile-climate-mapper'],
            )}
          />
        </Grid>
      </Grid>
    ),
  },
];
