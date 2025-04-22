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
import useHeaderHeight from './use-header-height';

export default function Header() {
  const [isMobileExpanded, setExpanded] = useState(false);
  const onMenuClick = (): void => setExpanded((prvExpanded) => !prvExpanded);

  const [isDropdownOpen, setIsDropdownOpen] = useState([false, false]);

  const mobileMenuRef = useMobileMenuFix(isMobileExpanded, setExpanded);

  const dropdownRef = useClickOutside(() => setIsDropdownOpen([false, false]));

  const headerRef = useHeaderHeight();

  const onToggle = (
    index: number,
    setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean[]>>,
  ): void => {
    const newIsOpen = [...isDropdownOpen];
    newIsOpen[index] = !newIsOpen[index];
    setIsDropdownOpen(newIsOpen);
  };

  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setExpanded(false);
  }, [pathname]);

  const dropdownMenuItems = DATA_THEMES.map(({ title }) => {
    const id = title.toLowerCase().replace(/\s+/g, '-');
    const href = `/${id}`;
    const label = title.toUpperCase();
    return (
      <Link href={href} key={id}>
        {label}
      </Link>
    );
  });

  const primaryNavItems = [
    <Link href='about' key='about' className='usa-nav__link'>
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
        <Link href='dashboard' key='dashboard' className='usa-nav__link'>
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
    <div ref={headerRef}>
      <USWDSHeader basic={true} showMobileOverlay={isMobileExpanded}>
        <div className='usa-nav-container'>
          <div className='usa-navbar' ref={mobileMenuRef}>
            <Title>
              <Link href='/' className='padding-2 text-white'>
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
