import React from 'react';

export const createImageSlides = (
  slides: { img: string; alt: string }[] = [],
) =>
  Array.isArray(slides)
    ? slides.map((imgObj, idx) => (
        <li key={idx} className='slide'>
          <img src={imgObj.img} alt={imgObj.alt} className='width-full' />
        </li>
      ))
    : [];
