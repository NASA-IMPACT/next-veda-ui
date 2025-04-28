'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Icon, Link } from '@trussworks/react-uswds';
import { useIntersectionObserver } from './components/header/hooks';

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
  const heroRef = useRef<HTMLDivElement>(null); 

  useIntersectionObserver(heroRef, { threshold: 0.1 });

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
    <div>
      <section className='homepage'>
        <div className='hero' ref={heroRef}>
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
      <div className='testing'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae aut fugit tenetur perspiciatis doloremque accusantium. Quidem sunt sit vitae aliquid placeat, ipsum quisquam voluptatibus repudiandae, atque inventore quae eos excepturi!
          
      </div>
    </div>
  );
}