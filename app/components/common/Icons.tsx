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
