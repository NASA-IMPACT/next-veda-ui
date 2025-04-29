import React from 'react';

export function CaptionBlock({ title, text }: { title: string; text: string }) {
  return (
    <>
      <h3 className='font-body-sm text-bold margin-top-2'>{title}</h3>
      <p className='font-body-sm line-height-160 text-base-light letter-spacing-0 margin-0'>
        {text}
      </p>
    </>
  );
}
