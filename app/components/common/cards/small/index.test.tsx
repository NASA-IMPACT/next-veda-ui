import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Icon } from '@trussworks/react-uswds';
import SmallCard from './index';
import type { SmallCardProps } from './index';

const mockBadge = {
  icon: Icon.AccountBalance,
  text: 'Test Badge',
} as const;

const mockProps: SmallCardProps = {
  id: 'test-card',
  heading: 'Test Card',
  imgSrc: '/test-image.jpg',
  imgAlt: 'Test image',
  linkHref: '/test-link',
  linkLabel: 'View test card details',
  badge: mockBadge,
};

describe('SmallCard', () => {
  it('renders a full card with all props and content', () => {
    render(
      <SmallCard {...mockProps}>
        <div>Test content</div>
      </SmallCard>,
    );

    expect(screen.getByText(mockProps.heading)).toBeInTheDocument();
    expect(screen.getByText(mockBadge.text)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src');
    expect(screen.getByRole('img')).toHaveAttribute('alt', mockProps.imgAlt);
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      mockProps.linkHref,
    );
    expect(screen.getByRole('link')).toHaveAttribute(
      'aria-label',
      mockProps.linkLabel,
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders a media-only card without content section', () => {
    render(<SmallCard {...mockProps} />);

    expect(screen.getByText(mockProps.heading)).toBeInTheDocument();
    expect(screen.getByText(mockBadge.text)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src');
    expect(screen.getByRole('img')).toHaveAttribute('alt', mockProps.imgAlt);
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      mockProps.linkHref,
    );
    expect(screen.getByRole('link')).toHaveAttribute(
      'aria-label',
      mockProps.linkLabel,
    );
    expect(screen.getByTestId('Card')).not.toHaveClass('padding-bottom-4');
  });

  it('renders a card without badge', () => {
    const propsWithoutBadge: Omit<SmallCardProps, 'badge'> = {
      id: mockProps.id,
      heading: mockProps.heading,
      imgSrc: mockProps.imgSrc,
      imgAlt: mockProps.imgAlt,
      linkHref: mockProps.linkHref,
      linkLabel: mockProps.linkLabel,
    };
    render(
      <SmallCard {...propsWithoutBadge}>
        <div>Test content</div>
      </SmallCard>,
    );

    expect(screen.queryByText(mockBadge.text)).not.toBeInTheDocument();
    expect(screen.getByText(mockProps.heading)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies custom grid layout classes', () => {
    const customGridLayout = {
      desktop: { col: 6 as const },
      tablet: { col: 8 as const },
    };

    render(
      <SmallCard {...mockProps} gridLayout={customGridLayout}>
        <div>Test content</div>
      </SmallCard>,
    );

    const card = screen.getByTestId('Card');
    expect(card).toHaveClass('desktop:grid-col-6');
    expect(card).toHaveClass('tablet:grid-col-8');
  });
});
