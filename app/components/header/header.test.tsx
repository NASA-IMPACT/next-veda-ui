import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Header from '.';

describe('Header Component', () => {
  it('renders the header component', () => {
    render(<Header />);
    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();
  });

  it('matches the snapshot (no unintended side-effects)', () => {
    render(<Header />);
    const headerElement = screen.getByTestId('header');
    expect(headerElement).toMatchSnapshot();
  });

  it('displays the site title', () => {
    render(<Header />);
    const titleElement = screen.getByText('Earth.gov');
    expect(titleElement).toBeInTheDocument();
  });

  it('renders dropdown menu items correctly', () => {
    render(<Header />);
    const dropdownButton = screen.getByRole('button', { name: /themes/i });
    expect(dropdownButton).toBeInTheDocument();

    fireEvent.click(dropdownButton);
    const dropdownItems = screen.getAllByRole('submenu-item');
    expect(dropdownItems.length).toBe(9);

    const themeItem = screen.getByText('AIR QUALITY');
    expect(themeItem).toBeInTheDocument();
  });

  it('contains the main nav items', () => {
    render(<Header />);
    const navItems = ['About', 'Visit an Exhibit', 'Themes', 'Explore'];

    navItems.forEach((item) => {
      const navItem = screen.getByText(item);
      expect(navItem).toBeInTheDocument();
    });
  });
});
