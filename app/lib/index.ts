'use client';

import {
  CatalogView,
  PageHero,
  useFiltersWithQS,
  ReactQueryProvider,
  DevseedUiThemeProvider,
  VedaUIProvider,
  PageMainContent,
  Block,
  Prose,
  Figure,
  Caption,
  Image,
  MapBlock,
  CompareImage,
  PageHeader,
  PageFooter,
  NavItem,
  InternalNavLink,
  ExplorationAndAnalysis,
  DatasetSelectorModal,
  timelineDatasetsAtom,
  useTimelineDatasetAtom,
  StoriesHubContent,
  externalDatasetsAtom,
  ScrollytellingBlock,
  Chapter,
  Chart,
  DatasetData,
  VedaData,
} from '@teamimpact/veda-ui';

/**
 * This file is to...
 * Quickly identify client specific library components being used throughout this application
 * And to mark these with the client side directive so other parts of the page are still Server Components and can stay as-is
 */

export {
  // Providers
  DevseedUiThemeProvider,
  ReactQueryProvider,
  VedaUIProvider,

  // Components
  CatalogView,
  PageHero,
  PageMainContent,
  PageHeader,
  PageFooter,
  ExplorationAndAnalysis,
  DatasetSelectorModal,
  StoriesHubContent,

  // MDX Components
  Block,
  Prose,
  Figure,
  Caption,
  Image,
  MapBlock,
  CompareImage,
  ScrollytellingBlock,
  Chapter,
  Chart,

  // Hooks
  useFiltersWithQS,

  // State
  timelineDatasetsAtom,
  useTimelineDatasetAtom,
  externalDatasetsAtom,
};

export type { DatasetData, NavItem, InternalNavLink, VedaData };
