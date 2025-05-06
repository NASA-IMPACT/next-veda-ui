'use client';
import React, { useState, useEffect, useRef } from 'react';
// import { useIntersectionObserver } from './components/header/hooks';
import { Grid, GridContainer, Icon, Link } from '@trussworks/react-uswds';

export const DATA_THEMES = [
  { title: 'Agriculture' },
  { title: 'Air Quality' },
  { title: 'Biodiversity' },
  { title: 'Disasters' },
  { title: 'Energy' },
  { title: 'Greenhouse Gases' },
  { title: 'Sea Level Rise' },
  { title: 'Wildfires' },
  { title: 'Water Resources' },
];

const FADE_DURATION = 3000;

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null); 

  // useIntersectionObserver(heroRef, { threshold: 0.1 });

  // Rotate themes
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % DATA_THEMES.length);
        setFade(true);
      }, 500);
    }, FADE_DURATION);

    return () => clearInterval(interval);
  }, []);

  const currentHighlight = DATA_THEMES[currentIndex];

  return (
    <div className='hero minh-viewport display-flex' ref={heroRef}>
      <GridContainer className='flex-fill flex-align-self-center text-uppercase'>
        <Grid row className='font-ui-lg tablet:font-ui-xl desktop:font-ui-2xl'>
          <Grid tablet={{ col: 6 }}>
            <h1 style={{ minHeight: '18rem' }}>
              Data for
              <br />
              <span className={`fade ${fade ? 'fade-in' : 'fade-out'}`}>
                {currentHighlight.title}
              </span>
            </h1>
          </Grid>
        </Grid>
        <Grid row>
          <Link className='usa-button' href='/dashboard'>
            Get Started
            <Icon.ArrowForward
              size={3}
              className='margin-left-05'
              aria-hidden='true'
            />
          </Link>
        </Grid>
      </GridContainer>
    </div>
  );
}