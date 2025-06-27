export const USWDS_DESKTOP_BREAKPOINT = 1024;
// no magic numbers! Use value from theme?

import { Theme, Exhibit, Interactive, Center } from './types';

/**
 * Theme data that must be manually kept in sync with MDX files in app/content/themes/.
 * Each theme ID should match a corresponding [theme].mdx file.
 * TODO: Generate this data from MDX files at build time.
 */
export const DATA_THEMES: Theme[] = [
  {
    id: 'agriculture',
    title: 'Agriculture',
    cardImage: '/images/themes/agriculture/card.png',
  },
  {
    id: 'air-quality',
    title: 'Air Quality',
    cardImage: '/images/themes/air-quality/card.png',
  },
  {
    id: 'biodiversity',
    title: 'Biodiversity',
    cardImage: '/images/themes/biodiversity/card.png',
  },
  {
    id: 'disasters',
    title: 'Disasters',
    cardImage: '/images/themes/disasters/card.png',
  },
  {
    id: 'energy',
    title: 'Energy',
    cardImage: '/images/themes/energy/card.png',
  },
  {
    id: 'greenhouse-gases',
    title: 'Greenhouse Gases',
    cardImage: '/images/themes/greenhouse-gases/card.png',
  },
  {
    id: 'sea-level-change',
    title: 'Sea Level Change',
    cardImage: '/images/themes/sea-level-rise/card.png',
  },
  {
    id: 'wildfires',
    title: 'Wildfires',
    cardImage: '/images/themes/wildfires/card.png',
  },
  {
    id: 'water-resources',
    title: 'Water Resources',
    cardImage: '/images/themes/water-resources/card.png',
  },
];

/**
 * Exhibit data for physical locations where Earth.gov content is displayed.
 */
export const DATA_EXHIBITS: Exhibit[] = [
  {
    id: 'nasa-hq',
    heading: 'NASA HQ',
    description:
      'The Earth Information Center at HQ is a physical and virtual experience at NASA Headquarters, where visitors can see how our planet is changing in areas that affect lives and livelihoods– from temperatures in our cities to sea level rise, greenhouse gas emissions to agricultural productivity.',
    openingHours: ['Monday - Friday', '8:30am - 5:30pm'],
    address: [
      'NASA Headquarters (East Lobby)',
      '300 E St. SW, Washington, DC 20546',
    ],
    imgSrc: '/images/visit/nasa-hq.png',
    imgAlt: 'NASA HQ exhibit view',
  },
  {
    id: 'smithsonian-museum',
    heading: 'Smithsonian National Museum of Natural History',
    description:
      'The Earth Information Center exhibit at the Smithsonian’s National Museum of Natural History includes a video wall displaying Earth science data visualizations and videos, an interpretive panel showing Earth’s connected systems, information on our changing world, and an overview of how NASA and the Smithsonian study our home planet.',
    openingHours: ['Every day (closed on Christmas)', '10am - 5:30pm'],
    address: [
      'Smithsonian National Museum of Natural History',
      '1000 Madison Dr, Washington, DC 20560',
    ],
    imgSrc: '/images/visit/smithsoniam-museum.jpg',
    imgAlt: 'Smithsonian National Museum of Natural History exterior view',
  },
  {
    id: 'kennedy-space-center',
    heading: 'Kennedy Space Center',
    description:
      'The Earth Information Center exhibit at the Kennedy Space Center Visitor Complex reimagines the observation gantry at Launch Complex 39 and includes a data hub featuring a theater show, a Hyperwall display, and an interactive exhibit gallery.',
    openingHours: ['Every day (closed on Christmas)', '9am - 5pm'],
    address: [
      'KSC Visitor Complex (The Gantry at LC-39)',
      'Space Commerce Way, Merritt Island, FL 32953',
    ],
    imgSrc: '/images/visit/kennedy-space-center.png',
    imgAlt: 'Kennedy Space Center exterior view',
  },
];

export const DATA_INTERACTIVES: Interactive[] = [
  {
    id: 'mobile-climate-mapper',
    url: 'https://earth.gov/mobile-climate-mapper',
    title: 'Mobile Climate Mapper',
    cardImageAlt: 'Mobile Climate Mapper',
    description:
      'The Mobile Climate Mapper is an extension of NASA’s Earth Information Center exhibit at the Smithsonian National Museum of Natural History. Use this tool to explore how climate change may affect temperatures in any geographic area in the world.',
  },
  {
    id: 'hometown-dashboard',
    title: 'Hometown Dashboard',
    url: 'https://earth.gov/hometown-dashboard',
    cardImageAlt: 'Hometown Dashboard',
    description:
      'Hometown Dashboard invites users to learn how temperature and precipitation in their home region are projected to change from 1950 to 2100. Select your hometown from a global map, adjust time scales, and interact with visual charts that show historical and predicted climate changes based on different emission scenarios.',
  },
  {
    id: 'nasa-eyes-on-earth',
    url: 'https://eyes.nasa.gov/apps/earth',
    title: 'NASA Eyes on Earth',
    cardImageAlt: 'NASA Eyes on Earth',
    description:
      'NASA Eyes on Earth is a way for you to learn about your home planet, our solar system, the universe beyond and the spacecraft exploring them.',
  },
];

export const DATA_CENTERS: Center[] = [
  {
    id: 'greenhouse-gas-center',
    title: 'Greenhouse Gas Center',
    description:
      'The U.S. Greenhouse Gas Center (US GHG Center) is a multi-agency effort consolidating greenhouse gas information from observations and models.',
    url: 'https://earth.gov/ghgcenter',
    image: '/images/centers/greenhouse-gas-center.png',
    imageAlt: 'Greenhouse Gas Center',
  },
  {
    id: 'global-sea-level-change-portal',
    title: 'Global Sea Level Change Portal',
    description:
      'The Global Sea Level Change Portal is an international collaboration that offers essential information on current and projected sea level change to inform coastal communities across the globe.',
    url: 'https://earth.gov/global-sea-level-change-portal',
    image: '/images/centers/global-sea-level-change-portal.png',
    imageAlt: 'Global Sea Level Change Portal',
  },
  {
    id: 'national-sea-level-rise-center',
    title: 'National Sea Level Rise Center',
    description:
      'The National Sea Level Rise Center is a multi-agency effort pairing data visualizations with accessible explanations and science eduction to help communities prepare for challenges that are impacting communities across the coastlines of the United States.',
    url: 'https://earth.gov/sealevel/us',
    image: '/images/centers/national-sea-level-rise-center.png',
    imageAlt: 'Sea Level Rise Center',
  },
];
