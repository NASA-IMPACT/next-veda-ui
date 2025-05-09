import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import ExhibitCard from './ExhibitCard';

import { exhibits } from './page';

describe('Header Component', () => {
  it('matches the snapshot', () => {
    render(<ExhibitCard exhibit={exhibits[0]} />);
    const cardElement = screen.getByTestId('Card');
    expect(cardElement).toMatchSnapshot();
  });
});
