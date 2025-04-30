import React from 'react';

export function CaptionBlock({ title, text }: { title: string; text: string }) {
  return (
    <>
      <h3 className='font-body-sm text-bold margin-top-2'>{title}</h3>
      <p className='font-body-sm line-height-body-4 text-base-light margin-0'>
        {text}
      </p>
    </>
  );
}
