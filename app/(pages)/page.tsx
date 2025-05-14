'use client';
import React, { useState, useEffect } from 'react';
import { Grid, GridContainer, Icon, Link } from '@trussworks/react-uswds';
import { DATA_THEMES } from 'app/constants';

const FADE_DURATION = 3000;

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

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
    <div className='hero minh-viewport display-flex'>
      <GridContainer className='flex-fill flex-align-self-center text-uppercase'>
        <Grid
          row
          className='font-ui-lg mobile:font-ui-sm tablet:font-ui-xl desktop:font-ui-2xl'
        >
          <Grid
            tablet={{ col: 12 }}
            style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
          >
            <h1>
              Data for
              <br />
              <span className={`fade ${fade ? 'fade-in' : 'fade-out'}`}>
                {currentHighlight.title}
              </span>
            </h1>
          </Grid>
        </Grid>
        <Grid row>
          <Link className='usa-button mobile:font-ui-sm' href='/dashboard'>
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
