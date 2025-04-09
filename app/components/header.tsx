'use client';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck : until veda-ui fixes its types: NavItem type enum
import React, { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { NavItem } from '@lib';
import {
  DATASET_CATALOG_PATH,
  EXPLORATION_PATH,
  STORY_HUB_PATH,
} from 'app/config';
import {
  Header,
  Title,
  NavMenuButton,
  PrimaryNav,
  Icon,
} from '@trussworks/react-uswds';
import VedaUIConfigProvider from 'app/store/providers/veda-ui-config';
import { createDynamicNavMenuList } from './util/nav/create-dynamic-nav-menu-list';
import { useVedaUI, VedaUIProvider } from './util/context/veda-ui-provider';
import useMobileMenuFix from './util/use-mobile-menu-fix';
import './header.scss';

export const navItems: NavItem[] = [
  {
    id: 'about',
    title: 'About',
    to: `/${DATASET_CATALOG_PATH}`,
    type: 'internalLink',
  },

  {
    id: 'themes',
    title: 'Themes',
    to: `/${STORY_HUB_PATH}`,
    type: 'dropdown',
    children: [
      {
        id: 'agriculture',
        title: 'Agriculture',
        to: '/stories/agriculture',
        type: 'internalLink',
      },
      {
        id: 'air-quality',
        title: 'Air Quality',
        to: '/stories/airquality',
        type: 'internalLink',
      },
      {
        id: 'bio-diversity',
        title: 'Bio Diversity',
        to: '/stories/biodiversity',
        type: 'internalLink',
      },
      {
        id: 'disasters',
        title: 'Disasters',
        to: '/stories/disasters',
        type: 'internalLink',
      },
      {
        id: 'energy',
        title: 'Energy',
        to: '/stories/energy',
        type: 'internalLink',
      },
      {
        id: 'greenhouse-gases',
        title: 'Greenhouse Gases',
        to: '/stories/greenhouse_gases',
        type: 'internalLink',
      },
      {
        id: 'sea-level-change',
        title: 'Sea Level Change',
        to: '/stories/sea-level-change',
        type: 'internalLink',
      },
      {
        id: 'wildfires',
        title: 'Wildfires',
        to: '/stories/wildfires',
        type: 'internalLink',
      },
      {
        id: 'water-resources',
        title: 'Water Resources',
        to: '/stories/water-resources',
        type: 'internalLink',
      },
    ],
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    to: `/${EXPLORATION_PATH}`,
    type: 'internalLink',
  },
];

export const subNavItems: NavItem[] = [
  // {
  //   id: 'about',
  //   title: 'About',
  //   to: '/about',
  //   type: 'internalLink',
  // },
];

export default function NextHeader() {
  const [expanded, setExpanded] = useState<boolean>(false);
  useMobileMenuFix(expanded, setExpanded);

  // useMobileMenuFix(expanded, setExpanded);
  const [isOpen, setIsOpen] = useState<boolean[]>(navItems.map(() => false));

  const primaryItems = useMemo(
    () =>
      createDynamicNavMenuList({
        navItems: navItems,
        dropdownIsOpen: isOpen,
        dropdownSetIsOpen: setIsOpen,
      }),
    [navItems, isOpen],
  );

  const toggleExpansion: () => void = useCallback(() => {
    setExpanded((prvExpanded) => {
      return !prvExpanded;
    });
  }, []);
  // const {
  //   navigation: { LinkComponent, linkProps },
  // } = useVedaUI();
  return (
    <VedaUIProvider
      config={{
        envMapboxToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '',
        envApiStacEndpoint: process.env.NEXT_PUBLIC_API_STAC_ENDPOINT ?? '',
        envApiRasterEndpoint: process.env.NEXT_PUBLIC_API_RASTER_ENDPOINT ?? '',
        navigation: {
          LinkComponent: Link,
          linkProps: {
            pathAttributeKeyName: 'href',
          },
        },
      }}
    >
      {/* <LinkComponent
        id='logo-container-link'
        {...{ [linkProps.pathAttributeKeyName]: '/' }}
      >
        test
      </LinkComponent> */}
      <Header
        basic={true}
        showMobileOverlay={expanded}
        className=' text-base-lightest '
      >
        <div className='usa-nav-container flex-align-center maxw-none margin-x-0'>
          <div className='usa-navbar display-flex'>
            <Title className='font-sans-sm desktop:font-sans-lg margin-0 padding-left-2 desktop:padding-0'>
              Earth.gov
            </Title>

            <NavMenuButton
              onClick={toggleExpansion}
              label={<Icon.Menu className='width-2 height-2' />}
            />
          </div>
          <PrimaryNav
            items={primaryItems}
            mobileExpanded={expanded}
            onToggleMobileNav={toggleExpansion}
          />
        </div>
      </Header>
    </VedaUIProvider>
  );
}
