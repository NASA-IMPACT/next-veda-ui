export const USWDS_DESKTOP_BREAKPOINT = 1024;
// no magic numbers! Use value from theme?

import { Theme } from './types';

/**
 * Theme data that must be manually kept in sync with MDX files in app/content/themes/.
 * Each theme ID should match a corresponding [theme].mdx file.
 * TODO: Generate this data from MDX files at build time.
 */
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
