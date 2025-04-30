import React from 'react';
import { Grid, Title } from '@trussworks/react-uswds';
import Link from 'next/link';

const PrimarySection = () => {
  // TODO: Update the links to point to the correct pages
  const primaryNavItems = [
    { label: 'About', href: '/about' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Mapping App', href: '/mapping' },
    { label: 'Themes', href: '/themes' },
    { label: 'Visit a Center', href: '/visit' },
    { label: 'Contact Us', href: '/contact' },
  ];

  return (
    <>
      <Grid row className='desktop:padding-top-8 padding-top-6'>
        <Title className='margin-left-0 margin-bottom-3 desktop:margin-bottom-105'>
          <Link href='/' className='text-white'>
            Earth.gov
          </Link>
        </Title>
      </Grid>
      <Grid
        row
        className='display-flex flex-column desktop:flex-row flex-justify'
      >
        <div>
          <p className='margin-0 margin-top-105 text-base-light font-body-2xs measure-1'>
            The EIC was created by NASA and is enabled by contributions across
            EPA, FEMA, NASA, NOAA, USAID, USDA and USGS.
          </p>
        </div>
        <div>
          <nav
            aria-label='Footer navigation'
            className='display-flex flex-column desktop:flex-row'
          >
            {primaryNavItems.map(({ label, href }) => (
              <Link
                className='usa-footer__primary-link padding-0 desktop:padding-2 desktop:padding-bottom-205 text-white text-no-underline text-normal line-height-ui-6 font-ui-2xs'
                href={href}
                key={href}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </Grid>
    </>
  );
};

export default PrimarySection;
