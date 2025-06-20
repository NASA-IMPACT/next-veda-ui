'use client';

import React from 'react';
import { Icon } from '@trussworks/react-uswds';

/*
 * We cannot use a client-only icon component directly inside `next/link`
 * because `next/link` is a server component by default.
 * This forwarding component allows us to use the icon in places where
 * client-only components are required.
 */
export const ArrowBackIcon = (props) => <Icon.ArrowBack {...props} />;
export const LanguageIcon = (props) => <Icon.Language {...props} />;
export const AccountBalanceIcon = (props) => <Icon.AccountBalance {...props} />;
export const LightbulbIcon = (props) => <Icon.Lightbulb {...props} />;
export const LaunchIcon = (props) => <Icon.Launch {...props} />;
export const LinkIcon = (props) => <Icon.Link {...props} />;

export const NetworkIcon = (props) => (
  <svg
    width='1rem'
    height='1rem'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M15.5 2H8.5V9H11V11H2V13H6V15H3.5V22H10.5V15H8V13H16V15H13.5V22H20.5V15H18V13H22V11H13V9H15.5V2Z'
      fill='currentColor'
    />
  </svg>
);
