import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { CenterCard } from './CenterCard';
import { DATA_CENTERS } from 'app/constants';

describe('Center Card', () => {
  const testCenter = DATA_CENTERS[0];

  it('matches the snapshot', () => {
    render(<CenterCard center={testCenter} />);
    const cardElement = screen.getByRole('link');
    expect(cardElement).toMatchSnapshot();
  });

  it('should render the center card', () => {
    render(<CenterCard center={testCenter} />);
    expect(screen.getByText(testCenter.title)).toBeInTheDocument();
    expect(screen.getByText(testCenter.description)).toBeInTheDocument();
  });

  it('should render the center card with image when isWide is true', () => {
    render(<CenterCard center={testCenter} isWide={true} />);
    const imageElement = screen.getByAltText(testCenter.imageAlt);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src');
  });

  it('should not render the center card image when isWide is false', () => {
    render(<CenterCard center={testCenter} isWide={false} />);
    expect(screen.queryByAltText(testCenter.imageAlt)).not.toBeInTheDocument();
  });

  it('should render the center card with the correct link', () => {
    render(<CenterCard center={testCenter} />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', testCenter.url);
  });

  it('should render the center card with badge', () => {
    render(<CenterCard center={testCenter} />);
    expect(screen.getByText('Center')).toBeInTheDocument();
  });

  it('should render the center card with portal link text', () => {
    render(<CenterCard center={testCenter} />);
    expect(screen.getByText('Open External Portal')).toBeInTheDocument();
  });
});
