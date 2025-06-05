import { getDatasetsMetadata, getStoriesMetadata } from 'app/content/utils/mdx';

export const baseUrl = process.env.DOMAIN_PROD;

import {
  DATASET_CATALOG_PATH,
  EXPLORATION_PATH,
  STORY_HUB_PATH,
} from './config';

const additionalRoutes = ['about'];

export default async function sitemap() {
  const datasets = getDatasetsMetadata().map((post) => ({
    url: `${baseUrl}/${DATASET_CATALOG_PATH}/${post.slug}`,
  }));

  const events = getStoriesMetadata().map((post) => ({
    url: `${baseUrl}/${STORY_HUB_PATH}/${post.slug}`,
    lastModified: post.metadata.pubDate,
  }));

  const routes = [
    '',
    DATASET_CATALOG_PATH,
    EXPLORATION_PATH,
    STORY_HUB_PATH,
    ...additionalRoutes,
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...datasets, ...events];
}
