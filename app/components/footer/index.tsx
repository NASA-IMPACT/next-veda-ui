import React from 'react';
import {
  Footer as USWDSFooter,
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
          <Grid
            row
            className='display-flex flex-column desktop:flex-row flex-justify'
          >
            <div>
              <p className='text-base-light font-body-2xs measure-1'>
                The EIC was created by NASA and is enabled by contributions
                across EPA, FEMA, NASA, NOAA, USAID, USDA and USGS.
              </p>
            </div>
            <div>
              <nav className='display-flex flex-column desktop:flex-row'>
                {[
                  { label: 'About', href: '/about' },
                  { label: 'Dashboard', href: '/dashboard' },
                  { label: 'Mapping App', href: '/dashboard' },
                  { label: 'Themes', href: '/themes' },
                  { label: 'Visit a Center', href: '/visit' },
                  { label: 'Contact Us', href: '/contact' },
                ].map(({ label, href }) => (
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
        </GridContainer>
      }
      secondary={
        <>
          {/* This is already a grid container in trusswork's implementation*/}
          <Grid row className='border-top-1px border-base-darkest padding-y-2'>
            <div className='display-flex flex-column desktop:flex-row'>
              {[
                { label: 'Accessibility support', href: '/' },
                { label: 'No FEAR Act data', href: '/' },
                { label: 'Office of the Inspector General', href: '/' },
                { label: 'FOIA requests', href: '/' },
                { label: 'Performance reports', href: '/' },
                { label: 'Privacy policy', href: '/' },
              ].map(({ label, href }) => (
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

          {/* Third section */}
          <Grid
            row
            gap={4}
            className='desktop:grid-row flex-justify border-top-1px border-base-darkest padding-top-2 text-base-light font-body-2xs'
          >
            <div className='desktop:display-flex desktop:flex-row desktop:order-last flex-justify'>
              <div className='padding-right-4'>
                <p>
                  Page last updated:{' '}
                  <span className='text-white'>Mar 26, 2024</span>
                </p>
              </div>
              <div>
                <p>
                  U.S. Earth Information Center Responsible Official: Eleanor
                  Stokes
                </p>
              </div>
            </div>

            <div className='desktop:display-flex desktop:order-first'>
              <p>
                Looking for U.S. government information and services? Visit
                USA.gov
              </p>
            </div>
          </Grid>
        </>
      }
    />
  );
}
