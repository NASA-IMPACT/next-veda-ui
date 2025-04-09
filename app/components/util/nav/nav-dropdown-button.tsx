'use client';

import React, { useCallback } from 'react';
import { DropdownNavLink } from './headerTypes';
import { createDynamicNavMenuList } from './create-dynamic-nav-menu-list';
import { NavDropDownButton, Menu } from '@trussworks/react-uswds';
import { SetState } from './headerTypes';
import { useClickOutside } from '../use-click-outside';

interface NavDropDownButtonProps {
  item: DropdownNavLink;
  isOpen: boolean[];
  setIsOpen: SetState<boolean[]>;
  index: number;
}

export const NextNavDropDownButton = ({
  item,
  isOpen,
  setIsOpen,
  index,
}: NavDropDownButtonProps) => {
  const onToggle = (index: number, setIsOpen: SetState<boolean[]>): void => {
    setIsOpen((prevIsOpen) => {
      const newIsOpen = prevIsOpen.map(
        (prev, i) =>
          i === index
            ? !prev // toggle the current dropdown
            : false, // close all other dropdowns
      );
      return newIsOpen;
    });
  };
  const handleClickOutside = useCallback(() => {
    if (isOpen[index]) {
      setIsOpen((prevIsOpen) => {
        const newIsOpen = [...prevIsOpen];
        newIsOpen[index] = false;
        return newIsOpen;
      });
    }
  }, [index, isOpen, setIsOpen]);
  const dropdownRef = useClickOutside(handleClickOutside);
  const submenuItems = createDynamicNavMenuList({ navItems: item.children });

  return (
    <div key={item.id} ref={dropdownRef}>
      <NavDropDownButton
        onToggle={() => onToggle(index, setIsOpen)}
        menuId={item.title}
        isOpen={isOpen[index]}
        label={item.title}
      />
      <Menu
        items={submenuItems}
        isOpen={isOpen[index]}
        id={`${item.id}-dropdown`}
      />
    </div>
  );
};
