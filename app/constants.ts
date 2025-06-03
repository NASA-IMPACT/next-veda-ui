export const USWDS_DESKTOP_BREAKPOINT = 1024;
// no magic numbers! Use value from theme?

import { Theme, Exhibit, Interactive } from './types';

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
    id: 'sea-level-rise',
    title: 'Sea Level Rise',
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
