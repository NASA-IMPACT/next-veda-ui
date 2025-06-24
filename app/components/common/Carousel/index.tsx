'use client';

/**
 *
 * A reusable Embla-based carousel that supports optional fading transitions,
 * arrow navigation and dynamic slide widths (choice is between full or third).
 *
 * Props:
 * - slides: an array of React nodes to display
 * - options: optional Embla carousel config
 * - slideWidth: 'full' (1 slide per view) or 'third' (3 slides per view)
 * - fade: enables fade transition between slides
 *
 * Note:
 * - When `fade` is enabled, scaling/styling is skipped
 */

import React, { useEffect, useState } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Fade from 'embla-carousel-fade';

import { PrevButton, NextButton } from './CarouselArrowButtons';
import { usePrevNextButtons } from './usePrevNextButtons';

import './carousel.scss';

type PropType = {
  slides: React.ReactNode[];
  captions?: React.ReactNode[];
  options?: EmblaOptionsType;
  slideWidth?: 'full' | 'third';
  fade?: boolean;
};

const Carousel: React.FC<PropType> = ({
  slides,
  captions,
  options,
  slideWidth = 'full',
  fade = false,
}) => {
  const slidesPerView = slideWidth === 'third' ? 3 : 1;

  const plugins = fade ? [Fade()] : [];
  const emblaOptions: EmblaOptionsType = {
    ...options,
    dragFree: false,
    containScroll: false,
    align: 'start',
    slidesToScroll: slidesPerView,
    breakpoints: {
      // Match the USWDS desktop-to-tablet breakpoint.
      // On small screens, the slides become full width so we need to
      // scroll 1 slide at a time instead of grouped (by 3). This matches
      // the USWDS desktop -> tablet breakpoint.
      '(max-width: 1024px)': {
        slidesToScroll: 1,
      },
    },
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, plugins);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState<number[]>([0]);
  const [scrollSnapsLength, setScrollSnapsLength] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    // This handles updating which slides are considered "visible" (non-faded).
    // We need this because Embla's `slidesToScroll` can change via breakpoints (e.g. 3 on desktop, 1 on mobile).
    // Instead of hardcoding the visible slide count, we read the resolved value from Embla's options (set above).
    // Then we calculate the visible indexes for the current group and store them,
    // so we can style them (e.g. add 'slide--is-visible').
    // Without this, small screens wouldn't get the correct visible styling.
    const updateStateFromEmbla = () => {
      const index = emblaApi.selectedScrollSnap();
      setSelectedIndex(index);
      setScrollSnapsLength(emblaApi.scrollSnapList().length);

      const total = emblaApi.slideNodes().length;
      const rawSlidesToScroll =
        emblaApi.internalEngine().options.slidesToScroll;
      const groupSize =
        typeof rawSlidesToScroll === 'number' ? rawSlidesToScroll : 1;

      const visible = Array.from(
        { length: groupSize },
        (_, i) => index * groupSize + i,
      ).filter((i): i is number => typeof i === 'number' && i < total);

      setVisibleSlides(visible);
    };

    emblaApi
      .on('init', updateStateFromEmbla)
      .on('reInit', updateStateFromEmbla)
      .on('select', updateStateFromEmbla);

    requestAnimationFrame(updateStateFromEmbla);
  }, [emblaApi, slideWidth, slidesPerView]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className='carousel'>
      <div className='carousel__viewport' ref={emblaRef}>
        <div className='display-flex flex-row flex-no-wrap margin-x-neg-1'>
          {slides.map((slide, index) => {
            const isTransitional = !fade;
            const isCurrentlyVisible = visibleSlides.includes(index);
            const layoutClass =
              slideWidth === 'third' ? 'slide--third' : 'slide--full';

            const classNames = [
              isTransitional && 'slide--transitional',
              isTransitional && isCurrentlyVisible && 'slide--is-visible',
              layoutClass,
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <ul
                key={index}
                className={`padding-x-1 ${classNames}`}
                data-testid={
                  isTransitional
                    ? 'carousel-slide-transitional'
                    : isCurrentlyVisible
                      ? 'carousel-slide-visible'
                      : 'carousel-slide-hidden'
                }
                onClick={() => {
                  if (emblaApi && !visibleSlides.includes(index)) {
                    const groupIndex = Math.floor(index / slidesPerView);
                    emblaApi.scrollTo(groupIndex);
                  }
                }}
              >
                {slide}
              </ul>
            );
          })}
        </div>
      </div>

      {scrollSnapsLength > 1 && (
        <div className='carousel__controls display-flex flex-justify-center margin-top-2'>
          <PrevButton
            className='usa-button--unstyled margin-right-2'
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
          />

          <div className='carousel__counter'>
            {selectedIndex + 1} / {scrollSnapsLength}
          </div>

          <NextButton
            className='usa-button--unstyled margin-left-2'
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
          />
        </div>
      )}

      {captions &&
        captions.length > 0 &&
        selectedIndex < captions.length &&
        captions[selectedIndex] && (
          <div className='carousel__captions'>{captions[selectedIndex]}</div>
        )}
    </section>
  );
};

export default Carousel;
