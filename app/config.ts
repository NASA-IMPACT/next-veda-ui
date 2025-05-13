export const DATASET_CATALOG_PATH = 'data-catalog';
export const STORY_HUB_PATH = 'stories';
export const EXPLORATION_PATH = 'exploration';

export type Theme = {
  id: string;
  title: string;
  cardImage: string;
};

export const DATA_THEMES: Theme[] = [
  {
    id: 'agriculture',
    title: 'Agriculture',
    cardImage: '/images/themes/agriculture/agriculture-banner.png',
  },
  {
    id: 'air-quality',
    title: 'Air Quality',
    cardImage: '/images/themes/air-quality/air-quality-banner.png',
  },
  {
    id: 'biodiversity',
    title: 'Biodiversity',
    cardImage: '/images/themes/biodiversity/biodiversity-banner.png',
  },
  {
    id: 'disasters',
    title: 'Disasters',
    cardImage: '/images/themes/disasters/disasters-banner.png',
  },
  {
    id: 'energy',
    title: 'Energy',
    cardImage: '/images/themes/energy/energy-banner.png',
  },
  {
    id: 'greenhouse-gases',
    title: 'Greenhouse Gases',
    cardImage: '/images/themes/greenhouse-gases/greenhouse-gases-banner.png',
  },
  {
    id: 'sea-level-change',
    title: 'Sea Level Change',
    cardImage: '/images/themes/sea-level-change/sea-level-change-banner.png',
  },
  {
    id: 'wildfires',
    title: 'Wildfires',
    cardImage: '/images/themes/wildfires/wildfires-banner.png',
  },
  {
    id: 'water-resources',
    title: 'Water Resources',
    cardImage: '/images/themes/water-resources/water-resources-banner.png',
  },
];

export interface Exhibit {
  id: string;
  heading: string;
  openingHours: string[];
  address: string[];
  imgSrc: string;
  imgAlt: string;
}

export const exhibits: Exhibit[] = [
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
