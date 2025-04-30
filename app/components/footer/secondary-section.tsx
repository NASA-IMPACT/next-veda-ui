import React from 'react';
import { Grid, Link } from '@trussworks/react-uswds';

const SecondarySection = () => {
  const secondaryNavItems = [
    {
      label: 'Accessibility support',
      href: 'https://www.nasa.gov/accessibility/',
    },
    {
      label: 'No FEAR Act data',
      href: 'https://www.nasa.gov/no-fear-act/',
    },
    {
      label: 'Office of the Inspector General',
      href: 'http://oig.nasa.gov/',
    },
    {
      label: 'FOIA requests',
      href: 'https://www.nasa.gov/foia/',
    },
    {
      label: 'Performance reports',
      href: 'https://www.nasa.gov/organizations/budget-annual-reports/agency-financial-reports/',
    },
    {
      label: 'Privacy policy',
      href: 'https://www.nasa.gov/nasa-web-privacy-policy-and-important-notices/',
    },
  ];

  return (
    <Grid row className='border-top-1px border-base-darkest padding-y-3'>
      <div className='display-flex flex-column desktop:flex-row'>
        {secondaryNavItems.map(({ label, href }) => (
          <div key={href}>
            <Link
              href={href}
              target='_blank'
              rel='noopener noreferrer'
              className='text-base-light hover:text-base font-body-2xs padding-right-4'
            >
              {label}
            </Link>
          </div>
        ))}
      </div>
    </Grid>
  );
};

export default SecondarySection;
