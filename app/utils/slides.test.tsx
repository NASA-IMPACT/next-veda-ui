import { describe, expect, test } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import { createImageSlides } from './slides';

describe('createImageSlides', () => {
  test('returns an array of <li> elements with images', () => {
    const slides = [
      { img: '/img1.jpg', alt: 'Image 1' },
      { img: '/img2.jpg', alt: 'Image 2' },
    ];
    const result = createImageSlides(slides);

    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);

    // Render the first slide to check its structure
    const { getByAltText } = render(<ul>{result[0]}</ul>);
    const img = getByAltText('Image 1');
    expect(img).toHaveAttribute('src', '/img1.jpg');
  });

  test('returns an empty array if input is not an array', () => {
    // @ts-expect-error testing invalid input
    expect(createImageSlides(null)).toEqual([]);
    expect(createImageSlides(undefined)).toEqual([]);
  });

  test('returns an empty array if input is an empty array', () => {
    expect(createImageSlides([])).toEqual([]);
  });
});
