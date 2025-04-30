import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Footer from '.';

describe('Footer Component', () => {
  it('renders the header component', () => {
    render(<Footer />);
    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
  });

  it('matches the snapshot (no unintended side-effects)', () => {
    render(<Footer />);
    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toMatchSnapshot();
  });

  it('displays the site title', () => {
    render(<Footer />);
    const titleElement = screen.getByText('Earth.gov');
    expect(titleElement).toBeInTheDocument();
  });

  it('contains the main nav items', () => {
    render(<Footer />);
    const navItems = [
      'About',
      'Dashboard',
      'Mapping App',
      'Themes',
      'Visit a Center',
      'Contact Us',
    ];

    navItems.forEach((item) => {
      const navItem = screen.getByText(item);
      expect(navItem).toBeInTheDocument();
    });
  });
});
