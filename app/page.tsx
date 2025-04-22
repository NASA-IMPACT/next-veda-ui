'use client';
import React, { useState, useEffect } from 'react';
import { Icon, Link } from '@trussworks/react-uswds';

export const DATA_THEMES = [
  { title: 'Air Quality' },
  { title: 'Agriculture' },
  { title: 'Biodiversity' },
  { title: 'Disasters' },
  {
    title: 'Sustainable Energy',
  },
  { title: 'Greenhouse Gases' },
  { title: 'Sea Level Rise' },
  { title: 'Wildfires' },
  { title: 'Water Resources' },
];

const FADE_DURATION = 3000; // Duration in milliseconds

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
    <section className='homepage'>
      <div className='hero'>
        <h1>
          Data for
          <br />
          <span className={`fade ${fade ? 'fade-in' : 'fade-out'}`}>
            {currentHighlight.title}
          </span>
        </h1>
        <Link className='usa-button' href='/dashboard'>
          Get Started
          <Icon.ArrowForward
            size={3}
            className='margin-left-05'
            aria-hidden='true'
          />
        </Link>
      </div>
    </section>
  );
}
