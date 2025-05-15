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

  it('should render the theme card with the correct background image', () => {
    render(<ThemeCard theme={testTheme} />);
    const backgroundContainer = screen
      .getByTestId('Card')
      .querySelector('.position-relative.height-full');
    expect(backgroundContainer).toHaveStyle({
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${testTheme.cardImage})`,
    });
  });

  it('should render the theme card with the correct link', () => {
    render(<ThemeCard theme={testTheme} />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', `/themes/${testTheme.id}`);
  });
});
