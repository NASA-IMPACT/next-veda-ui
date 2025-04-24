import React from 'react';
import {
  Footer as USWDSFooter,
  FooterNav,
  Address,
  Logo,
  GridContainer,
  Grid,
} from '@trussworks/react-uswds';
import Link from 'next/link';

export default function Footer() {
  return (
    <USWDSFooter
      size='slim'
      className=''
      returnToTop={<></>}
      primary={
        <GridContainer containerSize='widescreen' className='text-white'>
          <Grid row>
            <h3>Earth.gov</h3>
          </Grid>
          <Grid row>
            <Grid col={4}>
              <p className='text-base-light measure-1'>
                The EIC was created by NASA and is enabled by contributions
                across EPA, FEMA, NASA, NOAA, USAID, USDA and USGS.
              </p>
            </Grid>
            <Grid col={'fill'}></Grid>
            <Grid col={7}>
              <FooterNav
                size='slim'
                links={[
                  { label: 'About', href: '/about' },
                  { label: 'Dashboard', href: '/dashboard' },
                  { label: 'Mapping App', href: '/dashboard' },
                  { label: 'Themes', href: '/themes' },
                  { label: 'Visit a Center', href: '/visit' },
                  { label: 'Contact Us', href: '/contact' },
                ].map(({ label, href }) => (
                  <Link
                    className='usa-footer__primary-link text-white text-no-underline font-body-2xs'
                    href={href}
                    key={href}
                  >
                    {label}
                  </Link>
                ))}
              />
            </Grid>
          </Grid>
        </GridContainer>
      }
      secondary={
        <>
          <Grid row gap={4}>
            {[
              { label: 'Accessibility support', href: '/' },
              { label: 'No FEAR Act data', href: '/' },
              { label: 'Office of the Inspector General', href: '/' },
              { label: 'FOIA requests', href: '/' },
              { label: 'Performance reports', href: '/' },
              { label: 'Privacy policy', href: '/' },
            ].map(({ label, href }) => (
              <Grid key={href} col className='flex-auto'>
                <a href={href} className='text-base-light font-body-2xs'>
                  {label}
                </a>
              </Grid>
            ))}
          </Grid>
          <Grid
            row
            gap={4}
            className='border-top-1px border-base-darkest margin-top-4 padding-top-2 text-base-light font-body-2xs'
          >
            <Grid tablet={{ col: 4 }}>
              <p>
                Looking for U.S. government information and services? Visit
                USA.gov
              </p>
            </Grid>
            <Grid tablet={{ col: 2 }}></Grid>
            <Grid tablet={{ col: 2 }}>
              <p>
                Page last updated:{' '}
                <span className='text-white'>Mar 26, 2024</span>
              </p>
            </Grid>
            <Grid tablet={{ col: 4 }}>
              <p>
                U.S. Earth Information Center Responsible Official: Eleanor
                Stokes
              </p>
            </Grid>
          </Grid>
        </>
      }
    />
  );
}
