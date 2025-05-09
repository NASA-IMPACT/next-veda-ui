import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { waitFor } from '@testing-library/react';

import Carousel from './Carousel';

const scrollTo = vi.fn();

const emblaApi = {
  slideNodes: () => new Array(6).fill(null),
  selectedScrollSnap: () => 0,
  scrollTo,
  canScrollPrev: () => false,
  canScrollNext: () => true,
  scrollSnapList: () => [0, 1, 2, 3, 4, 5],
  on: vi.fn().mockReturnThis(),
};

vi.mock('embla-carousel-react', () => {
  return {
    default: () => [vi.fn(), emblaApi],
    __esModule: true,
  };
});

describe('Carousel', () => {
  const slides = [
    <div key='1'>Slide 1</div>,
    <div key='2'>Slide 2</div>,
    <div key='3'>Slide 3</div>,
    <div key='4'>Slide 4</div>,
    <div key='5'>Slide 5</div>,
    <div key='6'>Slide 6</div>,
  ];

  it('renders all slides', () => {
    render(<Carousel slides={slides} />);
    const items = screen.getAllByRole('list');
    expect(items.length).toBe(6);
  });

  it('applies correct classnames for full width', () => {
    const { container } = render(
      <Carousel slides={slides} slideWidth='full' />,
    );
    const full = container.querySelectorAll('.slide--full');
    expect(full.length).toBeGreaterThan(0);
  });

  it('applies correct classnames for third width', () => {
    const { container } = render(
      <Carousel slides={slides} slideWidth='third' />,
    );
    const third = container.querySelectorAll('.slide--third');
    expect(third.length).toBeGreaterThan(0);
  });

  it('adds "slide--is-visible" class to visible slides', () => {
    const { container } = render(
      <Carousel slides={slides} slideWidth='third' />,
    );
    const visible = container.querySelectorAll('.slide--is-visible');
    expect(visible.length).toBeGreaterThan(0);
  });

  it('shows current index counter', async () => {
    const { container } = render(<Carousel slides={slides} />);
    await waitFor(() => {
      const counter = container.querySelector('.carousel__counter');
      expect(counter?.textContent?.trim()).toBe('1 / 6');
    });
  });

  it('scrolls by a group index when scrollByGroup is enabled', () => {
    const { container } = render(
      <Carousel slides={slides} slideWidth='third' scrollByGroup={true} />,
    );

    const slide = container.querySelectorAll('ul')[3];
    slide?.click();

    expect(emblaApi.scrollTo).toHaveBeenCalledWith(1);
  });
});
