import React from 'react';
import { Grid } from '@trussworks/react-uswds';

const SecondarySection = () => {
  // TODO: Update the links to point to the correct pages
  const secondaryNavItems = [
    { label: 'Accessibility support', href: '/a' },
    { label: 'No FEAR Act data', href: '/b' },
    { label: 'Office of the Inspector General', href: '/c' },
    { label: 'FOIA requests', href: '/d' },
    { label: 'Performance reports', href: '/e' },
    { label: 'Privacy policy', href: '/f' },
  ];

  return (
    <Grid row className='border-top-1px border-base-darkest padding-y-2'>
      <div className='display-flex flex-column desktop:flex-row'>
        {secondaryNavItems.map(({ label, href }) => (
          <div key={href}>
            <a
              href={href}
              className='text-base-light font-body-2xs padding-right-4'
            >
              {label}
            </a>
          </div>
        ))}
      </div>
    </Grid>
  );
};

export default SecondarySection;
