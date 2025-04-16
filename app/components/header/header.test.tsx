import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Header from '.';

const BREAKPOINTS = {
  'mobile-lg': 480,
  desktop: 1024,
};

describe('Header Component', () => {
  it('renders the header component', () => {
    render(<Header />);
    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();
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
});
