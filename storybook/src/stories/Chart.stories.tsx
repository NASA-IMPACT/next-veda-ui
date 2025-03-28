import React, { Component } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Chart } from '../../../app/lib';
import Providers from '../../../app/(datasets)/providers';
const datasets = [
  {
    metadata: {
      id: 'hls_events',
      name: 'Harmonized Landsat Sentinel-2 (Selected Events)',
      description:
        '30-meter resolution harmonized Landsat 8/9 and Sentinel-2A/B data products',
      usage: [Array],
      media: [Object],
      taxonomy: [Array],
      infoDescription:
        '<p>Input data from Landsat 8/9 and Sentinel-2A/B is reprojected and Sentinel-2 data adjusted so that the output data products, HLSL30 (Landsat-derived) and HLSS30 (Sentinel-2-derived) can be used interchangeably. The harmonization of the Optical Land Imager (OLI) on Landsat 8/9 and Multispectral Imager (MSI) on Sentinel-2A/B increases the time series density of plot-scale observations such that data is available every 2-4 days over a given location.</p>',
      layers: [Array],
    },
    slug: 'hls-events',
  },
  {
    metadata: {
      id: 'lahaina-fire',
      name: 'Lahaina Fire',
      description:
        'HLS (BAIS2 and SWIR FalseColor composites) and Landsat-8 thermal imagery supporting the Lahaina, HI Wildfire Story',
      media: [Object],
      taxonomy: [Array],
      infoDescription:
        '<p>On August 8th, 2023, a devastating wildfire rapidly spread through the city of Lahaina, Hawai’i, which is located on the island of Maui and home to over 13,000 residents. This destructive wildfire was initially ignited by a downed powerline on Lahainaluna Road and was later fueled by intense wind gusts that persisted throughout the day. The National Weather Service recorded wind gusts as high as 67 mph in the area, contributing to the rapid spread of the wildfire across much of Lahaina during the afternoon hours of August 8th.</p>',
      layers: [Array],
    },
    slug: 'lahaina-fire',
  },
  {
    metadata: {
      id: 'nighttime-lights-ej',
      name: 'Nighttime Lights supporting Environmental Justice',
      description:
        'High definition nighttime lights can be used to identify regions impacted by natural disaster and/or power outages to better inform disaster response efforts.',
      media: [Object],
      taxonomy: [Array],
      infoDescription:
        '<p>Nightlights data are collected by the <a href="https://ladsweb.modaps.eosdis.nasa.gov/missions-and-measurements/viirs/">Visible Infrared Radiometer Suite (VIIRS) Day/Night Band (DNB)</a> on the Suomi-National Polar-Orbiting Partnership (Suomi-NPP) platform, a joint National Oceanic and Atmospheric Administration (NOAA) and NASA satellite. The images are produced by <a href="https://blackmarble.gsfc.nasa.gov/">NASA’s Black Marble</a> products suite. All data are calibrated daily, corrected, and validated with ground measurements for science-ready analysis.</p>',
      layers: [Array],
    },
    slug: 'nighttime-lights-ej',
  },
  {
    metadata: {
      featured: true,
      id: 'nighttime-lights',
      name: 'Nighttime Lights',
      description:
        'During the COVID-19 pandemic, researchers are using night light observations to track variations in energy use, migration, and transportation in response to social distancing and lockdown measures.',
      media: [Object],
      taxonomy: [Array],
      layers: [Array],
    },
    slug: 'nighttime-lights',
  },
  {
    metadata: {
      id: 'no2',
      name: 'Nitrogen Dioxide',
      featured: true,
      sourceExclusive: 'Mock',
      description:
        'Since the outbreak of the novel coronavirus, atmospheric concentrations of nitrogen dioxide have changed by as much as 60% in some regions.',
      usage: [Array],
      media: [Object],
      taxonomy: [Array],
      infoDescription:
        '<ul><li>Temporal Extent: January 2000 - December 2021</li><li>Temporal Resolution: Monthly</li><li>Spatial Extent: Global</li><li>Spatial Resolution: 1 km x 1 km</li><li>Data Units: Tons of carbon per 1 km x 1 km cell (monthly total)</li><li>Data Type: Research</li><li>Data Latency: Updated annually, following the release of an updated <a href="https://www.bp.com/en/global/corporate/energy-economics.html">BP Statistical Review of World Energy report</a></li></ul>',
      layers: [Array],
    },
    slug: 'no2',
  },
  {
    metadata: {
      id: 'ps_blue_tarp_detections',
      name: 'Blue tarp detections',
      description:
        'Machine learning generated blue tarp detections using Planetscope 3-band RGB imagery',
      media: [Object],
      taxonomy: [Array],
      infoDescription:
        '<p>Planetscope provides 3-band RGB imagery at 3-meter ground resolution whichcan support building-scale analysis of the land surface. In the aftermath ofnatural disasters associated with high wind speeds, homes with damaged roofstypically are covered with blue tarps to protect the interior of the homefrom further damage. Using machine learning, blue tarps can be detected fromthe Planetscope imagery using pre-event cloud free images to detect bluepixels and potential impacts after a natural disaster.</p>',
      layers: [Array],
    },
    slug: 'ps_blue_tarp_detections',
  },
];
const meta = {
  title: 'Example/Chart',
  component: Chart,
  parameters: {
    layout: 'centered',
  },
  // decorators: [
  //   (Story) => (
  //     <Providers datasets={datasets}>
  //       <Story />
  //     </Providers>
  //   ),
  // ],
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
    // idKey: { control: 'date' },
    // idKey={block.idKey,}
    // xKey:{block.xKey},
    // yKey:{block.yKey},
    dateFormat: { control: 'date' },
    // dataPath={`http://localhost:1337${block.dataPath.url}`}
  },
} satisfies Meta<typeof Chart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => ({
    components: { Chart },
  }),
};
