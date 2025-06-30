'use client';

import React, { ComponentPropsWithRef } from 'react';

type ButtonProps = ComponentPropsWithRef<'button'>;

export const PrevButton: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => (
  <button
    type='button'
    aria-label='Previous slide'
    {...props}
    className={`${className} ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    <svg
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M17.3334 7.95866H4.65627L10.4792 2.13574L9.00002 0.666992L0.666687 9.00033L9.00002 17.3337L10.4688 15.8649L4.65627 10.042H17.3334V7.95866Z'
        fill='#A9AEB1'
      />
    </svg>
    {children}
  </button>
);

export const NextButton: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => (
  <button
    type='button'
    aria-label='Next slide'
    {...props}
    className={`${className} ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z'
        fill='#A9AEB1'
      />
    </svg>
    {children}
  </button>
);
