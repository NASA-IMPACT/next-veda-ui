'use client';

import React from 'react';
import { Icon } from '@trussworks/react-uswds';
import Link from 'next/link';

type ThemeHeroProps = {
  title: string;
  description: string;
  coverSrc: string;
};

export default function ThemeHero({
  title,
  description,
  coverSrc,
}: ThemeHeroProps) {
  return (
    <section
      className='theme-hero'
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(27, 27, 27, 0.1) 0%, rgba(27, 27, 27, 0.75) 100%), url(${coverSrc})`,
      }}
    >
      <div className='theme-hero__content grid-container text-white display-flex flex-align-center'>
        <div className='tablet:grid-col-8 desktop-lg:margin-left-neg-15'>
          <Link
            href='/'
            className='usa-link text-primary-light margin-bottom-5 display-flex flex-align-center cursor-pointer'
          >
            <Icon.ArrowBack size={3} className='margin-right-1' />
            Back
          </Link>
          <h1 className='font-sans-2xl text-uppercase text-bold line-height-body-2 margin-0 margin-bottom-1'>
            {title}
          </h1>

          <p className='font-body-sm text-base-lighter text-normal line-height-body-4 margin-0'>
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
