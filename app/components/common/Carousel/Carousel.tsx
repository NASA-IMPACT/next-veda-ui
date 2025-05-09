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
 * - scrollByGroup: enables moving 3 slides per view (only works with 'third' width)
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
  options?: EmblaOptionsType;
  slideWidth?: 'full' | 'third';
  fade?: boolean;
  scrollByGroup?: boolean;
};

const Carousel: React.FC<PropType> = ({
  slides,
  options,
  slideWidth = 'full',
  fade = false,
  scrollByGroup = false,
}) => {
  const slidesPerView = slideWidth === 'third' ? 3 : 1;

  const plugins = fade ? [Fade()] : [];
  const emblaOptions: EmblaOptionsType = {
    ...options,
    dragFree: false,
    containScroll: false,
    align: 'start',
    slidesToScroll: scrollByGroup ? slidesPerView : 1,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, plugins);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState<number[]>([0]);
  const [scrollSnapsLength, setScrollSnapsLength] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const updateStateFromEmbla = () => {
      const index = emblaApi.selectedScrollSnap();
      setSelectedIndex(index);
      setScrollSnapsLength(emblaApi.scrollSnapList().length);

      const total = emblaApi.slideNodes().length;
      const perView = slidesPerView;
      const visible = Array.from(
        { length: perView },
        (_, i) => index * (scrollByGroup ? perView : 1) + i,
      ).filter((i) => i < total);
      setVisibleSlides(visible);
    };

    emblaApi
      .on('init', updateStateFromEmbla)
      .on('reInit', updateStateFromEmbla)
      .on('select', updateStateFromEmbla);

    requestAnimationFrame(updateStateFromEmbla);
  }, [emblaApi, slideWidth, scrollByGroup, slidesPerView]);

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
                onClick={() => {
                  if (emblaApi && !visibleSlides.includes(index)) {
                    if (scrollByGroup) {
                      const groupIndex = Math.floor(index / slidesPerView);
                      emblaApi.scrollTo(groupIndex);
                    } else {
                      emblaApi.scrollTo(index);
                    }
                  }
                }}
              >
                {slide}
              </ul>
            );
          })}
        </div>
      </div>

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
    </section>
  );
};

export default Carousel;
