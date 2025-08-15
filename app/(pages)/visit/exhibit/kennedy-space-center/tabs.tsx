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
            slides={createImageSlides(images['kennedy-space-center']['dome-to-dome'])}
          />
        </Grid>
      </Grid>
    ),
  },
  {
    id: 'seas-of-tomorrow',
    title: 'Seas of Tomorrow',
    content: (
      <Grid row gap={6}>
        <Grid desktop={{ col: 6 }}>
          <Paragraph className='measure-4 desktop:measure-2'>
            Seas of Tomorrow provides visualizations of future flooding scenarios due to sea level rise.
            The interactive installation includes projections over a 3D printed surface and a back display with information on the impacts of sea level rise.  
          </Paragraph>
        </Grid>
        <Grid desktop={{ col: 6 }}>
          <Carousel
            fade={true}
            slides={createImageSlides(images['kennedy-space-center']['seas-of-tomorrow'])}
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
            The Earth Pulse is an LED sculpture that displays live communication with a selection of the NASA/NOAA/USGS fleet of satellites that study the Earth.
            Activity in the lights means data is being transmitted, with the amount of light indicating the amount of data being transferred.
            The name of the specific mission communicating the data is indicated in lights on the sculpture.
            Watch the data streams and imagine what they reveal about our Earth!
          </Paragraph>
        </Grid>
        <Grid desktop={{ col: 6 }}>
          <Carousel
            fade={true}
            slides={createImageSlides(images['kennedy-space-center']['earth-pulse'])}
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
            Planet Pen is an interactive experience designed around the idea of seeing Earth from above, like an astronaut.  This experience provides a quick and fun way to explore astronaut photography of Earth taken from the International Space Station.
            Visitors are prompted to draw shapes and lines and these are used to find near identical shapes in Earth’s landscapes.
            Visitors are provided with information about the image shown.
          </Paragraph>
        </Grid>
        <Grid desktop={{ col: 6 }}>
          <Carousel
            fade={true}
            slides={createImageSlides(images['kennedy-space-center']['planet-pen'])}
          />
        </Grid>
      </Grid>
    ),
  },
  {
    id: 'science-on-a-sphere',
    title: 'Science on a Sphere',
    content: (
      <Grid row gap={6}>
        <Grid desktop={{ col: 6 }}>
          <Paragraph className='measure-4 desktop:measure-2'>
            Science on a sphere is a captivating, large-scale spherical display system that showcases dynamic high-resolution Earth science visualizations and imagery.
            Science on a sphere is a NOAA led program, but a curated set of custom NASA visualizations is used on this sphere to extend and support the content on the adjacent Hyperwall.
          </Paragraph>
        </Grid>
        <Grid desktop={{ col: 6 }}>
          <Carousel
            fade={true}
            slides={createImageSlides(images['kennedy-space-center']['science-on-a-sphere'])}
          />
        </Grid>
      </Grid>
    ),
  },
];
