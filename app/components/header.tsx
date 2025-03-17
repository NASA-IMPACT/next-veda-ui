// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck : until veda-ui fixes its types: NavItem type enum
import React from 'react';
import { PageHeader } from '@lib';
import { NavItem } from '@lib';
import NasaLogoColor from 'app/components/nasa-logo-color.js';
import {
  DATASET_CATALOG_PATH,
  EXPLORATION_PATH,
  STORY_HUB_PATH,
} from 'app/config';
import VedaUIConfigProvider from 'app/store/providers/veda-ui-config';

export const navItems: NavItem[] = [
  {
    id: 'data-catalog',
    title: 'Data Catalog',
    to: `/${DATASET_CATALOG_PATH}`,
    type: 'internalLink',
  },
  {
    id: 'exploration',
    title: 'Exploration',
    to: `/${EXPLORATION_PATH}`,
    type: 'internalLink',
  },
  {
    id: 'stories',
    title: 'Stories',
    to: `/${STORY_HUB_PATH}`,
    type: 'internalLink',
  },
];

export const subNavItems: NavItem[] = [
  {
    id: 'about',
    title: 'About',
    to: '/about',
    type: 'internalLink',
  },
  {
    id: 'contact-us',
    title: 'Contact us',
    actionId: 'open-google-form',
    type: 'action',
  },
];

export default function Header() {
  return (
    <VedaUIConfigProvider>
      <PageHeader
        title={'Earthdata VEDA Dashboard'}
        mainNavItems={navItems}
        subNavItems={subNavItems}
        logoSvg={
          <div id='logo-container-link'>
            {/*
              USWDS targets only <a> tags for styling links. However when the text is a <span>
              instead of a link, it does not inherit the color styling (it ends up being white).
              To fix this, we must add the color inline like this.
              TODO: Ideally we can address this on the veda-ui side so that the color applies to all elements within the logo.
            */}
            <NasaLogoColor />
            <span style={{ color: '#1b1b1b' }}>Earthdata VEDA Dashboard</span>
          </div>
        }
      />
    </VedaUIConfigProvider>
  );
}
