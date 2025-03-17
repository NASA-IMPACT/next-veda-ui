import React from 'react';
import Link from 'next/link';
import { navItems, subNavItems } from './header';
import NasaLogoColor from './nasa-logo-color';
import { PageFooter } from '@lib';
import VedaUIConfigProvider from 'app/store/providers/veda-ui-config';

export default function Footer() {
  const defaultFooterSettings = {
    secondarySection: {
      division: 'NASA EarthData 2024',
      version: 'BETA VERSION',
      title: 'NASA Official',
      name: 'Manil Maskey',
      to: 'test@example.com',
      type: 'email',
    },
    returnToTop: true,
  };

  return (
    <VedaUIConfigProvider>
      <PageFooter
        mainNavItems={navItems}
        subNavItems={subNavItems}
        hideFooter={false}
        logoSvg={<NasaLogoColor />}
        footerSettings={defaultFooterSettings}
      />
    </VedaUIConfigProvider>
  );
}
