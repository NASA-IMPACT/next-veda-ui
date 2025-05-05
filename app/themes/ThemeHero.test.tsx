import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import ThemeHero from './ThemeHero';

describe('Theme Hero Component', () => {
  it('renders the component', () => {
    render(
      <ThemeHero
        title='Air Quality'
        description='Air quality is important'
        coverSrc='https://example.com/air-quality.jpg'
      />,
    );
    expect(screen.getByText('Air Quality')).toBeInTheDocument();
    expect(screen.queryByText(/Published on/)).not.toBeInTheDocument();
  });

  it('renders the pub date', () => {
    render(
      <ThemeHero
        title='Air Quality'
        description='Air quality is important'
        coverSrc='https://example.com/air-quality.jpg'
        pubDate='November 27, 2023'
      />,
    );
    expect(
      screen.getByText('Published on November 27, 2023'),
    ).toBeInTheDocument();
  });
});
