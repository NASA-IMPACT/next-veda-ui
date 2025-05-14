export const DATASET_CATALOG_PATH = 'data-catalog';
export const STORY_HUB_PATH = 'stories';
export const EXPLORATION_PATH = 'exploration';

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
