import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CardBadge from './CardBadge';

describe('CardBadge', () => {
  it('renders with provided label and icon', () => {
    render(<CardBadge label='Test Badge' icon='Language' />);

    expect(screen.getByText('Test Badge')).toBeInTheDocument();
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  it('applies positioning classes when provided via className prop', () => {
    render(
      <CardBadge
        label='Test Badge'
        icon='Language'
        className='position-absolute top-0 left-0'
      />,
    );

    const badge = screen.getByText('Test Badge').closest('.card-badge');
    expect(badge).toHaveClass(
      'position-absolute',
      'top-0',
      'left-0',
      'card-badge',
    );
  });

  it('applies additional classes from className prop', () => {
    render(
      <CardBadge label='Test Badge' icon='Language' className='padding-2' />,
    );
    const badge = screen.getByText('Test Badge').closest('.card-badge');
    expect(badge).toHaveClass('padding-2');
  });

  it('renders with different icons', () => {
    const { rerender } = render(<CardBadge label='Theme' icon='Language' />);
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();

    rerender(<CardBadge label='Exhibit' icon='AccountBalance' />);
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });
});
