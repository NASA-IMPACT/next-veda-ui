'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Button,
  Header as USWDSHeader,
  Icon,
  Menu,
  NavMenuButton,
  NavDropDownButton,
  PrimaryNav,
  Title,
} from '@trussworks/react-uswds';

import { DATA_THEMES } from '../../page';
import useMobileMenuFix from './use-mobile-menu-fix';
import useClickOutside from './use-click-outside';
import { useHeaderHeight, useScrollDirection, /*useTransparentHeader*/ } from './hooks';

export default function Header() {
  const [isMobileExpanded, setExpanded] = useState(false);
  const onMenuClick = (): void => setExpanded((prvExpanded) => !prvExpanded);

  const [isDropdownOpen, setIsDropdownOpen] = useState([false, false]);

  const mobileMenuRef = useMobileMenuFix(isMobileExpanded, setExpanded);

  const dropdownRef = useClickOutside(() => setIsDropdownOpen([false, false]));
  const [backgroundStyle, setBackgroundStyle] = useState('hidden');
  const pathname = usePathname();

  const headerRef = useHeaderHeight();
  const isScrollingUp = useScrollDirection();
  
  const onToggle = (
    index: number,
    setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean[]>>,
  ): void => {
    const newIsOpen = [...isDropdownOpen];
    newIsOpen[index] = !newIsOpen[index];
    setIsDropdownOpen(newIsOpen);
  };

  // Close menu when route changes
  useEffect(() => {
    setExpanded(false);
    setIsDropdownOpen([false, false]);
  }, [pathname]);

  const dropdownMenuItems = DATA_THEMES.map(({ title }) => {
    const id = title.toLowerCase().replace(/\s+/g, '-');
    const href = `/themes/${id}`;
    const label = title.toUpperCase();
    return (
      <Link href={href} key={id} role='submenu-item'>
        {label}
      </Link>
    );
  });

  useEffect(() => {
    if (isScrollingUp) {
      setBackgroundStyle('solid slide-in')
    } else if (backgroundStyle.includes('solid')) {
      setBackgroundStyle('solid hidden')
    } 
  }, [isScrollingUp])

  useEffect(() => {
    if (window.scrollY === 0) {
      setBackgroundStyle('slide-out')
    }
  }, [window.scrollY])

  useEffect(() => {
    if (pathname == '/') setBackgroundStyle('hidden') // reset the header
  }, [pathname])

  const primaryNavItems = [
    <Link href='/about' key='about' className='usa-nav__link'>
      <span>About</span>
    </Link>,
    <div ref={dropdownRef} key='themes'>
      <NavDropDownButton
        menuId='themesDropDown'
        onToggle={(): void => {
          onToggle(0, setIsDropdownOpen);
        }}
        isOpen={isDropdownOpen[0]}
        label='Themes'
        isCurrent={false}
        className={`${isDropdownOpen[0] ? 'bg-ink ' : ''}text-white`}
      />
      <Menu
        items={dropdownMenuItems}
        isOpen={isDropdownOpen[0]}
        id='themesDropDown'
        className={`${isDropdownOpen[0] ? 'bg-ink ' : ''}text-white`}
      />
    </div>,
    <>
      {isMobileExpanded ? (
        <Link href='/dashboard' key='dashboard' className='usa-nav__link'>
          <span>Dashboard</span>
        </Link>
      ) : (
        <Button key='dashboard' type='button' outline inverse>
          Dashboard
        </Button>
      )}
    </>,
  ];

  return (
    <div ref={headerRef} id='header-container' className={backgroundStyle}>
      <USWDSHeader basic={true} showMobileOverlay={isMobileExpanded}>
        <div className='usa-nav-container desktop:padding-y-2'>
          <div
            className='usa-navbar position-relative z-100 mobile:bg-ink desktop:bg-transparent'
            ref={mobileMenuRef}
          >
            <Title>
              <Link href='/' className='text-white hover:text-base-light'>
                Earth.gov
              </Link>
            </Title>
            <NavMenuButton
              onClick={onMenuClick}
              label={<Icon.Menu size={3} />}
            />
          </div>
          <PrimaryNav
            items={primaryNavItems}
            mobileExpanded={isMobileExpanded}
            onToggleMobileNav={onMenuClick}
            className={`${isMobileExpanded ? 'bg-ink' : ''} text-white`}
          ></PrimaryNav>
        </div>
      </USWDSHeader>
    </div>
  );
}