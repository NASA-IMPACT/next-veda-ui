import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Icon } from '@trussworks/react-uswds';

import SmallCard from './SmallCard';

describe('SmallCard', () => {
  const defaultProps = {
    id: 'test-id',
    heading: 'Test Heading',
    imgSrc: '/test-image.jpg',
    imgAlt: 'Test Image',
    linkHref: '/test-link',
    linkLabel: 'Test Link',
  };

  it('matches the snapshot', () => {
    render(<SmallCard {...defaultProps} />);
    const cardElement = screen.getByTestId('Card');
    expect(cardElement).toMatchSnapshot();
  });

  it('should render the card with basic props', () => {
    render(<SmallCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.heading)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('alt', defaultProps.imgAlt);
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      defaultProps.linkHref,
    );
  });

  it('should render the badge when provided', () => {
    const propsWithBadge = {
      ...defaultProps,
      badge: {
        icon: Icon.AccountBalance,
        text: 'Test Badge',
      },
    };
    render(<SmallCard {...propsWithBadge} />);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('should render children when provided', () => {
    render(
      <SmallCard {...defaultProps}>
        <div>Test Children</div>
      </SmallCard>,
    );
    expect(screen.getByText('Test Children')).toBeInTheDocument();
  });
});
