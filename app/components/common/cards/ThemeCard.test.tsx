import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import ThemeCard from './ThemeCard';
import { DATA_THEMES } from 'app/constants';

describe('Theme Card', () => {
  const testTheme = DATA_THEMES[0];

  it('matches the snapshot', () => {
    render(<ThemeCard theme={testTheme} />);
    const cardElement = screen.getByTestId('Card');
    expect(cardElement).toMatchSnapshot();
  });

  it('should render the theme card', () => {
    render(<ThemeCard theme={testTheme} />);
    expect(screen.getByText(testTheme.title)).toBeInTheDocument();
  });

  it('should render the theme card with the correct image', () => {
    render(<ThemeCard theme={testTheme} />);
    const imageElement = screen.getByRole('img');
    const encodedImgSrc = encodeURIComponent(testTheme.cardImage);
    expect(imageElement.getAttribute('src')).toContain(encodedImgSrc);
    expect(imageElement).toHaveAttribute(
      'alt',
      `${testTheme.title} theme cover image`,
    );
  });

  it('should render the theme card with the correct link', () => {
    render(<ThemeCard theme={testTheme} />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', `/themes/${testTheme.id}`);
  });
});
