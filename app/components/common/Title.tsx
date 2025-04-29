import React from 'react';

type TitleProps = {
  children: React.ReactNode;
};

export function Title({ children }: TitleProps) {
  return (
    <h2 className='font-body-xl text-bold line-height-100 letter-spacing-0'>
      {children}
    </h2>
  );
}
