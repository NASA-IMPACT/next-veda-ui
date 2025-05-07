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
import { AlignmentOptionType } from 'embla-carousel/components/Alignment';
import useEmblaCarousel from 'embla-carousel-react';
import Fade from 'embla-carousel-fade';

import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from './CarouselArrowButtons';

import './carousel.scss';

type PropType = {
  slides: React.ReactNode[];
  options?: EmblaOptionsType;
  slideWidth?: 'full' | 'third';
  fade?: boolean;
};

const Carousel: React.FC<PropType> = ({
  slides,
  options,
  slideWidth,
  fade,
}) => {
  const plugins = fade ? [Fade()] : [];
  const emblaOptions: EmblaOptionsType = {
    containScroll: false,
    align: 'start' as AlignmentOptionType,
    ...options,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, plugins);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState<number[]>([0]);

  useEffect(() => {
    if (!emblaApi) return;

    const updateStateFromEmbla = () => {
      const total = emblaApi.slideNodes().length;
      const index = emblaApi.selectedScrollSnap();
      setSelectedIndex(index);

      const perView = slideWidth === 'third' ? 3 : 1;
      const visible = Array.from(
        { length: perView },
        (_, i) => index + i,
      ).filter((i) => i < total);

      setVisibleSlides(visible);
    };

    emblaApi
      .on('init', updateStateFromEmbla)
      .on('reInit', updateStateFromEmbla)
      .on('select', updateStateFromEmbla);

    requestAnimationFrame(updateStateFromEmbla);
  }, [emblaApi, slideWidth]);

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
            const classNames = [
              !fade && 'slide__container',
              'padding-x-1',
              !fade && visibleSlides.includes(index) && 'is-visible',
              slideWidth === 'third' ? 'slide--third' : 'slide--full',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <ul
                key={index}
                className={classNames}
                onClick={() => {
                  if (emblaApi && !visibleSlides.includes(index)) {
                    emblaApi.scrollTo(index);
                  }
                }}
              >
                {slide}
              </ul>
            );
          })}
        </div>
      </div>

      <div className='carousel__controls margin-top-2'>
        <PrevButton
          className='usa-button--unstyled margin-right-2'
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
        />

        <div className='carousel__counter'>
          {selectedIndex + 1} / {slides.length}
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
