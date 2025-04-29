import React from 'react';

type ImageCaptionBlockProps = {
  src: string;
  alt: string;
  caption: string;
};

export function ImageCaptionBlock({
  src,
  alt,
  caption,
}: ImageCaptionBlockProps) {
  return (
    <>
      <img src={src} alt={alt} className='width-full' />
      <p className='font-body-sm line-height-160 letter-spacing-0 margin-top-1 text-base-light'>
        {caption}
      </p>
    </>
  );
}
