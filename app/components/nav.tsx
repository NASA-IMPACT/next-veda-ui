import React from 'react';
import Link from 'next/link';
import { PageHeader, LogoContainer } from '@lib';
import NasaLogo from '../../public/images/nasa-logo';
import { NavItem } from '@lib';

const navItems: NavItem[] = [
  // @TODO: This should use the NavLinkType from veda-ui...
  {
    title: 'Home',
    to: '/',
    type: 'internalLink',
  },
  {
    title: 'Data Catalog',
    to: '/data-catalog',
    type: 'internalLink',
  },
  {
    title: 'Exploration',
    to: '/exploration',
    type: 'internalLink',
  },
  {
    title: 'Stories',
    to: '/stories',
    type: 'internalLink',
  },
];

export function Navbar() {
  const linkProps = {
    LinkElement: Link,
    pathAttributeKeyName: 'href',
  };

  const Logo: JSX.Element = (
    <LogoContainer
      linkProperties={linkProps}
      logo={<NasaLogo />}
      title='Earthdata'
      subTitle='veda dashboard'
      version='1.0.0'
    />
  );

  return (
    <aside className='-ml-[8px] mb-16 tracking-tight'>
      <div className='lg:sticky lg:top-20'>
        <nav id='nav'>
          <div className='flex flex-row space-x-0 hug-reset-container'>
            <PageHeader
              mainNavItems={navItems}
              subNavItems={[]}
              logo={Logo}
              linkProperties={linkProps}
            />
          </div>
        </nav>
      </div>
    </aside>
  );
}
