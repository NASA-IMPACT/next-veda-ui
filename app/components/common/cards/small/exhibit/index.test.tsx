import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import ExhibitCard from './index';
import { exhibits } from 'app/config';

describe('Exhibit Card', () => {
  it('matches the snapshot', () => {
    render(<ExhibitCard exhibit={exhibits[0]} />);
    const cardElement = screen.getByTestId('Card');
    expect(cardElement).toMatchSnapshot();
  });

  it('should render the exhibit card', () => {
    render(<ExhibitCard exhibit={exhibits[0]} />);
    expect(screen.getByText(exhibits[0].heading)).toBeInTheDocument();
    expect(screen.getByText(exhibits[0].address[0])).toBeInTheDocument();
    expect(screen.getByText(exhibits[0].address[1])).toBeInTheDocument();
    expect(screen.getByText(exhibits[0].openingHours[0])).toBeInTheDocument();
  });

  it('should render the exhibit card with the correct image', () => {
    render(<ExhibitCard exhibit={exhibits[0]} />);
    const imageElement = screen.getByRole('img');
    const encodedImgSrc = encodeURIComponent(exhibits[0].imgSrc);
    expect(imageElement.getAttribute('src')).toContain(encodedImgSrc);
    expect(imageElement).toHaveAttribute('alt', exhibits[0].imgAlt);
  });

  it('should render the exhibit card with the correct link', () => {
    render(<ExhibitCard exhibit={exhibits[0]} />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute(
      'href',
      `/visit/exhibit/${exhibits[0].id}`,
    );
  });
});
